import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./reveal";

const VOICES = [
  { name: "Pr. Daniel Moraes", role: "Pastor sênior · Fonte Church", topic: "Face a Face: a coragem de ser visto" },
  { name: "Marina Rocha", role: "Ministra de louvor", topic: "Adoração que não depende de palco" },
  { name: "Pr. Tiago Lemos", role: "Fé & trabalho", topic: "Segunda-feira também é culto" },
  { name: "Ana Beatriz Alves", role: "Discipulado de jovens", topic: "Identidade em tempos de vitrine" },
  { name: "Rafael Nunes", role: "Casais", topic: "Conversas que a gente adia" },
];

export function Voices() {
  const [open, setOpen] = useState(0);

  return (
    <section id="vozes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Vozes"
          title="Quem vai conduzir"
          description="Pessoas da casa e convidados que vivem o que ensinam."
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
