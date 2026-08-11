import { Reveal, SectionHeading } from "./reveal";
import { useReveal } from "@/hooks/use-reveal";

export function Manifesto() {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  return (
    <section id="manifesto" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
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
            <blockquote className="mt-8 max-w-md font-script text-3xl leading-snug text-foreground">
              “Louvai-o com adufes e danças; louvai-o com instrumentos de cordas e com flautas.”
              <footer className="mt-3 font-sans text-sm font-normal text-muted-foreground">
                Salmos 150:4
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
