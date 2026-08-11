import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EVENT } from "@/components/site/event-data";
import type { RegistrationRow } from "@/lib/google-sheets";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: `Painel de inscrições | ${EVENT.church}` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Painel,
});

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Confirmado"
      ? "bg-[oklch(0.55_0.14_150)] text-white"
      : status === "Recusado"
        ? "bg-destructive text-destructive-foreground"
        : "bg-secondary text-secondary-foreground";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
      {status || "Pendente"}
    </span>
  );
}

function Painel() {
  const [pin, setPin] = useState("");
  const [rows, setRows] = useState<RegistrationRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadRows(currentPin: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: currentPin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Não foi possível carregar os dados.");
        return;
      }
      setRows(data.rows);
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    loadRows(pin);
  }

  const total = rows?.length ?? 0;
  const confirmados = rows?.filter((r) => r.status === "Confirmado").length ?? 0;

  if (!rows) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs rounded-xl border border-border bg-card p-8 text-center"
        >
          <h1 className="font-display text-xl font-semibold text-foreground">Painel</h1>
          <p className="mt-1 text-sm text-muted-foreground">{EVENT.name}</p>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="mt-6 w-full rounded-md border border-input bg-transparent px-3 py-2.5 text-center text-lg tracking-widest focus:border-gold focus:outline-none"
          />
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={loading || !pin}
            className="mt-5 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Inscrições — {EVENT.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {total} inscrições · {confirmados} pagamentos confirmados
            </p>
          </div>
          <button
            type="button"
            onClick={() => loadRows(pin)}
            disabled={loading}
            className="rounded-full border border-input px-4 py-2 text-sm hover:bg-secondary"
          >
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">WhatsApp</th>
                <th className="px-4 py-3 font-medium">Participação</th>
                <th className="px-4 py-3 font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.email}-${i}`} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {r.createdAt}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.nome}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.telefone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.modo}</td>
                  <td className="px-4 py-3">R$ {r.valor}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.formaPagamento || "—"}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhuma inscrição ainda.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
