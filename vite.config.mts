import { defineConfig } from 'vite';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    vue(),
    libInjectCss(),
    // Automatically excludes all peer dependencies from the bundle
    externalizeDeps({
      deps: false,
    }),
    dts({
      logLevel: 'info',
      tsconfigPath: env.mode === 'development' ? 'tsconfig.json' : 'tsconfig.build.json',
      // include: 'lib/**/*',
      // XXX: Check this. It worked using the node_modules nodeLinker, but failed with pnp
      // Follow up on https://github.com/qmhc/vite-plugin-dts/issues/341
      // rollupTypes: true,
    }),
  ],
  // Library mode configuration
  build: {
    lib: {
      entry: [resolve(__dirname, 'lib/main.ts')],
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx,vue}').map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length),
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: {
        format: 'esm',
        dir: 'dist',
        // Put chunk files at <output>/chunks
        chunkFileNames: 'chunks/[name].[hash].js',
        // Put asset styles at <output>/assets
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        // Provide global variables to use in the UMD build
        // for externalized deps
        // preserveModules: true,
        // exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
    },
  },
}));
