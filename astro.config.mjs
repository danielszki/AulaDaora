import clerk from '@clerk/astro';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [clerk()],
  site: 'https://familiakato.vercel.app',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});