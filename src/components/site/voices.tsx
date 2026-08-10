import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./reveal";

const VOICES = [
  {
    name: "Ministério de Dança Fonte",
    role: "Condução do movimento",
    topic: "Coreografias guiadas e roda aberta para toda a comunidade",
  },
  {
    name: "Banda Fonte",
    role: "Louvor ao vivo",
    topic: "Repertório inspirado em Salmos 150:4",
  },
  {
    name: "Pastoral Fonte Church",
    role: "Palavra e oração",
    topic: "Propósito em movimento: adorar com tudo o que somos",
  },
  {
    name: "Equipe de Acolhimento",
    role: "Recepção e café",
    topic: "Mesa posta, boas-vindas e mesas de conversa",
  },
];

export function Voices() {
  const [open, setOpen] = useState(0);

  return (
    <section id="vozes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Quem conduz"
          title="As equipes por trás da noite"
          description="Gente da casa servindo para que você só precise chegar e adorar."
        />

        <ul className="mt-14 border-t border-ink/10">
          {VOICES.map((v, i) => (
            <li key={v.name} className="border-b border-ink/10">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center gap-6 py-7 text-left"
              >
                <span className="font-display text-xs tabular-nums text-muted-foreground/60">
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                    {v.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{v.role}</span>
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-sm transition-all duration-500",
                    open === i ? "rotate-45 bg-primary text-primary-foreground" : "group-hover:bg-secondary",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-700 ease-[var(--ease-out-expo)]",
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p className="min-h-0 pb-7 pl-12 text-base text-muted-foreground">
                  <span className="eyebrow mr-3 text-accent">tema</span>
                  {v.topic}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
