import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
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
  '/* DesarrollAMO Design System v0.1.0 */\n' + css.join('\n').trim() + '\n',
  'utf8'
);
console.log('dist/design-system.css construido');
