-- Histórico de mensagens WhatsApp vinculado às fichas do VISAT.
-- As fichas ficam em public.records; os campos do formulário ficam em records.data (JSONB).
-- ficha_id guarda records.id, não o número visível da ficha.
create table if not exists public.whatsapp_mensagens (
  id             uuid primary key default gen_random_uuid(),
  ficha_id       text not null,
  direcao        text not null check (direcao in ('out','in')),
  telefone       text not null,
  telefone_chave text not null,
  tipo           text not null default 'text',
  template_nome  text,
  corpo          text,
  wa_message_id  text unique,
  status         text not null default 'queued'
                 check (status in ('queued','sent','delivered','read','failed','received')),
  erro           text,
  criado_por     uuid references auth.users(id),
  criado_em      timestamptz not null default now(),
  atualizado_em  timestamptz not null default now()
);

create index if not exists idx_wpp_ficha
  on public.whatsapp_mensagens (ficha_id, criado_em);

create index if not exists idx_wpp_chave
  on public.whatsapp_mensagens (telefone_chave, criado_em desc);

alter table public.whatsapp_mensagens enable row level security;

-- Usuários autenticados só leem. As Edge Functions usam service role para escrever.
drop policy if exists "wpp_select_autenticados" on public.whatsapp_mensagens;
create policy "wpp_select_autenticados"
  on public.whatsapp_mensagens for select
  to authenticated
  using (true);

do $$
begin
  if not exists (
    select 1
      from pg_publication_tables
     where pubname = 'supabase_realtime'
       and schemaname = 'public'
       and tablename = 'whatsapp_mensagens'
  ) then
    alter publication supabase_realtime add table public.whatsapp_mensagens;
  end if;
end
$$;
