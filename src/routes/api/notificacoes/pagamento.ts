import { createFileRoute } from "@tanstack/react-router";
import { fetchPayment, mapPaymentMethod, mapPaymentStatus } from "@/lib/mercadopago";
import { updatePaymentStatus } from "@/lib/google-sheets";

export const Route = createFileRoute("/api/notificacoes/pagamento")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => null);
          const type = body?.type;
          const paymentId = body?.data?.id;

          if (type !== "payment" || !paymentId) {
            return Response.json({ received: true });
          }

          const payment = await fetchPayment(String(paymentId));
          const email = payment.metadata?.email || payment.payer?.email;

          if (email) {
            const updated = await updatePaymentStatus({
              email,
              status: mapPaymentStatus(payment.status),
              paymentMethod: mapPaymentMethod(payment.payment_type_id),
              paymentId: String(payment.id),
            });
            if (!updated) {
              console.warn("Nenhuma linha encontrada na planilha para o e-mail:", email);
            }
          }

          return Response.json({ received: true, status: payment.status });
        } catch (error) {
          console.error("Erro ao processar notificação do MercadoPago:", error);
          // Sempre retorna 200 para o MercadoPago não reenviar a notificação indefinidamente.
          return Response.json({ received: true }, { status: 200 });
        }
      },
    },
  },
});
