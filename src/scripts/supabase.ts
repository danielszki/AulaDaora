// src/scripts/supabase.ts
// Cliente Supabase compartilhado. Funciona apenas se as variáveis
// públicas PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY estiverem definidas
// (no .env local ou nas Environment Variables da Vercel).
// Caso contrário, o site continua operando com localStorage (modo local).
//
// Dois clientes são usados de propósito:
//   - auth:  login/cadastro por e-mail e senha (e OAuth) do Supabase
//   - dados: leitura/escrita em `pessoas` + Storage, autenticando com o JWT
//            do Supabase OU com o JWT do Clerk (Supabase Third-Party Auth)
//
// O SDK do Supabase não permite usar `supabase.auth.*` no mesmo cliente que
// recebe a opção `accessToken`, por isso a separação.

import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};

/**
 * Aceita tanto `https://projeto.supabase.co` quanto a URL exibida no painel
 * (`https://projeto.supabase.co/rest/v1/`). O SDK concatena `/rest/v1` por
 * conta própria — se a variável já vier com o caminho, as chamadas viram
 * `/rest/v1/rest/v1/...` e tudo responde 404.
 */
function normalizarUrlSupabase(valor: string): string {
  const bruto = String(valor || '').trim();
  if (!bruto) return '';
  try {
    return new URL(bruto).origin;
  } catch {
    return bruto.replace(/\/+$/, '').replace(/\/(rest|auth|storage)\/v1$/i, '');
  }
}

const url = normalizarUrlSupabase(env.PUBLIC_SUPABASE_URL || '');
const anon = env.PUBLIC_SUPABASE_ANON_KEY || '';
const clerkPublic = env.PUBLIC_CLERK_PUBLISHABLE_KEY || '';

type ClerkUserLike = {
  id?: string;
  primaryEmailAddress?: { emailAddress?: string } | null;
  emailAddresses?: Array<{ emailAddress?: string }>;
};

type ClerkLike = {
  session?: { getToken: () => Promise<string | null> } | null;
  user?: ClerkUserLike | null;
  signOut?: () => Promise<void>;
};

let _auth: any = null;
let _data: any = null;

function getClerk(): ClerkLike | null {
  if (typeof window === 'undefined') return null;
  return (window as any).Clerk || null;
}

/** O Clerk está configurado neste build? (chave pública presente) */
export function isClerkEnabled(): boolean {
  return Boolean(clerkPublic);
}

export function isClerkSignedIn(): boolean {
  return Boolean(getClerk()?.user);
}

/** O script do Clerk é injetado de forma assíncrona; espera curta para a UI. */
export async function waitForClerk(timeoutMs = 4000): Promise<ClerkLike | null> {
  if (!isClerkEnabled()) return null;
  const inicio = Date.now();
  let c = getClerk();
  while (!c && Date.now() - inicio < timeoutMs) {
    await new Promise((r) => setTimeout(r, 100));
    c = getClerk();
  }
  return c;
}

/** Lê o payload de um JWT (sem validar assinatura — só para escolher o token). */
function payloadDoJwt(token: string): Record<string, any> | null {
  try {
    const partes = token.split('.');
    if (partes.length !== 3) return null;
    const base64 = partes[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * JWT do Clerk para o Supabase Third-Party Auth.
 *
 * A integração oficial "Connect with Supabase" (Clerk Dashboard) injeta o
 * claim `role: "authenticated"` no token de sessão padrão — é esse token que
 * o Supabase aceita. Quem prefere um JWT template (ex.: `supabase`) também
 * funciona: escolhemos o primeiro token que tenha o claim `role`.
 */
export async function getClerkToken(): Promise<string | null> {
  let c = getClerk();
  if (!c && isClerkEnabled()) c = await waitForClerk();
  if (!c) return null;

  // `window.Clerk` aparece antes de terminar de carregar.
  const clerk = c as any;
  if (typeof clerk.load === 'function' && clerk.loaded === false) {
    try {
      await clerk.load();
    } catch {
      /* segue com o que estiver disponível */
    }
  }

  const session = clerk.session;
  if (!session?.getToken) return null;

  const tentativas: Array<Record<string, any>> = [{}, { template: 'supabase' }];
  let primeiro: string | null = null;
  for (const opcoes of tentativas) {
    try {
      const token = await session.getToken(opcoes);
      if (!token) continue;
      primeiro = primeiro || token;
      if (payloadDoJwt(token)?.role) return token;
    } catch {
      /* template inexistente ou sessão expirada */
    }
  }
  return primeiro;
}

export function isCloudEnabled(): boolean {
  return Boolean(url && anon);
}

/**
 * Cliente de dados (tabelas e Storage).
 * O token enviado é, em ordem: sessão do Supabase > sessão do Clerk > anon.
 * Sem login, as leituras públicas continuam funcionando (RLS de SELECT),
 * mas escritas são bloqueadas.
 */
export function getSupabase(): any {
  if (!isCloudEnabled()) return null;
  if (!_data) {
    _data = createClient(url, anon, {
      accessToken: async () => {
        const sessao = _auth ? (await _auth.auth.getSession()).data?.session : null;
        if (sessao?.access_token) return sessao.access_token;
        return getClerkToken();
      },
    });
  }
  return _data;
}

/** Cliente de autenticação do Supabase (e-mail/senha e OAuth). */
export function getAuthClient(): any {
  if (!isCloudEnabled()) return null;
  if (!_auth) {
    _auth = createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _auth;
}

/**
 * Sessão para a interface. Retorna a sessão do Supabase quando existe e,
 * caso contrário, uma sessão sintética a partir do usuário do Clerk — assim
 * o painel mostra "conectado" para quem entrou por qualquer um dos dois.
 */
export async function getSession(): Promise<any> {
  const auth = getAuthClient();
  if (auth) {
    const { data } = await auth.auth.getSession();
    if (data?.session) return data.session;
  }
  const c = await waitForClerk();
  if (c?.user) {
    const email =
      c.user.primaryEmailAddress?.emailAddress ||
      c.user.emailAddresses?.[0]?.emailAddress ||
      '';
    return { user: { id: c.user.id, email }, provider: 'clerk' };
  }
  return null;
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const auth = getAuthClient();
  if (!auth) return { ok: false, error: 'Nuvem não configurada.' };
  const { error } = await auth.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signUp(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const auth = getAuthClient();
  if (!auth) return { ok: false, error: 'Nuvem não configurada.' };
  const { error } = await auth.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const auth = getAuthClient();
  if (auth) await auth.auth.signOut();
  const c = getClerk();
  if (c?.signOut) {
    try {
      await c.signOut();
    } catch {
      /* sessão do Clerk já encerrada */
    }
  }
}

// Login social via OAuth (Google, Facebook, GitHub).
// Redireciona o usuário para o provedor; ao voltar, o Supabase cria/sessão automaticamente.
export type provedorSocial = 'google' | 'facebook' | 'github';

export async function signInSocial(provedor: provedorSocial): Promise<{ ok: boolean; error?: string }> {
  const auth = getAuthClient();
  if (!auth) return { ok: false, error: 'Nuvem não configurada.' };
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await auth.auth.signInWithOAuth({
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
