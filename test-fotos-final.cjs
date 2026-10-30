const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://127.0.0.1:4399';
const OUT = '/home/mint/opencode/auladaora/AulaDaora/screenshots-kizuna-final';
fs.mkdirSync(OUT, { recursive: true });

const erros = [];
const resultados = [];

function ok(nome, cond, extra) {
  resultados.push({ nome, passou: !!cond, extra: extra || '' });
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${nome}${extra ? ' :: ' + extra : ''}`);
  if (!cond) erros.push(nome + ' :: ' + extra);
}

(async () => {
  const browser = await chromium.launch();

  const pessoas = [
    { id: 'yotaro-kato', nome: 'Yotaro Kato', temFoto: false },
    { id: 'toyo-kato', nome: 'Toyo Kato', temFoto: false },
    { id: 'kiyoe-kadita', nome: 'Kiyoe Kadita', temFoto: true },
    { id: 'ayako-saito', nome: 'Ayako Saito', temFoto: false },
  ];

  for (const viewport of [
    { width: 1440, height: 960, nome: 'desktop' },
    { width: 390, height: 844, nome: 'mobile' },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') erros.push('console[' + viewport.nome + ']: ' + m.text()); });
    page.on('pageerror', (e) => erros.push('pageerror[' + viewport.nome + ']: ' + e.message));

    for (const p of pessoas) {
      await page.goto(BASE + '/kizuna?pessoa=' + p.id, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);

      // Verificar foto central
      const temImg = await page.locator('.kz-foco__foto img').count();
      const temAvatar = await page.locator('.kz-foco__foto .kz-retrato--placeholder').count();
      const temReal = await page.locator('.kz-foco__foto .kz-retrato--real').count();
      const bordaDourada = await page.locator('.kz-foco[data-tem-foto="1"]').count();
      const nomeCentral = await page.locator('.kz-foco__nome').textContent();

      ok(`${viewport.nome} — ${p.nome} tem ${p.temFoto ? 'foto real' : 'placeholder'}`,
        p.temFoto ? temReal === 1 : temAvatar === 1,
        `img=${temImg} real=${temReal} avt=${temAvatar} borda=${bordaDourada} nome=${nomeCentral}`);

      // Verificar se não há imagens quebradas (404)
      const imgs = await page.locator('img').all();
      let quebradas = 0;
      for (const img of imgs) {
        const src = await img.getAttribute('src');
        if (src && src.startsWith('/fotos/')) {
          const resp = await page.request.fetch(BASE + src);
          if (resp.status() >= 400) quebradas++;
        }
      }
      ok(`${viewport.nome} — ${p.nome} sem imagens quebradas`, quebradas === 0, `quebradas=${quebradas}`);

      // Verificar nome e datas legíveis
      const anos = await page.locator('.kz-foco__anos').textContent();
      const ger = await page.locator('.kz-foco__ger').textContent();
      ok(`${viewport.nome} — ${p.nome} dados legíveis`, !!anos && !!ger, `anos=${anos} ger=${ger}`);

      // Verificar parentes no palco
      const cartoes = await page.locator('.kz-palco .kz-card').count();
      ok(`${viewport.nome} — ${p.nome} tem parentes visíveis`, cartoes >= 1, `cartoes=${cartoes}`);

      // Verificar painel aberto (desktop) ou fechado (mobile)
      const painelAberto = await page.locator('#kz-painel.kz-painel--aberto').count();
      const painelEsperado = viewport.nome === 'desktop';
      ok(`${viewport.nome} — ${p.nome} painel ${painelEsperado ? 'aberto' : 'fechado'}`, painelAberto === (painelEsperado ? 1 : 0));
    }

    await page.screenshot({ path: `${OUT}/${viewport.nome}-final.png`, fullPage: true });
    await ctx.close();
  }

  await browser.close();

  console.log('\n===== RESUMO =====');
  const pass = resultados.filter((r) => r.passou).length;
  console.log(`${pass}/${resultados.length} verificações passaram`);
  console.log(`Erros: ${erros.length}`);
  erros.slice(0, 15).forEach((e) => console.log('  ERRO: ' + e));
})().catch((e) => { console.error('FATAL:', e); process.exit(1); });
