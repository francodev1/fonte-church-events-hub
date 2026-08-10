import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Manifesto } from "@/components/site/manifesto";
import { Experiences } from "@/components/site/experiences";
import { Schedule } from "@/components/site/schedule";
import { Voices } from "@/components/site/voices";
import { Faq } from "@/components/site/faq";
import { Registration } from "@/components/site/registration";
import { SiteFooter } from "@/components/site/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Café com Dança 2026 | Fonte Church — Alvorada, RS" },
      {
        name: "description",
        content:
          "Café com Dança da Fonte Church: sábado, 19 de setembro de 2026, às 18h, em Alvorada/RS. Adoração com dança, louvor, café e comunhão. Inscrição R$ 15,00.",
      },
      { property: "og:title", content: "Café com Dança 2026 | Fonte Church" },
      {
        property: "og:description",
        content:
          "Uma noite de adoração em movimento, café e comunhão na Fonte Church. 19 de setembro de 2026, 18h — garanta sua inscrição.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Experiences />
        <Schedule />
        <Voices />
        <Faq />
        <Registration />
      </main>
      <SiteFooter />
    </div>
  );
}
