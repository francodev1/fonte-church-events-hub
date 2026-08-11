import { Reveal, SectionHeading } from "./reveal";
import { schedule } from "./event-data";

export function Schedule() {
  return (
    <section id="programacao" className="relative overflow-hidden surface-ink py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines-inverse opacity-50" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Cronograma"
          inverse
          title="Uma noite, minuto a minuto"
          description="Do check-in à oração de encerramento — o roteiro completo do Café com Dança."
        />

        <ul className="mt-14 divide-y divide-paper/10 border-t border-paper/10">
          {schedule.map((item, i) => (
            <Reveal as="li" key={item.time} delay={Math.min(i * 60, 480)}>
              <div className="group grid grid-cols-1 gap-1.5 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-8">
                <span className="font-display text-sm font-semibold tabular-nums text-gold">
                  {item.time}
                </span>
                <span className="text-base text-paper transition-transform duration-500 group-hover:translate-x-1 sm:text-lg">
                  {item.name}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8 text-sm text-paper/50">
          Horários sujeitos a pequenos ajustes — inscritos recebem o roteiro final por WhatsApp.
        </Reveal>
      </div>
    </section>
  );
}
