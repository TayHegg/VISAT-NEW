// Deploy: supabase functions deploy whatsapp-webhook --no-verify-jwt
// Secrets: WHATSAPP_VERIFY_TOKEN, META_APP_SECRET
import { createClient } from "jsr:@supabase/supabase-js@2";

const INCOMING_STATUS = "received";
const OUTGOING_STATUSES = new Set(["queued", "sent", "delivered", "read", "failed"]);

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function assinaturaValida(raw: string, header: string | null): Promise<boolean> {
  const secret = Deno.env.get("META_APP_SECRET");
  if (!secret || !header?.toLowerCase().startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(raw),
  );
  const hex = [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return constantTimeEqual(hex, header.slice(7));
}

function extrairTexto(message: Record<string, any>): string {
  switch (message.type) {
    case "text": return message.text?.body ?? "";
    case "button": return message.button?.text ?? "";
    case "interactive":
      return message.interactive?.button_reply?.title
        ?? message.interactive?.list_reply?.title
        ?? "[interativo]";
    default: return `[${message.type ?? "mensagem"}]`;
  }
}

async function marcarRespostaNaFicha(admin: ReturnType<typeof createClient>, fichaId: string, receivedAt: string) {
  if (!fichaId || fichaId === "SEM_FICHA") return;

  const { data: row, error: readError } = await admin
    .from("records")
    .select("id,data")
    .eq("id", fichaId)
    .limit(1)
    .maybeSingle();
  if (readError || !row?.data || typeof row.data !== "object") {
    if (readError) console.error("Não foi possível localizar a ficha da resposta", readError);
    return;
  }

  const record = { ...(row.data as Record<string, unknown>) };
  // A resposta indica que a ficha precisa ser tratada pela equipe. Não reabre
  // uma ficha já finalizada, mas registra a resposta no próprio JSONB.
  if (record.status !== "finalizado") record.status = "aguardando_investigacao";
  record.whatsappUltimaRespostaEm = receivedAt;
  record.whatsappUltimaRespostaStatus = "recebida";

  const { error: updateError } = await admin
    .from("records")
    .update({ data: record, updated_at: receivedAt })
    .eq("id", fichaId);
  if (updateError) console.error("Não foi possível atualizar o status da ficha", updateError);
}

Deno.serve(async (req) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (
      mode === "subscribe" &&
      token === Deno.env.get("WHATSAPP_VERIFY_TOKEN") &&
      challenge
    ) return new Response(challenge, { status: 200 });
    return new Response("forbidden", { status: 403 });
  }

  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
  const raw = await req.text();
  if (!(await assinaturaValida(raw, req.headers.get("x-hub-signature-256")))) {
    return new Response("assinatura inválida", { status: 401 });
  }

  let body: Record<string, any>;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) return new Response("configuração incompleta", { status: 500 });
  const admin = createClient(url, serviceRoleKey);
  const receivedAt = new Date().toISOString();

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value ?? {};

      for (const message of value.messages ?? []) {
        const from = String(message.from ?? "");
        if (!from) continue;
        const telefoneChave = from.slice(-8);
        const { data: latestOutgoing, error: lookupError } = await admin
          .from("whatsapp_mensagens")
          .select("ficha_id")
          .eq("direcao", "out")
          .eq("telefone_chave", telefoneChave)
          .order("criado_em", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (lookupError) console.error("Falha ao localizar a ficha pelo telefone", lookupError);

        const fichaId = latestOutgoing?.ficha_id ?? "SEM_FICHA";
        const { error: insertError } = await admin.from("whatsapp_mensagens").upsert({
          ficha_id: fichaId,
          direcao: "in",
          telefone: from,
          telefone_chave: telefoneChave,
          tipo: message.type ?? "text",
          corpo: extrairTexto(message),
          wa_message_id: message.id,
          status: INCOMING_STATUS,
          criado_em: receivedAt,
          atualizado_em: receivedAt,
        }, { onConflict: "wa_message_id" });
        if (insertError) {
          console.error("Falha ao gravar resposta do WhatsApp", insertError);
        } else {
          await marcarRespostaNaFicha(admin, fichaId, receivedAt);
        }
      }

      for (const status of value.statuses ?? []) {
        const nextStatus = String(status.status ?? "");
        if (!OUTGOING_STATUSES.has(nextStatus)) continue;
        const { error: updateError } = await admin
          .from("whatsapp_mensagens")
          .update({
            status: nextStatus,
            erro: status.errors ? JSON.stringify(status.errors) : null,
            atualizado_em: receivedAt,
          })
          .eq("wa_message_id", status.id);
        if (updateError) console.error("Falha ao atualizar status do WhatsApp", updateError);
      }
    }
  }

  return new Response("ok", { status: 200 });
});
