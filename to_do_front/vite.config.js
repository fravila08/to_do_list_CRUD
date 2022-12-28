import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const productionBuildConfig = {
  base: '/static/',
  build: {
    outDir: '../to_do_back/static',
    // makes sure old build is deleted before a new one is run
    emptyOutDir: true,
    // help with chrome devtools
    sourcemap: true,
  },
  plugins: [react()]
};

export default defineConfig(productionBuildConfig)