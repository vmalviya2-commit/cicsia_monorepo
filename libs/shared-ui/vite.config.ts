/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { LibraryFormats } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/shared-ui',
  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  build: {
    outDir: '../../dist/libs/shared-ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'shared-ui',
      fileName: 'index',
      formats: ['es' as LibraryFormats]
    },
    rollupOptions: {
      external: ['lit', '@lit/reactive-element'],
      output: {
        globals: {
          lit: 'Lit',
          '@lit/reactive-element': 'ReactiveElement'
        }
      }
    },
  },
  resolve: {
    alias: {
      '@cicsia-nx-monorepo-workspace/shared-ui': path.resolve(__dirname, './src/index.ts')
    }
  }
});
