const evolutionApiUrl = process.env.EVOLUTION_API_URL;
const evolutionApiKey = process.env.EVOLUTION_API_KEY;

export interface WhatsAppQrResponse {
  base64?: string;
  code?: string;
  pairingCode?: string;
  instanceName: string;
}

export function isWhatsAppApiConfigured() {
  return Boolean(evolutionApiUrl && evolutionApiKey);
}

export async function createWhatsAppQr(instanceName: string): Promise<WhatsAppQrResponse> {
  if (!evolutionApiUrl || !evolutionApiKey) {
    throw new Error('Evolution API não configurada. Defina EVOLUTION_API_URL e EVOLUTION_API_KEY.');
  }

  const normalizedUrl = evolutionApiUrl.replace(/\/$/, '');
  const headers = {
    'Content-Type': 'application/json',
    apikey: evolutionApiKey,
  };

  await fetch(`${normalizedUrl}/instance/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      instanceName,
      integration: 'WHATSAPP-BAILEYS',
      qrcode: true,
    }),
  });

  const response = await fetch(`${normalizedUrl}/instance/connect/${encodeURIComponent(instanceName)}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Evolution API respondeu com status ${response.status}.`);
  }

  const data = await response.json();
  return { ...data, instanceName };
}
