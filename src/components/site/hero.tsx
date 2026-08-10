import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-danca.jpg";
import { EVENT, stats } from "./event-data";
import { Countdown } from "./countdown";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 40 });
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY * 0.18, 120));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden surface-ink"
    >
      <img
        src={heroImg}
        alt="Ministério de dança da Fonte Church adorando com tecidos em luz azul marinho"
        width={1600}
        height={1104}
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
        className="absolute inset-0 size-full object-cover opacity-45 transition-transform duration-300 ease-out will-change-transform"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.135_0.04_264/0.96),oklch(0.15_0.045_262/0.6)_45%,oklch(0.15_0.045_262/0.85))]" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(38rem 38rem at ${pointer.x}% ${pointer.y}%, color-mix(in oklab, var(--azure) 26%, transparent), transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 grid-lines-inverse opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-32 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="size-1.5 animate-pulse rounded-full bg-azure" />
          <span className="eyebrow text-paper/60">
            {EVENT.church} · {EVENT.edition} · Inscrições abertas
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.92] text-paper">
          Café com Dança
          <span className="block text-paper/40">Propósito em movimento</span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-paper/15 pt-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-paper/75">
              Uma noite para celebrar o Senhor em adoração, movimento e comunhão.
              Louvor inspirado em Salmos 150:4, dança e um café que aproxima a
              família {EVENT.church}.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#inscricao"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Garantir minha inscrição · {EVENT.price}
                <span className="grid size-5 place-items-center rounded-full bg-ink/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#programacao"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-paper/10"
              >
                Ver o roteiro da noite
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/60">
              <span className="font-medium text-paper/90">{EVENT.dateLabel}</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {EVENT.venue} · {EVENT.city}
              </span>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <p className="eyebrow mb-3 text-paper/50">Começa em</p>
            <Countdown />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-paper/12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper/[0.04] px-5 py-5">
              <div className="font-display text-2xl font-semibold text-paper">{s.value}</div>
              <div className="mt-1 text-xs text-paper/50">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2 text-paper/40">
          <ArrowDown className="size-4 animate-float-slow" />
          <span className="eyebrow text-[0.6rem]">role para explorar</span>
        </div>
      </div>
    </section>
  );
}
