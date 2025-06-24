const { injectManifest } = require('workbox-build');

injectManifest({
  swSrc: 'service-worker.js',
  swDest: 'dist/service-worker.js',
  globDirectory: 'dist',
  globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
}).then(({ count, size, warnings }) => {
  if (warnings.length) {
    console.warn(warnings);
  }
  console.log(`Generated service-worker.js, which will precache ${count} files, totaling ${size} bytes.`);
});
