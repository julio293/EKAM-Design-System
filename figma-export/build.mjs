// Minimal ESM build for the EKAM component library.
// Bundles the component barrel into a single dist entry with React external,
// so design-sync (and any consumer) can import the real compiled components.
import { build } from 'esbuild';

await build({
  entryPoints: ['components/index.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/index.es.js',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'transform', // components import React explicitly and use React.* hooks
  loader: { '.js': 'jsx', '.jsx': 'jsx', '.svg': 'text' },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'info',
});

console.log('built dist/index.es.js');
