
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Usamos nuestro index.css personalizado
    })
  ],
  vite: {
    ssr: {
      noExternal: ['framer-motion'], // Necesario para que framer-motion funcione en SSR
    },
  },
});
