import { NextResponse } from 'next/server';
import { createWhatsAppQr, isWhatsAppApiConfigured } from '@/src/lib/whatsapp';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();

  if (!userResult.user) {
    return NextResponse.json({ error: 'Sessao expirada. Entre novamente.' }, { status: 401 });
  }

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
    await supabase.from('whatsapp_connections').upsert(
      {
        user_id: userResult.user.id,
        name: instanceName,
        instance_name: instanceName,
        status: 'pending',
        is_backup: false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,is_backup' },
    );

    return NextResponse.json(qrCode);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível gerar o QR Code.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
