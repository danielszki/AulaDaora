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
 *
 * `loadEnv` garante que o `.env` local também ative o Clerk (o Astro carrega
 * o `.env` no build, mas não em `astro dev` nem ao avaliar este arquivo).
 */
const env = { ...loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', process.cwd(), ''), ...process.env };

// Ajuda o middleware (src/lib/clerk.ts) e o SSR a enxergarem as mesmas chaves
// que ativaram a integração, inclusive durante o `astro dev`.
if (!process.env.PUBLIC_CLERK_PUBLISHABLE_KEY && env.PUBLIC_CLERK_PUBLISHABLE_KEY) {
  process.env.PUBLIC_CLERK_PUBLISHABLE_KEY = env.PUBLIC_CLERK_PUBLISHABLE_KEY;
}
if (!process.env.CLERK_SECRET_KEY && env.CLERK_SECRET_KEY) {
  process.env.CLERK_SECRET_KEY = env.CLERK_SECRET_KEY;
}

const clerkAtivo = Boolean(env.PUBLIC_CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY);

if (!clerkAtivo) {
  console.warn(
    '[astro] Clerk inativo: defina PUBLIC_CLERK_PUBLISHABLE_KEY e CLERK_SECRET_KEY para habilitar o login social.',
  );
}

/**
 * As páginas importam `SignIn`/`SignUp` de `@clerk/astro/components`, mas o
 * barrel do pacote também importa componentes de controle que dependem do
 * módulo virtual `virtual:@clerk/astro/config` — que só existe quando a
 * integração do Clerk está ligada. Sem as chaves, fornecemos um stub para
 * que o build continue funcionando (esses componentes não são renderizados).
 */
function clerkConfigStub() {
  const id = 'virtual:@clerk/astro/config';
  const resolved = '\0' + id;
  return {
    name: 'clerk-config-stub',
    resolveId(source) {
      if (source === id) return resolved;
    },
    load(source) {
      if (source === resolved) {
        return 'export function isStaticOutput() { return false; }';
      }
    },
  };
}

export default defineConfig({
  integrations: clerkAtivo
    ? [
        clerk({
          signInUrl: '/sign-in',
          signUpUrl: '/sign-up',
          afterSignOutUrl: '/',
          // A interface do Clerk vem em inglês por padrão; o site é em pt-BR.
          localization: { locale: 'pt-BR' },
          appearance: {
            variables: {
              colorPrimary: '#496b54',
              colorText: '#29322d',
              colorBackground: '#fffefb',
              borderRadius: '10px',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            },
          },
        }),
      ]
    : [],
  site: 'https://familiakato.vercel.app',
  output: 'server',
  adapter: vercel(),
  vite: {
    ssr: { external: ['node:async_hooks'] },
    plugins: clerkAtivo ? [] : [clerkConfigStub()],
    build: {
      target: 'es2022',
      // O SDK do Clerk importa 'cloudflare:workers' de forma dinamica e
      // tolerante (try/catch). Sem marcá-lo como external o Rollup falha
      // ao resolver o modulo quando a integração do Clerk está desligada.
      rollupOptions: { external: ['cloudflare:workers'] },
    },
  },
});
