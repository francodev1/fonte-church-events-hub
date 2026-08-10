import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EVENT } from "./event-data";

const LINKS = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#programacao", label: "Programação" },
  { href: "#vozes", label: "Vozes" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border border-ink/10 bg-paper/80 shadow-[var(--shadow-lift)] backdrop-blur-xl"
              : "border border-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full transition-colors duration-500",
                scrolled ? "bg-primary" : "bg-paper/15 ring-1 ring-paper/25",
              )}
            >
              <span className="size-2 rounded-full bg-azure" />
            </span>
            <span
              className={cn(
                "font-display text-sm font-semibold tracking-tight transition-colors duration-500",
                scrolled ? "text-foreground" : "text-paper",
              )}
            >
              {EVENT.church}
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "link-underline text-sm transition-colors duration-500",
                  scrolled
                    ? active === l.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    : active === l.href
                      ? "text-paper"
                      : "text-paper/60 hover:text-paper",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#inscricao"
              className={cn(
                "hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 sm:inline-flex",
                scrolled ? "bg-primary text-primary-foreground" : "bg-paper text-ink",
              )}
            >
              Garantir vaga
            </a>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-colors duration-500 md:hidden",
                scrolled ? "border-ink/10 text-foreground" : "border-paper/25 text-paper",
              )}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper/95 p-2 backdrop-blur-xl md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inscricao"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Garantir vaga
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
