// src/scripts/supabase.ts
// Cliente Supabase compartilhado. Funciona apenas se as variáveis
// públicas PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY estiverem definidas
// (no .env local ou nas Environment Variables da Vercel).
// Caso contrário, o site continua operando com localStorage (modo local).

import { createClient } from '@supabase/supabase-js';

const url = (import.meta as any).env?.PUBLIC_SUPABASE_URL || '';
const anon = (import.meta as any).env?.PUBLIC_SUPABASE_ANON_KEY || '';

let _client: any = null;

export function isCloudEnabled(): boolean {
  return Boolean(url && anon);
}

export function getSupabase(): any {
  if (!isCloudEnabled()) return null;
  if (!_client) {
    _client = createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}

export async function getSession(): Promise<any> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data?.session || null;
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Nuvem não configurada.' };
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signUp(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Nuvem não configurada.' };
  const { error } = await sb.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (sb) await sb.auth.signOut();
}

// Login social via OAuth (Google, Facebook, GitHub).
// Redireciona o usuário para o provedor; ao voltar, o Supabase cria/sessão automaticamente.
export type provedorSocial = 'google' | 'facebook' | 'github';

export async function signInSocial(provedor: provedorSocial): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Nuvem não configurada.' };
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await sb.auth.signInWithOAuth({
    provider: provedor,
    options: { redirectTo },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function isAdmin(): Promise<boolean> {
  const s = await getSession();
  if (!s) return false;
  // Admin = email autorizado (definido em PUBLIC_ADMIN_EMAIL) OU flag no metadata
  const adminEmail = (import.meta as any).env?.PUBLIC_ADMIN_EMAIL || '';
  if (adminEmail && s.user?.email === adminEmail) return true;
  return s.user?.user_metadata?.role === 'admin';
}