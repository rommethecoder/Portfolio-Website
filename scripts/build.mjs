import { copyFile, mkdir, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
// Publish only the files used by the public portfolio.
const files = [
  'index.html',
  'favicon.svg',
  'css/portfolio.css',
  'js/portfolio.js',
  'fonts/space-grotesk/SpaceGrotesk.ttf',
  'fonts/space-grotesk/OFL.txt',
  'fonts/poppins/poppins-regular-webfont.woff2',
  'fonts/poppins/poppins-semibold-webfont.woff2',
  'files/Terry_Felton_Resume_October2026.pdf',
  'files/Terry_Felton_Resume_November2026.pdf',
];
// Check inputs before clearing any prior build.
for (const file of files) await stat(resolve(root, file));
await rm(output, { recursive: true, force: true });
for (const file of files) {
  const target = resolve(output, file);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(resolve(root, file), target);
}
console.log(`Built ${files.length} public assets in dist/`);
