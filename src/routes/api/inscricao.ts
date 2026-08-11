import { createFileRoute } from "@tanstack/react-router";
import { appendRegistration } from "@/lib/google-sheets";

const MODES = ["Sozinho(a)", "Com a família", "Com meu grupo"];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const Route = createFileRoute("/api/inscricao")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const nome = String(body?.nome || "").trim();
        const email = String(body?.email || "")
          .trim()
          .toLowerCase();
        const telefone = String(body?.telefone || "").replace(/\D/g, "");
        const igreja = String(body?.igreja || "").trim();
        const modo = MODES.includes(body?.modo) ? body.modo : MODES[0];

        if (nome.length < 3 || !isValidEmail(email) || telefone.length < 10) {
          return Response.json(
            { success: false, message: "Dados inválidos. Confira nome, e-mail e WhatsApp." },
            { status: 400 },
          );
        }

        try {
          await appendRegistration({ nome, email, telefone, igreja, modo, valor: 15 });
          return Response.json({ success: true });
        } catch (error) {
          console.error("Erro ao salvar inscrição:", error);
          const message = error instanceof Error ? error.message : "Erro desconhecido";
          const isConfigError = message.includes("Credenciais Google ausentes");
          return Response.json(
            {
              success: false,
              message: isConfigError
                ? "Configuração do servidor incompleta para salvar inscrições."
                : "Erro ao salvar inscrição.",
            },
            { status: isConfigError ? 503 : 500 },
          );
        }
      },
    },
  },
});
