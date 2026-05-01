// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';
import { cms } from '@geniusofdigital/astro-cms/astro'
import cmsConfig from './cms.config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), cms(cmsConfig)],
  adapter: cloudflare()
});