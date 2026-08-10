export const EVENT = {
  name: "Face a Face",
  church: "Fonte Church",
  edition: "2026",
  theme: "Presença",
  dateISO: "2026-10-09T19:00:00-03:00",
  dateLabel: "09 — 11 de Outubro, 2026",
  venue: "Fonte Church · Auditório Central",
  city: "São Paulo, SP",
};

export const stats = [
  { value: "3", label: "dias de imersão" },
  { value: "12", label: "encontros" },
  { value: "1.800", label: "lugares" },
  { value: "9ª", label: "edição" },
];

export const schedule = [
  {
    day: "Dia 01",
    date: "Sex, 09 Out",
    title: "Abertura",
    items: [
      { time: "18:00", name: "Credenciamento & Café", note: "Foyer" },
      { time: "19:30", name: "Culto de Abertura", note: "Auditório Central" },
      { time: "21:00", name: "Louvor Estendido", note: "Banda Fonte" },
      { time: "22:15", name: "Mesas de Conversa", note: "Rooftop" },
    ],
  },
  {
    day: "Dia 02",
    date: "Sáb, 10 Out",
    title: "Profundidade",
    items: [
      { time: "09:00", name: "Devocional Guiado", note: "Capela" },
      { time: "10:30", name: "Palavra · Face a Face", note: "Pr. Daniel Moraes" },
      { time: "14:00", name: "Trilhas Simultâneas", note: "4 salas" },
      { time: "19:30", name: "Noite de Adoração", note: "Auditório Central" },
    ],
  },
  {
    day: "Dia 03",
    date: "Dom, 11 Out",
    title: "Envio",
    items: [
      { time: "09:30", name: "Oração da Manhã", note: "Capela" },
      { time: "11:00", name: "Culto de Envio", note: "Auditório Central" },
      { time: "13:00", name: "Almoço Comunitário", note: "Praça Fonte" },
      { time: "16:00", name: "Encerramento", note: "Todos juntos" },
    ],
  },
];

export const faq = [
  {
    q: "Preciso ser membro da Fonte Church?",
    a: "Não. O Face a Face é aberto para qualquer pessoa — membros, visitantes e convidados de outras igrejas. Basta garantir sua inscrição.",
  },
  {
    q: "Crianças podem participar?",
    a: "Sim. Temos o Fonte Kids funcionando em todos os horários de plenária, com equipe treinada e atividades por faixa de idade.",
  },
  {
    q: "Como funciona a inscrição?",
    a: "A inscrição é individual e nominal. Você recebe um QR Code por e-mail que serve como credencial nos três dias do evento.",
  },
  {
    q: "Existe estacionamento no local?",
    a: "Sim, com vagas gratuitas para inscritos até o limite da capacidade, além de van gratuita saindo da estação mais próxima.",
  },
  {
    q: "Vou poder assistir online?",
    a: "As plenárias da noite são transmitidas ao vivo. As trilhas e mesas de conversa são exclusivamente presenciais.",
  },
];
