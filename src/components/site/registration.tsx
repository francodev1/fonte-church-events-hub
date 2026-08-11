import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EVENT } from "./event-data";
import { Countdown } from "./countdown";
import { SectionHeading } from "./reveal";

const OPTIONS = ["Sozinho(a)", "Com a família", "Com meu grupo"];
const PRICE_VALUE = 15;

export function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [church, setChurch] = useState("");
  const [mode, setMode] = useState(OPTIONS[0]!);
  const [loading, setLoading] = useState(false);

  const valid =
    name.trim().length > 2 && /.+@.+\..+/.test(email) && phone.replace(/\D/g, "").length >= 10;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || loading) {
      if (!valid) toast.error("Preencha nome, e-mail e WhatsApp para continuar.");
      return;
    }

    setLoading(true);
    try {
      const inscricaoRes = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, email, telefone: phone, igreja: church, modo: mode }),
      });
      const inscricaoData = await inscricaoRes.json();
      if (!inscricaoRes.ok) {
        toast.error(inscricaoData.message || "Não foi possível salvar sua inscrição.");
        return;
      }

      const pagamentoRes = await fetch("/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, email, telefone: phone, valor: PRICE_VALUE }),
      });
      const pagamentoData = await pagamentoRes.json();
      if (!pagamentoRes.ok || !pagamentoData.initPoint) {
        toast.error(pagamentoData.error || "Não foi possível abrir o pagamento.");
        return;
      }

      toast.success("Inscrição salva! Redirecionando para o pagamento...");
      window.location.href = pagamentoData.initPoint;
    } catch {
      toast.error("Falha de conexão. Tente novamente em alguns instantes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="inscricao"
      className="relative overflow-hidden surface-ink glow-top py-24 sm:py-32"
    >
      <div className="absolute inset-0 grid-lines-inverse opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Inscrição"
            inverse
            title="Garanta seu lugar no Café com Dança"
            description="Deixe seus dados e você é levado direto para o pagamento seguro via Mercado Pago. A inscrição é individual e inclui o café da noite."
          />
          <div className="mt-10 max-w-md">
            <Countdown />
          </div>
          <dl className="mt-10 grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-paper/45">Data e horário</dt>
              <dd className="mt-1.5 text-paper">{EVENT.dateLabel}</dd>
            </div>
            <div>
              <dt className="eyebrow text-paper/45">Local</dt>
              <dd className="mt-1.5 text-paper">
                {EVENT.venue}
                <span className="block text-paper/50">{EVENT.city}</span>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-paper/45">Valor</dt>
              <dd className="mt-1.5 text-paper">{EVENT.price} por pessoa</dd>
            </div>
            <div>
              <dt className="eyebrow text-paper/45">Inspiração</dt>
              <dd className="mt-1.5 text-paper">Salmos 150:4</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-paper/15 bg-paper/[0.05] p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="nome" className="eyebrow text-paper/50">
                Nome completo
              </label>
              <input
                id="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como te chamamos?"
                className="mt-2.5 w-full border-b border-paper/20 bg-transparent pb-2.5 text-base text-paper placeholder:text-paper/30 transition-colors focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow text-paper/50">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="mt-2.5 w-full border-b border-paper/20 bg-transparent pb-2.5 text-base text-paper placeholder:text-paper/30 transition-colors focus:border-gold focus:outline-none"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="whatsapp" className="eyebrow text-paper/50">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(51) 90000-0000"
                  className="mt-2.5 w-full border-b border-paper/20 bg-transparent pb-2.5 text-base text-paper placeholder:text-paper/30 transition-colors focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="igreja" className="eyebrow text-paper/50">
                  Igreja
                </label>
                <input
                  id="igreja"
                  value={church}
                  onChange={(e) => setChurch(e.target.value)}
                  placeholder="Fonte Church"
                  className="mt-2.5 w-full border-b border-paper/20 bg-transparent pb-2.5 text-base text-paper placeholder:text-paper/30 transition-colors focus:border-gold focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span className="eyebrow text-paper/50">Como vai participar</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {OPTIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setMode(o)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                      mode === o
                        ? "border-gold bg-gold/15 text-paper"
                        : "border-paper/20 text-paper/60 hover:border-paper/40",
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "group mt-2 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300",
                valid && !loading
                  ? "bg-paper text-ink hover:-translate-y-0.5"
                  : "bg-paper/25 text-paper/60",
              )}
            >
              {loading ? "Abrindo pagamento..." : `Finalizar inscrição · ${EVENT.price}`}
              {!loading ? (
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              ) : null}
            </button>
            <p className="text-xs leading-relaxed text-paper/40">
              Inscrição de {EVENT.price} por pessoa, com café incluso. Pagamento processado com
              segurança pelo Mercado Pago. Usamos seus dados apenas para comunicação do evento.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
