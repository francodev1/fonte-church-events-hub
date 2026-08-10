import { Reveal, SectionHeading } from "./reveal";
import { useReveal } from "@/hooks/use-reveal";

const PILLARS = [
  {
    n: "01",
    title: "Sem pressa",
    text: "Blocos longos de louvor e silêncio. Nada de correria entre um item e outro da agenda.",
  },
  {
    n: "02",
    title: "Sem palco alto",
    text: "Mesas de conversa, rodas pequenas e liderança acessível. Perguntas são bem-vindas.",
  },
  {
    n: "03",
    title: "Sem espectadores",
    text: "Todo mundo participa de alguma forma: oração, acolhimento, música ou serviço.",
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
              eyebrow="Manifesto"
              title={
                <>
                  Um encontro feito para
                  <span className="text-muted-foreground"> gente real</span>, não para plateias.
                </>
              }
              description="O Face a Face nasceu de uma pergunta simples: e se a gente parasse tudo por três dias só para estar diante de Deus e uns dos outros? Nove edições depois, a resposta continua a mesma."
            />
            <Reveal delay={120} className="mt-10">
              <span
                ref={ref}
                data-visible={visible}
                className="line-grow block h-px w-full bg-ink/15"
              />
              <blockquote className="mt-8 max-w-md font-display text-xl leading-snug text-foreground">
                “Uma coisa pedi ao Senhor: que eu possa contemplar a sua beleza.”
                <footer className="mt-3 text-sm font-normal text-muted-foreground">
                  Salmos 27:4
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
