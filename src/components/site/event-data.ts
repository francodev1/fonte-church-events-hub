export const EVENT = {
  name: "Café com Dança",
  church: "Fonte Church",
  edition: "2026",
  theme: "Propósito, movimento e comunhão",
  dateISO: "2026-09-19T18:00:00-03:00",
  dateLabel: "Sábado, 19 de setembro de 2026 · 18h",
  venue: "Av. Independência, 36 — Maringá",
  city: "Alvorada, RS",
  price: "R$ 15,00",
  verse: "Louvai-o com adufes e danças. — Salmos 150:4",
};

export const stats = [
  { value: "19.09", label: "sábado à noite" },
  { value: "18h", label: "abertura das portas" },
  { value: "R$ 15", label: "inscrição" },
  { value: "150:4", label: "Salmos" },
];

export const schedule = [
  {
    day: "Momento 01",
    date: "18h00 — 19h00",
    title: "Chegada",
    items: [
      { time: "18:00", name: "Recepção & credenciamento", note: "Entrada principal" },
      { time: "18:15", name: "Café, doces e boas-vindas", note: "Salão" },
      { time: "18:40", name: "Abertura e oração inicial", note: "Pastoral Fonte" },
      { time: "18:55", name: "Aquecimento em roda", note: "Todos juntos" },
    ],
  },
  {
    day: "Momento 02",
    date: "19h00 — 20h30",
    title: "Movimento",
    items: [
      { time: "19:00", name: "Adoração com dança e movimento", note: "Ministério de Dança" },
      { time: "19:30", name: "Louvor ao vivo · Salmos 150:4", note: "Banda Fonte" },
      { time: "20:00", name: "Coreografia coletiva", note: "Participação livre" },
      { time: "20:20", name: "Palavra: propósito em movimento", note: "Pastoral Fonte" },
    ],
  },
  {
    day: "Momento 03",
    date: "20h30 — 22h00",
    title: "Comunhão",
    items: [
      { time: "20:40", name: "Segundo café & mesas de conversa", note: "Salão" },
      { time: "21:10", name: "Rodas de oração", note: "Grupos pequenos" },
      { time: "21:40", name: "Última música", note: "Todos juntos" },
      { time: "22:00", name: "Encerramento", note: "Até a próxima" },
    ],
  },
];

export const faq = [
  {
    q: "Preciso saber dançar?",
    a: "Não. O Café com Dança é para quem quer adorar em movimento, do jeito que der. Tem roda guiada, passos simples e ninguém é avaliado.",
  },
  {
    q: "Quanto custa e o que está incluso?",
    a: "A inscrição é de R$ 15,00 por pessoa e inclui o café, os doces e toda a programação da noite.",
  },
  {
    q: "Onde acontece?",
    a: "Na Fonte Church, Av. Independência, 36 — bairro Maringá, Alvorada/RS. O portão abre às 18h.",
  },
  {
    q: "Preciso ser membro da Fonte Church?",
    a: "Não. O encontro é aberto para membros, visitantes e amigos de outras igrejas. Basta se inscrever antes.",
  },
  {
    q: "Posso levar minha família?",
    a: "Sim, o ambiente é acolhedor para todas as idades. Cada pessoa precisa da sua própria inscrição.",
  },
  {
    q: "Como confirmo minha inscrição?",
    a: "Depois de enviar seus dados, você recebe as instruções de pagamento por e-mail ou WhatsApp e a vaga é confirmada.",
  },
];
