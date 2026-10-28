import clerk from '@clerk/astro';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [clerk()],
  site: 'https://familiakato.vercel.app',
  output: 'server',
  adapter: vercel(),
});