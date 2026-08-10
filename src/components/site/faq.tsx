import { useState } from "react";
import { cn } from "@/lib/utils";
import { faq } from "./event-data";
import { SectionHeading } from "./reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-ink/10 bg-paper-dim py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Perguntas"
          title="Antes de você se inscrever"
          description="Se ficar qualquer dúvida, fale com a gente no WhatsApp da secretaria."
        />

        <div>
          {faq.map((item, i) => (
            <div key={item.q} className="border-b border-ink/10 first:border-t">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-base font-semibold sm:text-lg">{item.q}</span>
                <span
                  className={cn(
                    "relative grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-500",
                    open === i && "bg-primary text-primary-foreground",
                  )}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-px bg-current transition-transform duration-500",
                      open === i && "scale-y-0",
                    )}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-700 ease-[var(--ease-out-expo)]",
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p className="min-h-0 max-w-xl pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
