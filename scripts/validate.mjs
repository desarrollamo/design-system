import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const required = ['src/generated/brand.css','src/theme.css','src/layout.css','src/components.css','src/footer.css','dist/design-system.css','dist/footer.css','examples/index.html','examples/footer.html','components/footer/corporate.html','components/footer/attribution.html'];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) throw new Error(`Falta archivo requerido: ${rel}`);

const dist = fs.readFileSync(path.join(root, 'dist/design-system.css'), 'utf8');
const footerDist = fs.readFileSync(path.join(root, 'dist/footer.css'), 'utf8');
for (const token of ['--amo-sky','--amo-pink','amo-button','amo-card','amo-footer','amo-footer__legal','amo-footer__attribution','focus-visible']) {
  if (!dist.includes(token)) throw new Error(`Falta contrato de diseño: ${token}`);
}
for (const token of ['--amo-sky','--amo-pink','amo-footer','amo-footer__legal','amo-footer__attribution']) {
  if (!footerDist.includes(token)) throw new Error(`Footer standalone incompleto: ${token}`);
}
if (footerDist.includes('body {') || footerDist.includes('body{')) throw new Error('footer.css no debe alterar body');

const corporate = fs.readFileSync(path.join(root, 'components/footer/corporate.html'), 'utf8');
for (const route of ['/faq','/terms','/privacy','/cookies','/payments','/licenses']) {
  if (!corporate.includes(`https://desarrollamo.com.ar${route}`)) throw new Error(`Footer corporativo sin ${route}`);
}
const attribution = fs.readFileSync(path.join(root, 'components/footer/attribution.html'), 'utf8');
if (!attribution.includes('Desarrollado por') || !attribution.includes('rel="noopener noreferrer sponsored"')) throw new Error('Firma de atribución incompleta');
const generated = fs.readFileSync(path.join(root, 'src/generated/brand.css'), 'utf8');
if (!generated.includes('branding@v1.3.0')) throw new Error('Branding no está fijado en v1.3.0');
for (const text of [dist, footerDist, corporate, attribution]) if (/TODO|PLACEHOLDER/.test(text)) throw new Error('Hay placeholders pendientes');
if (!dist.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Falta prefers-reduced-motion');

console.log(`Design System v${pkg.version}: validación PASS`);