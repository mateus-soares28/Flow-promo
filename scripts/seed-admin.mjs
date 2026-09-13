import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';

function loadEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // Optional local env file.
  }
}

loadEnvFile(resolve(process.cwd(), '.env.local'));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@smartpromos.local';
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!supabaseUrl || !serviceRoleKey || !adminPassword) {
  console.error('Defina NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY e SEED_ADMIN_PASSWORD.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email: adminEmail,
  password: adminPassword,
  email_confirm: true,
  user_metadata: {
    full_name: 'Admin',
    plan_id: 'annual',
  },
});

let user = created.user;

if (createError && createError.message.includes('already been registered')) {
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) throw listError;
  user = users.users.find((item) => item.email === adminEmail) ?? null;
} else if (createError) {
  throw createError;
}

if (!user) {
  throw new Error(`Usuario admin nao encontrado: ${adminEmail}`);
}

const now = new Date();
const expiresAt = new Date(now);
expiresAt.setFullYear(expiresAt.getFullYear() + 10);

const { error: profileError } = await supabase
  .from('profiles')
  .upsert({ id: user.id, full_name: 'Admin', email: adminEmail, role: 'admin' }, { onConflict: 'id' });

if (profileError) throw profileError;

const { error: subscriptionError } = await supabase.from('subscriptions').insert({
  user_id: user.id,
  plan_id: 'annual',
  status: 'active',
  started_at: now.toISOString(),
  expires_at: expiresAt.toISOString(),
});

if (subscriptionError) throw subscriptionError;

console.log(`Admin pronto: ${adminEmail}`);
