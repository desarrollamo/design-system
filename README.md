# DesarrollAMO · Design System

Sistema de diseño oficial para construir interfaces coherentes de DesarrollAMO sin depender de un framework específico.

## Principio de arquitectura

[`desarrollamo/branding`](https://github.com/desarrollamo/branding) define la identidad. Este repositorio la consume y define cómo esa identidad se convierte en interfaz.

No se redefinen logos ni colores de marca a mano. `npm run sync-brand` sincroniza los tokens desde `branding@v1.2.0`.

## Qué incluye

- tema semántico light/dark;
- foco visible y respeto por `prefers-reduced-motion`;
- primitivas de layout: container, stack, cluster, grid y split;
- botones primario/secundario;
- cards;
- badges;
- campos e inputs;
- tipografía y jerarquías básicas;
- specimen visual en `examples/index.html`.

## Uso actual

Este repositorio todavía no se publica como paquete npm. La distribución verificable es `dist/design-system.css` dentro de las versiones Git del repositorio.

```html
<link rel="stylesheet" href="dist/design-system.css" />
<button class="amo-button amo-button--primary">Acción</button>
```

## Desarrollo

```bash
npm run check
```

El comando:

1. sincroniza Branding `v1.2.0`;
2. construye `dist/design-system.css`;
3. valida archivos, contratos, accesibilidad básica y placeholders.

## Límites

- Branding mantiene identidad y assets canónicos.
- Design System mantiene patrones UI reutilizables.
- Cada producto decide su contenido, datos y lógica de negocio.
- No se incorporan componentes sólo para “llenar” el catálogo.

## Fuente de verdad

Repositorio: https://github.com/desarrollamo/design-system

Sitio empresarial: https://desarrollamo.com.ar/

## Superficie pública

Este repositorio expone únicamente primitivas genéricas. Los componentes específicos de productos, flujos internos y lógica de negocio permanecen fuera del Design System público.
