import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
const read = (rel) => fs.readFile(path.join(root, rel), 'utf8');

const fullParts = ['src/generated/brand.css','src/theme.css','src/layout.css','src/components.css','src/footer.css'];
const footerParts = ['src/generated/brand.css','src/footer.css'];

const buildCss = async (parts) => {
  const css = [];
  for (const rel of parts) css.push(await read(rel));
  return css.join('\n').trim() + '\n';
};

await fs.mkdir(path.join(root, 'dist'), { recursive: true });
await fs.writeFile(path.join(root, 'dist/design-system.css'), `/* DesarrollAMO Design System v${pkg.version} */\n` + await buildCss(fullParts), 'utf8');
await fs.writeFile(path.join(root, 'dist/footer.css'), `/* DesarrollAMO Footer v${pkg.version} */\n` + await buildCss(footerParts), 'utf8');

console.log(`dist/design-system.css v${pkg.version} construido`);
console.log(`dist/footer.css v${pkg.version} construido`);