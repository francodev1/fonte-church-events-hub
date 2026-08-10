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
      { title: "Face a Face 2026 | Fonte Church — 3 dias de imersão" },
      {
        name: "description",
        content:
          "Face a Face 2026 da Fonte Church: três dias de adoração, palavra e comunidade em São Paulo, de 09 a 11 de outubro. Inscrição gratuita e vagas limitadas.",
      },
      { property: "og:title", content: "Face a Face 2026 | Fonte Church" },
      {
        property: "og:description",
        content:
          "Três dias de adoração, palavra e comunidade na Fonte Church. 09 a 11 de outubro de 2026 — garanta sua vaga.",
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
