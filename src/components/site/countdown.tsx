import { useEffect, useState } from "react";
import { EVENT } from "./event-data";

const UNITS: { key: keyof Parts; label: string }[] = [
  { key: "days", label: "dias" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
];

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function parts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ inverse = false }: { inverse?: boolean }) {
  const target = new Date(EVENT.dateISO).getTime();
  const [value, setValue] = useState<Parts | null>(null);

  useEffect(() => {
    setValue(parts(target));
    const id = setInterval(() => setValue(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="grid w-full max-w-md grid-cols-4 gap-px overflow-hidden rounded-lg border border-paper/15 bg-paper/10 backdrop-blur-sm">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="bg-ink/40 px-2 py-4 text-center">
          <div className="font-display text-2xl font-semibold tabular-nums text-paper sm:text-3xl">
            {value ? String(value[key]).padStart(2, "0") : "--"}
          </div>
          <div className="eyebrow mt-1.5 text-[0.6rem] text-paper/50">{label}</div>
        </div>
      ))}
      <span className="sr-only">
        {inverse ? "" : ""}Contagem regressiva para {EVENT.dateLabel}
      </span>
    </div>
  );
}
