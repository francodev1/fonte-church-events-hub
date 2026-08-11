// Implementação sem o SDK "googleapis": esse pacote depende de APIs de crypto
// exclusivas do Node e quebra em runtimes de borda (Cloudflare Workers, Vercel
// Edge). Aqui a autenticação de service account é feita à mão com Web Crypto
// (compatível em qualquer runtime) e a Sheets API é chamada direto via fetch.

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

function base64url(input: ArrayBuffer | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"];
  const privateKeyPem = normalizePrivateKey(process.env["GOOGLE_PRIVATE_KEY"]);

  if (!clientEmail || !privateKeyPem) {
    throw new Error(
      "Credenciais Google ausentes. Defina GOOGLE_SERVICE_ACCOUNT_EMAIL e GOOGLE_PRIVATE_KEY.",
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  )}`;

  const key = await importPrivateKey(privateKeyPem);
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${base64url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Falha ao autenticar com o Google: ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

function getSpreadsheetId(): string {
  const spreadsheetId = process.env["GOOGLE_SHEETS_ID"];
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_ID não está configurado.");
  }
  return spreadsheetId;
}

async function sheetsFetch(path: string, accessToken: string, init?: RequestInit) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na Sheets API (${response.status}): ${await response.text()}`);
  }

  return response.json();
}

export async function appendRegistration(data: Registration) {
  const spreadsheetId = getSpreadsheetId();
  const accessToken = await getAccessToken();

  await sheetsFetch(
    `${spreadsheetId}/values/A:J:append?valueInputOption=USER_ENTERED`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify({
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
      }),
    },
  );
}

export async function updatePaymentStatus(params: {
  email: string;
  status: PaymentStatus;
  paymentMethod: string;
  paymentId: string;
}) {
  const spreadsheetId = getSpreadsheetId();
  const accessToken = await getAccessToken();
  const normalizedEmail = params.email.trim().toLowerCase();

  const getResult = await sheetsFetch(`${spreadsheetId}/values/A2:J`, accessToken);
  const rows: string[][] = getResult.values || [];
  const rowIndex = rows.findIndex((row) => (row[2] || "").trim().toLowerCase() === normalizedEmail);

  if (rowIndex === -1) {
    return false;
  }

  const rowNumber = rowIndex + 2;
  await sheetsFetch(
    `${spreadsheetId}/values/H${rowNumber}:J${rowNumber}?valueInputOption=USER_ENTERED`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify({ values: [[params.status, params.paymentMethod, params.paymentId]] }),
    },
  );

  return true;
}
