import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
const parts = [
  'src/generated/brand.css',
  'src/theme.css',
  'src/layout.css',
  'src/components.css'
];

const css = [];
for (const rel of parts) css.push(await fs.readFile(path.join(root, rel), 'utf8'));
await fs.mkdir(path.join(root, 'dist'), { recursive: true });
await fs.writeFile(
  path.join(root, 'dist/design-system.css'),
  `/* DesarrollAMO Design System v${pkg.version} */\n` + css.join('\n').trim() + '\n',
  'utf8'
);
console.log(`dist/design-system.css v${pkg.version} construido`);
