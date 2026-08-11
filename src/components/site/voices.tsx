import { Reveal, SectionHeading } from "./reveal";

const HIGHLIGHTS = [
  { label: "Coreografias guiadas", detail: "Passo a passo simples, sem decoreba." },
  { label: "Roda aberta", detail: "Todo mundo entra, do jeito que der." },
  { label: "Ensaios semanais", detail: "Quem quiser aprender é bem-vindo no time." },
];

export function Voices() {
  return (
    <section id="vozes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Quem conduz"
          title="Ministério de Dança Fonte"
          description="É o time que sobe ao altar em movimento — e que também conduz o Café com Dança do início ao fim."
        />

        <Reveal className="mt-14 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Um grupo de dançarinos da Fonte Church dedicado a adorar com o corpo inteiro e a abrir
            espaço para que qualquer pessoa dance também — inspirados em Salmos 150:4. Na noite do
            Café com Dança, é esse time que ensina os passos, guia a roda e leva a comunidade junto
            até o altar.
          </p>

          <ul className="grid gap-3 sm:grid-cols-1">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.label}
                className="rounded-lg border border-ink/10 bg-card p-5 transition-colors duration-500 hover:border-gold/40"
              >
                <span className="block font-display text-base font-semibold">{h.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{h.detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
