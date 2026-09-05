import fs from 'node:fs/promises';
import path from 'node:path';

const version = 'v1.2.0';
const url = `https://raw.githubusercontent.com/desarrollamo/branding/${version}/tokens/brand.css`;
const response = await fetch(url);
if (!response.ok) throw new Error(`No se pudo sincronizar Branding ${version}: ${response.status}`);
const css = await response.text();
if (!css.includes('--amo-sky') || !css.includes('--amo-pink')) {
  throw new Error('El archivo de Branding no contiene los tokens esperados');
}
const target = path.resolve(import.meta.dirname, '../src/generated/brand.css');
const header = `/* Generado desde desarrollamo/branding@${version}. No editar a mano. */\n`;
await fs.writeFile(target, header + css.trim() + '\n', 'utf8');
console.log(`Branding ${version} sincronizado`);
