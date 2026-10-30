import { animate, stagger } from 'animejs';

/**
 * Revelação suave dos blocos ao entrar na viewport.
 *
 * Princípios (o conteúdo nunca pode sumir):
 *  - sem JS, ou com erro, tudo aparece normal: o estado inicial só é aplicado em JS;
 *  - `prefers-reduced-motion` desliga a animação inteira;
 *  - o que já está na tela é revelado na hora, sem esperar observer;
 *  - rede de segurança: se por qualquer motivo a animação não rodar, um timeout
 *    devolve os elementos ao estado visível;
 *  - só opacidade e translateY — nada de escala ou gradiente, para manter o tom calmo.
 */

const CLEAR = (el: HTMLElement) => {
  el.style.opacity = '';
  el.style.transform = '';
  el.style.willChange = '';
};

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (targets.length === 0) return;

  for (const el of targets) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.willChange = 'opacity, transform';
  }

  const reveal = (elements: HTMLElement[]) => {
    if (elements.length === 0) return;
    animate(elements, {
      opacity: 1,
      translateY: 0,
      duration: 620,
      ease: 'out(3)',
      delay: stagger(70),
      onComplete: () => elements.forEach(CLEAR),
    });
  };

  const inView = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
  };

  // o que já está visível no carregamento entra imediatamente, nesta ordem
  const above = targets.filter(inView);
  const below = targets.filter((el) => !above.includes(el));
  reveal(above);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );

      for (const el of visible) observer.unobserve(el);
      reveal(visible);
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.12 },
  );

  for (const el of below) observer.observe(el);

  // rede de segurança: nada fica invisível se a animação não rodar
  window.setTimeout(() => {
    for (const el of targets) {
      if (el.style.opacity === '0') {
        observer.unobserve(el);
        CLEAR(el);
      }
    }
  }, 3000);

  window.addEventListener('pagehide', () => {
    for (const el of targets) CLEAR(el);
  });
}
