import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { EVENT } from "@/components/site/event-data";

export const Route = createFileRoute("/pagamento-pendente")({
  head: () => ({
    meta: [{ title: `Pagamento em análise | ${EVENT.church}` }],
  }),
  component: PagamentoPendente,
});

function PagamentoPendente() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-secondary text-foreground">
        <Clock className="size-6" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Pagamento em análise
      </h1>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        Recebemos sua inscrição para o {EVENT.name}. Assim que o pagamento for aprovado, confirmamos
        sua vaga por e-mail ou WhatsApp.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
      >
        Voltar para o site
      </Link>
    </div>
  );
}
