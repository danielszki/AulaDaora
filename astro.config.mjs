import clerk from '@clerk/astro';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

/**
 * A integração do Clerk é habilitada somente quando as chaves existem.
 * Sem elas, o SDK injeta um script que lança
 * "Clerk keys are missing from your environment" no navegador e, no SSR,
 * derruba todas as rotas com erro 500.
 *
 * Para ativar o login social, defina no ambiente de deploy:
 *   PUBLIC_CLERK_PUBLISHABLE_KEY
 *   CLERK_SECRET_KEY
 */
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };

  const clerkAtivo = Boolean(env.PUBLIC_CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY);

  if (!clerkAtivo) {
    console.warn(
      '[astro] Clerk inativo: defina PUBLIC_CLERK_PUBLISHABLE_KEY e CLERK_SECRET_KEY para habilitar o login social.',
    );
  }

  return {
    integrations: clerkAtivo ? [clerk()] : [],
    site: 'https://familiakato.vercel.app',
    output: 'server',
    adapter: vercel(),
  };
});
