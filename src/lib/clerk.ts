/**
 * Verifica se a autenticação Clerk está configurada neste ambiente.
 *
 * O predicado é idêntico ao usado em astro.config.mjs:
 *   - PUBLIC_CLERK_PUBLISHABLE_KEY precisa existir no build (inlined pelo Vite)
 *   - CLERK_SECRET_KEY precisa existir no runtime (segredo nunca é inlined)
 *
 * Mantendo os dois lados em acordo, o middleware, o Header e a integração
 * ligam e desligam juntos. Sem as chaves o site continua funcionando: o
 * login por Supabase (src/pages/login.astro) permanece disponível e o Clerk
 * fica inativo em vez de derrubar todas as rotas com erro 500.
 */
export function clerkEnabled(): boolean {
  const publica = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secreta = typeof process !== 'undefined' && process.env ? process.env.CLERK_SECRET_KEY : undefined;
  return Boolean(publica && secreta);
}

/** Aviso exibido na interface quando o Clerk está inativo. */
export const clerkDesativadoAviso =
  'Login social (Clerk) desativado: configure PUBLIC_CLERK_PUBLISHABLE_KEY e CLERK_SECRET_KEY no ambiente.';
