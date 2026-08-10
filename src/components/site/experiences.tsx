import { useState } from "react";
import groups from "@/assets/event-groups.jpg";
import word from "@/assets/event-word.jpg";
import worship from "@/assets/event-worship.jpg";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./reveal";

const ITEMS = [
  {
    tag: "Plenárias",
    title: "Noites de adoração",
    text: "Duas horas de louvor conduzido pela banda Fonte, com repertório inédito da 9ª edição.",
    image: worship,
    alt: "Banda de louvor no palco iluminado em azul marinho",
  },
  {
    tag: "Trilhas",
    title: "Palavra em profundidade",
    text: "Quatro trilhas simultâneas: fé e trabalho, casamento, jovens e vida devocional.",
    image: word,
    alt: "Bíblia aberta e caderno sobre mesa clara",
  },
  {
    tag: "Comunidade",
    title: "Mesas de conversa",
    text: "Grupos de oito pessoas, um mediador e perguntas que a gente costuma evitar.",
    image: groups,
    alt: "Grupo de jovens conversando no saguão do evento",
  },
];

export function Experiences() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="experiencias" className="border-y border-ink/10 bg-paper-dim py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experiências"
          title="O que acontece nesses três dias"
          description="Passe o mouse para explorar cada frente do evento."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <article
              key={item.title}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg border border-ink/10 p-6 transition-all duration-700",
                hover !== null && hover !== i ? "opacity-60" : "opacity-100",
              )}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.135_0.04_264/0.94),oklch(0.135_0.04_264/0.35)_55%,oklch(0.135_0.04_264/0.15))]" />
              <div className="relative">
                <span className="eyebrow text-azure">{item.tag}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70 transition-all duration-500 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
