function normalizeTag(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function resolveBaseUrl(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  const host = forwardedHost || request.headers.get("host") || url.host;
  const detected = host ? `${forwardedProto}://${host}` : "";
  return (detected || process.env["NEXT_PUBLIC_BASE_URL"] || "").replace(/\/+$/, "");
}

export async function createPaymentPreference(params: {
  nome: string;
  email: string;
  telefone: string;
  valor: number;
  baseUrl: string;
}) {
  const accessToken = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN ausente");
  }

  const { nome, email, telefone, valor, baseUrl } = params;
  const tag = normalizeTag(nome);
  const externalReference = `cafe-com-danca|${tag}|${Date.now()}`;
  const phoneDigits = telefone.replace(/\D/g, "");

  const preferenceData = {
    items: [
      {
        title: `Inscrição Café com Dança - ${nome}`,
        quantity: 1,
        unit_price: valor,
        currency_id: "BRL",
      },
    ],
    payer: {
      name: nome,
      email,
      ...(phoneDigits
        ? { phone: { area_code: phoneDigits.slice(0, 2), number: phoneDigits.slice(2) } }
        : {}),
    },
    external_reference: externalReference,
    metadata: { nome, email, telefone, origem: "cafe-com-danca" },
    statement_descriptor: "CAFE COM DANCA",
    // Mercado Pago rejeita back_urls/auto_return apontando para localhost — em produção
    // (domínio https real) essas URLs de retorno e o webhook são sempre incluídos.
    ...(baseUrl && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(baseUrl)
      ? {
          back_urls: {
            success: `${baseUrl}/pagamento-sucesso`,
            pending: `${baseUrl}/pagamento-pendente`,
            failure: `${baseUrl}/#inscricao`,
          },
          auto_return: "approved",
          notification_url: `${baseUrl}/api/notificacoes/pagamento`,
        }
      : {}),
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Idempotency-Key": externalReference,
    },
    body: JSON.stringify(preferenceData),
  });

  const data = await response.json();
  if (!response.ok || !data.init_point) {
    throw new Error(`Erro ao criar preferência no MercadoPago: ${JSON.stringify(data)}`);
  }

  return { initPoint: data.init_point as string, preferenceId: data.id as string };
}

export async function fetchPayment(paymentId: string) {
  const accessToken = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN ausente");
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar pagamento ${paymentId}: ${response.status}`);
  }

  return response.json();
}

export function mapPaymentStatus(status: string): "Confirmado" | "Pendente" | "Recusado" {
  if (status === "approved") return "Confirmado";
  if (status === "pending" || status === "in_process") return "Pendente";
  return "Recusado";
}

export function mapPaymentMethod(paymentTypeId: string): string {
  if (paymentTypeId === "pix") return "Pix";
  if (paymentTypeId === "credit_card") return "Cartão de crédito";
  if (paymentTypeId === "debit_card") return "Cartão de débito";
  return paymentTypeId || "Não informado";
}
