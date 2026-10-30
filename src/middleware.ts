import { clerkMiddleware } from '@clerk/astro/server';
import type { MiddlewareHandler } from 'astro';
import { clerkEnabled } from './lib/clerk';

/**
 * O Clerk exige as chaves no runtime. Sem elas, `authenticateRequest` lança
 * "Publishable key is missing" e derruba TODAS as rotas do site com 500.
 *
 * O predicado é o mesmo de astro.config.mjs, garantindo que middleware e
 * integração do Clerk fiquem sempre coerentes.
 */
const clerkAtivo = clerkEnabled();

if (!clerkAtivo) {
  console.warn(
    '[auth] Clerk inativo (chaves ausentes). Defina PUBLIC_CLERK_PUBLISHABLE_KEY e CLERK_SECRET_KEY para habilitar o login social.',
  );
}

const handler: MiddlewareHandler = clerkAtivo ? clerkMiddleware() : (_context, next) => next();

export const onRequest = handler;
