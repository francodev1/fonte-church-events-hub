import { google } from "googleapis";

// Colunas da planilha de inscrições (aba padrão, a partir de A2):
// A: Data/Hora · B: Nome · C: Email · D: WhatsApp · E: Igreja
// F: Participação · G: Valor · H: Status Pagamento · I: Forma Pagamento · J: ID Pagamento

export type Registration = {
  nome: string;
  email: string;
  telefone: string;
  igreja: string;
  modo: string;
  valor: number;
};

export type PaymentStatus = "Confirmado" | "Pendente" | "Recusado";

function normalizePrivateKey(raw: string | undefined) {
  if (!raw) return undefined;
  return raw.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

function getSheetsClient() {
  const clientEmail = process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"];
  const privateKey = normalizePrivateKey(process.env["GOOGLE_PRIVATE_KEY"]);
  const spreadsheetId = process.env["GOOGLE_SHEETS_ID"];

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Credenciais Google ausentes. Defina GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY e GOOGLE_SHEETS_ID.",
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function appendRegistration(data: Registration) {
  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("pt-BR"),
          data.nome,
          data.email,
          data.telefone,
          data.igreja || "",
          data.modo,
          data.valor,
          "Pendente",
          "",
          "",
        ],
      ],
    },
  });
}

export async function updatePaymentStatus(params: {
  email: string;
  status: PaymentStatus;
  paymentMethod: string;
  paymentId: string;
}) {
  const { sheets, spreadsheetId } = getSheetsClient();
  const normalizedEmail = params.email.trim().toLowerCase();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A2:J",
  });

  const rows = response.data.values || [];
  const rowIndex = rows.findIndex((row) => (row[2] || "").trim().toLowerCase() === normalizedEmail);

  if (rowIndex === -1) {
    return false;
  }

  const rowNumber = rowIndex + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `H${rowNumber}:J${rowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[params.status, params.paymentMethod, params.paymentId]] },
  });

  return true;
}
