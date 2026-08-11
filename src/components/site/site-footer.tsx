import { Instagram, Youtube, Mail } from "lucide-react";
import { EVENT } from "./event-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-primary">
              <span className="size-2 rounded-full bg-gold" />
            </span>
            <span className="font-display text-sm font-semibold">{EVENT.church}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {EVENT.name} {EVENT.edition} · {EVENT.dateLabel}
            <span className="block">{EVENT.venue}, {EVENT.city}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a href="#programacao" className="link-underline hover:text-foreground">Programação</a>
          <a href="#inscricao" className="link-underline hover:text-foreground">Inscrição</a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="grid size-9 place-items-center rounded-full border border-ink/12 transition-colors hover:bg-secondary"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            className="grid size-9 place-items-center rounded-full border border-ink/12 transition-colors hover:bg-secondary"
          >
            <Youtube className="size-4" />
          </a>
          <a
            href="mailto:contato@fontechurch.com"
            aria-label="E-mail"
            className="grid size-9 place-items-center rounded-full border border-ink/12 transition-colors hover:bg-secondary"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 text-xs text-muted-foreground/70 sm:px-6">
        © {new Date().getFullYear()} {EVENT.church}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
