import clerk from '@clerk/astro';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

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
const clerkAtivo = Boolean(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

if (!clerkAtivo) {
  console.warn(
    '[astro] Clerk inativo: defina PUBLIC_CLERK_PUBLISHABLE_KEY e CLERK_SECRET_KEY para habilitar o login social.',
  );
}

export default defineConfig({
  integrations: clerkAtivo ? [clerk()] : [],
  site: 'https://familiakato.vercel.app',
  output: 'server',
  adapter: vercel(),
  vite: {
    ssr: { external: ['node:async_hooks'] },
    build: {
      target: 'es2022',
      // O SDK do Clerk importa 'cloudflare:workers' de forma dinamica e
      // tolerante (try/catch). Sem marcá-lo como external o Rollup falha
      // ao resolver o modulo quando a integração do Clerk está desligada.
      rollupOptions: { external: ['cloudflare:workers'] },
    },
  },
});
