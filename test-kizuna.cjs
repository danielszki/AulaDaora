const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://127.0.0.1:4322';
const OUT = '/home/mint/opencode/auladaora/AulaDaora/screenshots-kizuna';
fs.mkdirSync(OUT, { recursive: true });

const erros = [];
const checks = [];
function ok(nome, cond, extra) {
  checks.push({ nome, passou: !!cond, extra: extra || '' });
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${nome}${extra ? ' :: ' + extra : ''}`);
}

(async () => {
  const browser = await chromium.launch();

  // ---------- DESKTOP 1440 ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
  page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));

  await page.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  // 1. identidade: hero com kanji + Kizuna
  const kanji = await page.locator('.kz-kanji').textContent().catch(() => null);
  const h1 = await page.locator('.kz-hero__textos h1').textContent().catch(() => null);
  ok('Hero com kanji 絆 e título Kizuna', kanji === '絆' && h1 === 'Kizuna', `kanji=${kanji} h1=${h1}`);

  // 2. cartão central = Yotaro, com foto real, dominante
  const focoNome = await page.locator('.kz-foco__nome').textContent().catch(() => null);
  ok('Foco inicial = Yotaro Kato', (focoNome || '').includes('Yotaro'), `foco=${focoNome}`);
  const focoFoto = await page.locator('.kz-foco__foto img').count();
  const focoAvatar = await page.locator('.kz-foco__foto .kz-avt').count();
  ok('Cartão central: foto real ou avatar tipográfico', focoFoto === 1 || focoAvatar === 1, `img=${focoFoto} avt=${focoAvatar}`);
  const boxFoco = await page.locator('.kz-foco').boundingBox();
  const largFoco = boxFoco ? Math.round(boxFoco.width) : 0;
  ok('Cartão central 240–300px', largFoco >= 230 && largFoco <= 320, `larg=${largFoco}px`);

  // 3. zonas: pais top, irmaos esq, conjuge dir, filhos baixo
  const geo = await page.evaluate(() => {
    const c = document.querySelector('.kz-foco').getBoundingClientRect();
    const cx = c.left + c.width / 2, cy = c.top + c.height / 2;
    const g = (sel) => { const el = document.querySelector(sel); return el && el.getBoundingClientRect(); };
    const zP = g('#kz-zona-pais'), zI = g('#kz-zona-irmaos'), zC = g('#kz-zona-conjuge'), zF = g('#kz-zona-filhos');
    return {
      paisTem: !!zP && zP.height > 0, irmaosTem: !!zI && zI.height > 0, conjTem: !!zC && zC.height > 0, filhosTem: !!zF && zF.height > 0,
      paisAcima: !!zP && (zP.top + zP.height / 2) < cy,
      irmaosEsq: !!zI && (zI.left + zI.width / 2) < cx,
      conjDir: !!zC && (zC.left + zC.width / 2) > cx,
      filhosAbaixo: !!zF && (zF.top + zF.height / 2) > cy,
      cartoes: document.querySelectorAll('.kz-palco .kz-card').length,
    };
  });
  ok('Zona Pais acima do centro', geo.paisAcima, JSON.stringify(geo.paisAcima));
  ok('Zona Irmãos à esquerda', geo.irmaosEsq);
  ok('Zona Cônjuge à direita', geo.conjDir);
  ok('Zona Filhos abaixo', geo.filhosAbaixo);
  ok('Parentes visíveis no palco (≥4)', geo.cartoes >= 4, `cartoes=${geo.cartoes}`);

  // 4. linhas SVG presentes e atrás dos cartões
  const linhas = await page.locator('#kz-linhas path.kz-linha').count();
  ok('Conexões SVG desenhadas (≥3)', linhas >= 3, `linhas=${linhas}`);
  const zLinha = await page.evaluate(() => {
    const svg = document.querySelector('#kz-linhas');
    const zona = document.querySelector('.kz-zona');
    const svgZ = +getComputedStyle(svg).zIndex;
    const zonaZ = +getComputedStyle(zona).zIndex;
    return { svgZ, zonaZ };
  });
  ok('Linhas atrás dos cartões', zLinha.svgZ < zLinha.zonaZ, `svg=${zLinha.svgZ} zona=${zLinha.zonaZ}`);

  // 5. painel aberto sem empurrar o centro (centro ainda no meio do palco)
  const centroOk = await page.evaluate(() => {
    const p = document.querySelector('#kz-palco').getBoundingClientRect();
    const c = document.querySelector('.kz-foco').getBoundingClientRect();
    const cx = c.left + c.width / 2;
    const rel = (cx - p.left) / p.width;
    return { rel, painelVis: !document.querySelector('#kz-painel').hidden || getComputedStyle(document.querySelector('#kz-painel')).transform !== 'none' };
  });
  ok('Centro próximo do eixo do palco (0.35–0.65)', centroOk.rel > 0.35 && centroOk.rel < 0.65, `rel=${centroOk.rel.toFixed(2)}`);

  await page.screenshot({ path: `${OUT}/01-desktop-1440-inicial.png`, fullPage: true });

  // 6. clicar num parente → recenter sem reload
  const antesUrl = page.url();
  const alvo = page.locator('#kz-zona-filhos .kz-card').first();
  const nomeAlvo = (await alvo.locator('.kz-card__nome').textContent()) || '';
  await alvo.click();
  await page.waitForTimeout(700);
  const focoDepois = await page.locator('.kz-foco__nome').textContent();
  const reload = await page.evaluate(() => performance.getEntriesByType('navigation').length);
  ok('Clicar em parente recentraliza sem reload', focoDepois.trim() === nomeAlvo.trim() && page.url().includes('pessoa='), `foco=${focoDepois} alvo=${nomeAlvo}`);
  ok('Sem recarregamento da página', reload === 1, `navs=${reload}`);
  ok('URL atualiza ?pessoa=', page.url().includes('pessoa='));

  // 7. pai acima quando existe; testar pessoa com muitos filhos
  await page.goto(BASE + '/kizuna?pessoa=kiyoe-kadita', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const kFoco = await page.locator('.kz-foco__nome').textContent();
  ok('?pessoa= abre a pessoa pedida', (kFoco || '').includes('Kiyoe'), `foco=${kFoco}`);
  const kFoto = await page.locator('.kz-foco__foto img').count();
  ok('Pessoa com foto real exibe a fotografia', kFoto === 1, `img=${kFoto}`);
  await page.screenshot({ path: `${OUT}/02-desktop-kiyoe.png`, fullPage: true });

  // 8. pessoa com poucos parentes
  await page.goto(BASE + '/kizuna?pessoa=yoshinobu-kato', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const avtY = await page.locator('.kz-foco__foto .kz-avt').count();
  ok('Pessoa sem foto usa avatar tipográfico', avtY === 1, `avt=${avtY}`);
  await page.screenshot({ path: `${OUT}/03-desktop-poucos-parentes.png`, fullPage: true });

  // 9. pesquisa
  await page.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.fill('#kz-busca-input', 'toyo');
  await page.waitForTimeout(300);
  const sug = await page.locator('#kz-sugestoes li button').count();
  ok('Pesquisa mostra sugestões', sug >= 1, `sug=${sug}`);
  await page.locator('#kz-sugestoes li button').first().click();
  await page.waitForTimeout(600);
  const focoBusca = await page.locator('.kz-foco__nome').textContent();
  ok('Selecionar sugestão centraliza', (focoBusca || '').includes('Toyo'), `foco=${focoBusca}`);

  // 10. voltar
  await page.locator('#kz-zona-filhos .kz-card').first().click().catch(() => {});
  await page.waitForTimeout(500);
  const antesVoltar = await page.locator('.kz-foco__nome').textContent();
  await page.locator('#kz-voltar').click();
  await page.waitForTimeout(500);
  const depoisVoltar = await page.locator('.kz-foco__nome').textContent();
  ok('Voltar retorna à pessoa anterior', antesVoltar !== depoisVoltar, `${antesVoltar} → ${depoisVoltar}`);

  // 11. centralizar (mantém seleção)
  const antesC = await page.locator('.kz-foco__nome').textContent();
  await page.locator('#kz-centrar').click();
  await page.waitForTimeout(500);
  const depoisC = await page.locator('.kz-foco__nome').textContent();
  ok('Centralizar mantém a mesma pessoa', antesC === depoisC);

  // 12. início = yotaro
  await page.locator('#kz-inicio').click();
  await page.waitForTimeout(500);
  const inicio = await page.locator('.kz-foco__nome').textContent();
  ok('Início volta para Yotaro', (inicio || '').includes('Yotaro'), `foco=${inicio}`);

  // 13. painel: abrir/fechar preserva seleção
  const selAntes = await page.locator('.kz-foco__nome').textContent();
  await page.locator('#kz-painel-fechar').click();
  await page.waitForTimeout(400);
  await page.locator('[data-abrir-painel]').click();
  await page.waitForTimeout(400);
  const selDepois = await page.locator('.kz-foco__nome').textContent();
  ok('Fechar/abrir painel preserva seleção', selAntes === selDepois, `${selAntes} vs ${selDepois}`);
  const painelTemBio = await page.locator('#kz-painel-conteudo .kz-painel__sec').count();
  ok('Painel tem seções de informação', painelTemBio >= 2, `secs=${painelTemBio}`);
  const minis = await page.locator('#kz-painel-conteudo .kz-mini').count();
  ok('Painel lista parentes clicáveis', minis >= 3, `minis=${minis}`);

  // 14. modal parentesco
  await page.locator('#kz-relacao').click();
  await page.waitForTimeout(400);
  await page.fill('#kz-rel-a', 'yotaro');
  await page.waitForTimeout(300);
  const sugA = page.locator('#kz-rel-a + .kz-sugestoes li button');
  const nA = await sugA.count();
  ok('Modal com sugestões para a 1ª pessoa', nA >= 1, `a=${nA}`);
  if (nA >= 1) await sugA.first().click();
  await page.fill('#kz-rel-b', 'suzuki');
  await page.waitForTimeout(300);
  const sugB = page.locator('#kz-rel-b + .kz-sugestoes li button');
  const nB = await sugB.count();
  ok('Modal com sugestões para a 2ª pessoa', nB >= 1, `b=${nB}`);
  if (nB >= 1) await sugB.first().click();
  await page.locator('#kz-rel-calcular').click();
  await page.waitForTimeout(300);
  const caminho = await page.locator('#kz-rel-resultado .kz-rel-caminho').count();
  ok('Caminho de parentesco calculado', caminho === 1);
  await page.screenshot({ path: `${OUT}/04-modal-parentesco.png`, fullPage: false });
  await page.locator('.kz-relacao-acoes [data-close]').click();
  await page.waitForTimeout(300);

  // 15. acesso à árvore
  const hrefArvore = await page.locator('.kz-rail a[href="/arvore"]').count();
  ok('Link para /arvore presente', hrefArvore === 1);

  // 16. sem rolagem horizontal desktop
  const overflowD = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok('Sem rolagem horizontal (1440)', overflowD);

  await ctx.close();

  // ---------- 1024 ----------
  const ctx2 = await browser.newContext({ viewport: { width: 1024, height: 860 } });
  const p2 = await ctx2.newPage();
  p2.on('pageerror', (e) => erros.push('1024 pageerror: ' + e.message));
  await p2.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await p2.waitForTimeout(800);
  const ov1024 = await p2.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok('Sem rolagem horizontal (1024)', ov1024);
  await p2.screenshot({ path: `${OUT}/05-notebook-1024.png`, fullPage: true });
  await ctx2.close();

  // ---------- 768 ----------
  const ctx3 = await browser.newContext({ viewport: { width: 768, height: 1000 } });
  const p3 = await ctx3.newPage();
  p3.on('pageerror', (e) => erros.push('768 pageerror: ' + e.message));
  await p3.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await p3.waitForTimeout(800);
  const ov768 = await p3.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok('Sem rolagem horizontal (768)', ov768);
  const legivel768 = await p3.evaluate(() => {
    const f = document.querySelector('.kz-foco__nome');
    return f ? parseFloat(getComputedStyle(f).fontSize) >= 18 : false;
  });
  ok('Nome do foco legível (768)', legivel768);
  await p3.screenshot({ path: `${OUT}/06-tablet-768.png`, fullPage: true });
  // cliques funcionam no mobile
  const cardsMobile = await p3.locator('.kz-palco .kz-card').count();
  if (cardsMobile > 0) {
    const alvoM = p3.locator('.kz-card').nth(Math.min(2, cardsMobile - 1));
    const nomeM = (await alvoM.locator('.kz-card__nome').textContent()) || '';
    await alvoM.click();
    await p3.waitForTimeout(600);
    const focoM = await p3.locator('.kz-foco__nome').textContent();
    ok('Seleção funciona (768)', focoM.trim() === nomeM.trim(), `${focoM} vs ${nomeM}`);
  }
  await ctx3.close();

  // ---------- 390 ----------
  const ctx4 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p4 = await ctx4.newPage();
  p4.on('pageerror', (e) => erros.push('390 pageerror: ' + e.message));
  await p4.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await p4.waitForTimeout(800);
  const ov390 = await p4.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok('Sem rolagem horizontal (390)', ov390);
  const railVisivel = await p4.locator('#kz-inicio').isVisible();
  ok('Controles acessíveis (390)', railVisivel);
  await p4.screenshot({ path: `${OUT}/07-celular-390.png`, fullPage: true });
  // painel como folha inferior
  await p4.locator('[data-abrir-painel]').click().catch(() => {});
  await p4.waitForTimeout(500);
  await p4.screenshot({ path: `${OUT}/08-celular-390-painel.png`, fullPage: false });
  await ctx4.close();

  // ---------- 320 ----------
  const ctx5 = await browser.newContext({ viewport: { width: 320, height: 720 } });
  const p5 = await ctx5.newPage();
  p5.on('pageerror', (e) => erros.push('320 pageerror: ' + e.message));
  await p5.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await p5.waitForTimeout(800);
  const ov320 = await p5.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok('Sem rolagem horizontal (320)', ov320);
  await p5.screenshot({ path: `${OUT}/09-celular-320.png`, fullPage: true });
  await ctx5.close();

  // ---------- acessibilidade: teclado ----------
  const ctx6 = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const p6 = await ctx6.newPage();
  await p6.goto(BASE + '/kizuna', { waitUntil: 'networkidle' });
  await p6.waitForTimeout(600);
  let tabOK = false;
  for (let i = 0; i < 40; i++) {
    await p6.keyboard.press('Tab');
    const id = await p6.evaluate(() => document.activeElement && document.activeElement.id);
    if (id === 'kz-busca-input') { tabOK = true; break; }
  }
  ok('Busca alcançável por teclado', tabOK);
  await ctx6.close();

  await browser.close();

  console.log('\n===== RESUMO =====');
  const pass = checks.filter((c) => c.passou).length;
  console.log(`${pass}/${checks.length} verificações passaram`);
  console.log(`Erros de console/página: ${erros.length}`);
  erros.slice(0, 12).forEach((e) => console.log('  ERRO: ' + e));
  const falhas = checks.filter((c) => !c.passou);
  falhas.forEach((f) => console.log('  FALHOU: ' + f.nome + ' :: ' + f.extra));
})().catch((e) => { console.error('FATAL:', e); process.exit(1); });
