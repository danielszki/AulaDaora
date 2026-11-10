// src/scripts/clerk-i18n.ts
// Traduz a interface do Clerk para português apenas nas páginas de login e
// cadastro. As traduções (≈60 KB) viram um chunk separado, carregado só ali —
// se fossem passadas em `clerk({ localization })`, entrariam no HTML de todas
// as páginas do site.

import { updateClerkOptions } from '@clerk/astro/client';
import { ptBR } from '@clerk/localizations';

export async function aplicarPortuguesClerk(timeoutMs = 8000): Promise<void> {
  if (typeof window === 'undefined') return;
  const inicio = Date.now();

  while (Date.now() - inicio < timeoutMs) {
    const clerk = (window as any).Clerk;
    if (clerk?.loaded) {
      try {
        updateClerkOptions({ localization: { locale: 'pt-BR', translations: ptBR } });
      } catch (e) {
        console.warn('[clerk] não foi possível aplicar o português:', e);
      }
      return;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
}
