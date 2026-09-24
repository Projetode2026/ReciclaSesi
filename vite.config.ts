import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function copyDistOutputs(): Plugin {
  return {
    name: 'copy-dist-outputs',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const docsDir = path.resolve(__dirname, 'docs');
        const indexPath = path.resolve(distDir, 'index.html');
        const notFoundPath = path.resolve(distDir, '404.html');
        const noJekyllPath = path.resolve(distDir, '.nojekyll');

        // Copy index.html to 404.html in dist
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }

        // Ensure .nojekyll in dist
        fs.writeFileSync(noJekyllPath, '');

        // Mirror dist to docs/ folder so GitHub Pages '/docs' option works out of the box
        if (fs.existsSync(distDir)) {
          if (!fs.existsSync(docsDir)) {
            fs.mkdirSync(docsDir, { recursive: true });
          }
          fs.cpSync(distDir, docsDir, { recursive: true });
        }
      } catch (err) {
        console.warn('Could not complete post-build copy:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), copyDistOutputs()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
