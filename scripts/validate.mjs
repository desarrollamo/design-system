import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const required = ['src/generated/brand.css','src/theme.css','src/layout.css','src/components.css','dist/design-system.css','examples/index.html'];
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) throw new Error(`Falta archivo requerido: ${rel}`);
}

const dist = fs.readFileSync(path.join(root, 'dist/design-system.css'), 'utf8');
for (const token of ['--amo-sky','--amo-pink','--amo-surface','--amo-radius','amo-button','amo-card','focus-visible']) {
  if (!dist.includes(token)) throw new Error(`Falta contrato de diseño: ${token}`);
}
if (!dist.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Falta soporte prefers-reduced-motion');
if (dist.includes('TODO') || dist.includes('PLACEHOLDER')) throw new Error('Hay placeholders pendientes');
console.log('Design System v0.1.0: validación PASS');
