import { createFileRoute } from "@tanstack/react-router";
import { listRegistrations } from "@/lib/google-sheets";

// PIN de acesso ao painel de acompanhamento de inscrições/pagamentos.
const ADMIN_PIN = process.env["ADMIN_PIN"] || "9752";

export const Route = createFileRoute("/api/admin/inscricoes")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const pin = String(body?.pin || "");

        if (pin !== ADMIN_PIN) {
          return Response.json({ success: false, message: "PIN incorreto." }, { status: 401 });
        }

        try {
          const rows = await listRegistrations();
          return Response.json({ success: true, rows });
        } catch (error) {
          console.error("Erro ao listar inscrições:", error);
          return Response.json(
            { success: false, message: "Erro ao carregar inscrições." },
            { status: 500 },
          );
        }
      },
    },
  },
});
