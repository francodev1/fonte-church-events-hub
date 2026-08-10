import { Reveal, SectionHeading } from "./reveal";
import { useReveal } from "@/hooks/use-reveal";

const PILLARS = [
  {
    n: "01",
    title: "Sem coreografia decorada",
    text: "Passos simples, roda guiada e liberdade total. Se você sabe respirar, você sabe adorar em movimento.",
  },
  {
    n: "02",
    title: "Sem pressa",
    text: "Duas paradas para café e conversa. A noite foi desenhada para aproximar, não para correr.",
  },
  {
    n: "03",
    title: "Sem espectadores",
    text: "Todo mundo entra na roda de alguma forma: dança, louvor, oração ou servindo o café.",
  },
];

export function Manifesto() {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  return (
    <section id="manifesto" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="O encontro"
              title={
                <>
                  Adoração que acontece com o
                  <span className="text-muted-foreground"> corpo inteiro</span>, não só com a voz.
                </>
              }
              description="O Café com Dança reúne a comunidade da Fonte Church para celebrar o Senhor em movimento e comunhão. Louvor, dança e um café que fortalece nossos laços e renova o espírito."
            />
            <Reveal delay={120} className="mt-10">
              <span
                ref={ref}
                data-visible={visible}
                className="line-grow block h-px w-full bg-ink/15"
              />
              <blockquote className="mt-8 max-w-md font-display text-xl leading-snug text-foreground">
                “Louvai-o com adufes e danças; louvai-o com instrumentos de cordas e com flautas.”
                <footer className="mt-3 text-sm font-normal text-muted-foreground">
                  Salmos 150:4
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <ul className="space-y-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 140}>
                <div className="group relative overflow-hidden rounded-lg border border-ink/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        {p.text}
                      </p>
                    </div>
                    <span className="font-display text-sm tabular-nums text-muted-foreground/50">
                      {p.n}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
