import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('public/fotos');
const outputDir = path.join(sourceDir, 'mini');
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp']);

await fs.mkdir(outputDir, { recursive: true });
const files = (await fs.readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()));

let processed = 0;
for (const entry of files) {
  const input = path.join(sourceDir, entry.name);
  const outputName = entry.name.replace(/\.(jpe?g|png|webp)$/i, '.webp');
  const output = path.join(outputDir, outputName);
  try {
    await sharp(input)
      .rotate()
      .resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 70, effort: 5 })
      .toFile(output);
    processed += 1;
  } catch (error) {
    console.error(`Não foi possível gerar miniatura para ${entry.name}:`, error.message);
    throw error;
  }
}
console.log(`Galeria otimizada: ${processed} miniaturas WebP geradas em public/fotos/mini/.`);
