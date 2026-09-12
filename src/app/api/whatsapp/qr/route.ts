import { NextResponse } from 'next/server';
import { createWhatsAppQr, isWhatsAppApiConfigured } from '@/src/lib/whatsapp';

export async function POST(request: Request) {
  if (!isWhatsAppApiConfigured()) {
    return NextResponse.json(
      { error: 'Configure EVOLUTION_API_URL e EVOLUTION_API_KEY para gerar o QR Code.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const instanceName = typeof body.instanceName === 'string' ? body.instanceName.trim() : '';

    if (!instanceName) {
      return NextResponse.json({ error: 'Informe um nome para a conexão.' }, { status: 400 });
    }

    const qrCode = await createWhatsAppQr(instanceName);
    return NextResponse.json(qrCode);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível gerar o QR Code.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
