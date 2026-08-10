import { EVENT } from "./event-data";

const WORDS = ["Dança", "Adoração", "Café", "Comunhão", "Movimento", "Propósito"];

export function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="border-y border-ink/10 bg-paper-dim py-4">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {items.map((w, i) => (
            <span key={`${w}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-sm font-medium tracking-tight text-foreground/70">
                {w}
              </span>
              <span className="size-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
        <div aria-hidden className="flex w-max animate-marquee items-center gap-10 pr-10">
          {items.map((w, i) => (
            <span key={`b-${w}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-sm font-medium tracking-tight text-foreground/70">
                {w}
              </span>
              <span className="size-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">Pilares do {EVENT.name}</span>
    </div>
  );
}
