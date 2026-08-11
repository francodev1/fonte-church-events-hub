import { createFileRoute } from "@tanstack/react-router";
import { createPaymentPreference, resolveBaseUrl } from "@/lib/mercadopago";

export const Route = createFileRoute("/api/pagamento")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const nome = String(body?.nome || "").trim();
        const email = String(body?.email || "")
          .trim()
          .toLowerCase();
        const telefone = String(body?.telefone || "");
        const valor = Number(body?.valor) || 15;

        if (!nome || !email) {
          return Response.json(
            { success: false, error: "Nome e e-mail são obrigatórios." },
            { status: 400 },
          );
        }

        try {
          const baseUrl = resolveBaseUrl(request);
          const { initPoint } = await createPaymentPreference({
            nome,
            email,
            telefone,
            valor,
            baseUrl,
          });
          return Response.json({ success: true, initPoint });
        } catch (error) {
          console.error("Erro ao criar pagamento:", error);
          const message = error instanceof Error ? error.message : "Erro desconhecido";
          const isConfigError = message.includes("MERCADOPAGO_ACCESS_TOKEN ausente");
          return Response.json(
            {
              success: false,
              error: isConfigError
                ? "Configuração de pagamento ausente."
                : "Erro ao criar pagamento.",
            },
            { status: isConfigError ? 503 : 502 },
          );
        }
      },
    },
  },
});
