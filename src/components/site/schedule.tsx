import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./reveal";
import { schedule } from "./event-data";

export function Schedule() {
  const [active, setActive] = useState(0);
  const day = schedule[active] ?? schedule[0]!;

  return (
    <section id="programacao" className="relative overflow-hidden surface-ink py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines-inverse opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Programação"
          inverse
          title="Uma noite em três movimentos"
          description="Escolha um momento para ver os horários. Das 18h às 22h, entre café, dança e comunhão."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {schedule.map((d, i) => (
              <button
                key={d.day}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "group min-w-[190px] rounded-lg border p-5 text-left transition-all duration-500",
                  active === i
                    ? "border-azure/60 bg-paper/[0.08]"
                    : "border-paper/12 hover:border-paper/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-paper/50">{d.day}</span>
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      active === i ? "bg-azure" : "bg-paper/25",
                    )}
                  />
                </div>
                <div className="mt-3 font-display text-xl font-semibold text-paper">{d.title}</div>
                <div className="mt-1 text-sm text-paper/50">{d.date}</div>
              </button>
            ))}
          </div>

          <div key={active} className="animate-fade-in">
            <ul className="divide-y divide-paper/10 border-t border-paper/10">
              {day.items.map((item) => (
                <li
                  key={item.time + item.name}
                  className="group grid grid-cols-[80px_1fr] items-baseline gap-4 py-6 transition-colors sm:grid-cols-[120px_1fr_auto] sm:gap-8"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-azure">
                    {item.time}
                  </span>
                  <span className="text-lg text-paper transition-transform duration-500 group-hover:translate-x-1">
                    {item.name}
                  </span>
                  <span className="col-start-2 text-sm text-paper/45 sm:col-start-3">
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
            <Reveal className="mt-8 text-sm text-paper/50">
              Horários sujeitos a pequenos ajustes — inscritos recebem o roteiro final por WhatsApp.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
