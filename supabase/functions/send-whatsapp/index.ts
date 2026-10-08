// Deploy: supabase functions deploy send-whatsapp
// Secrets: WHATSAPP_TOKEN, WHATSAPP_PHONE_ID
import { createClient } from "jsr:@supabase/supabase-js@2";

type Payload = {
  ficha_id?: string;
  nome?: string;
  telefone?: string;
  data_notificacao?: string;
  template?: string;
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

// Aceita (22) 99999-9999, 22999999999, 5522999999999 etc.
function normalizarTelefone(value: string | undefined): string | null {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return /^55\d{10,11}$/.test(digits) ? digits : null;
}

function primeiroNome(value: string): string {
  return String(value || "").trim().split(/\s+/)[0] || "Paciente";
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ erro: "método não permitido" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceRoleKey) {
    return json({ erro: "configuração do Supabase incompleta" }, 500);
  }

  const userClient = createClient(url, anonKey, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return json({ erro: "não autenticado" }, 401);

  let payload: Payload;
  try {
    payload = await req.json() as Payload;
  } catch {
    return json({ erro: "JSON inválido" }, 400);
  }

  const fichaId = String(payload.ficha_id ?? "").trim();
  const nome = String(payload.nome ?? "").trim();
  const dataNotificacao = String(payload.data_notificacao ?? "").trim();
  const telefone = normalizarTelefone(payload.telefone);
  if (!fichaId || !nome || !telefone || !dataNotificacao) {
    return json({ erro: "dados inválidos (id da ficha, nome, telefone ou data da notificação)" }, 400);
  }

  const token = Deno.env.get("WHATSAPP_TOKEN");
  const phoneId = Deno.env.get("WHATSAPP_PHONE_ID");
  if (!token || !phoneId) return json({ erro: "WhatsApp não configurado no Supabase" }, 500);

  const templateNome = String(payload.template || "vigilancia_contato_acidente");
  const metaResponse = await fetch(
    `https://graph.facebook.com/v21.0/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: telefone,
        type: "template",
        template: {
          name: templateNome,
          language: { code: "pt_BR" },
          components: [{
            type: "body",
            parameters: [
              { type: "text", text: primeiroNome(nome) },
              { type: "text", text: dataNotificacao },
            ],
          }],
        },
      }),
    },
  );
  const metaBody = await readJson(metaResponse);
  const messageId = Array.isArray(metaBody.messages)
    ? String((metaBody.messages[0] as { id?: unknown } | undefined)?.id ?? '') || null
    : null;

  const admin = createClient(url, serviceRoleKey);
  const { error: historyError } = await admin.from("whatsapp_mensagens").insert({
    ficha_id: fichaId,
    direcao: "out",
    telefone,
    telefone_chave: telefone.slice(-8),
    tipo: "template",
    template_nome: templateNome,
    corpo: `Template ${templateNome} enviado a ${primeiroNome(nome)}`,
    wa_message_id: messageId,
    status: metaResponse.ok ? "sent" : "failed",
    erro: metaResponse.ok ? null : JSON.stringify(metaBody?.error ?? metaBody),
    criado_por: user.id,
  });

  if (!metaResponse.ok) {
    const errorMessage = (metaBody?.error as { message?: string } | undefined)?.message;
    return json({ erro: errorMessage || "falha no envio pela Meta" }, 502);
  }

  if (historyError) {
    console.error("Mensagem enviada, mas o histórico não foi gravado", historyError);
    return json({
      ok: true,
      aviso: "Mensagem aceita pela Meta, mas o histórico não foi gravado.",
    });
  }

  return json({ ok: true, wa_message_id: messageId });
});
