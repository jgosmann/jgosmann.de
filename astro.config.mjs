import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  integartions: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    })
  ]  
});