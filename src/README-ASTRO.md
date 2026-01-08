
# UDG Racing Division - Astro + React

## 🚀 Migración completada a Astro

Tu proyecto ahora usa **Astro** para las páginas y mantiene todos los **componentes React** intactos.

## 📁 Nueva estructura de archivos

```
proyecto/
├── src/
│   ├── components/          # Todos tus componentes React (sin cambios)
│   │   ├── AboutSection.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   └── ... (resto de componentes)
│   ├── pages/
│   │   └── index.astro      # Página principal en Astro
│   ├── layouts/
│   │   └── Layout.astro     # Layout base
│   ├── styles/
│   │   └── global.css       # Estilos globales (antes index.css)
│   ├── App.tsx              # Tu componente App de React
│   └── pages/
│       └── HomePage.tsx     # Tu página de React
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.js       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias actualizadas
```

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## ✨ Qué ha cambiado

### ✅ Lo que se mantiene igual:
- **Todos tus componentes React** funcionan exactamente igual
- **Todas las animaciones** con Framer Motion
- **Todos los estilos** de Tailwind y CSS
- **Todas las funcionalidades** interactivas

### 🆕 Lo que es nuevo:
- **Páginas en Astro** (`.astro`) en lugar de React puro
- **Mejor rendimiento** - menos JavaScript enviado al cliente
- **Hidratación selectiva** - React solo donde se necesita
- **Mejor SEO** por defecto

## 🎯 Cómo funciona

### Página Astro (`src/pages/index.astro`):
```astro
---
import Layout from '../layouts/Layout.astro';
import { App } from '../App';
import '../styles/global.css';
---

<Layout>
  <App client:load />
</Layout>
```

### Directivas de hidratación:
- `client:load` - Carga inmediatamente (usado para tu App con animaciones)
- `client:idle` - Carga cuando el navegador está inactivo
- `client:visible` - Carga cuando es visible

## 📝 Componentes React

Tus componentes React **no necesitan cambios**. Siguen siendo archivos `.tsx` normales:

```tsx
// src/components/Hero.tsx
export function Hero() {
  // Tu código React existente
}
```

## 🎨 Estilos

Los estilos se mantienen en `src/styles/global.css` con:
- Variables CSS personalizadas
- Configuración de Tailwind
- Fuentes de Google
- Animaciones personalizadas

## 🔄 Migración de archivos existentes

**Debes mover tus archivos a la nueva estructura:**

```bash
# Mover componentes
mv components/* src/components/
mv pages/* src/pages/

# Mover App.tsx
mv App.tsx src/

# El resto de archivos ya están creados
```

## 🚨 Importante

1. **Todos los componentes React deben estar en `src/components/`**
2. **Las páginas Astro van en `src/pages/`**
3. **Los estilos globales en `src/styles/`**
4. **El componente App usa `client:load` porque tiene animaciones**

## 🎯 Ventajas de esta configuración

✅ **Mejor rendimiento** - Astro genera HTML estático
✅ **Menos JavaScript** - Solo se carga React donde se necesita
✅ **Mismo código React** - Tus componentes no cambian
✅ **Mejor SEO** - HTML renderizado en el servidor
✅ **Desarrollo rápido** - Hot reload instantáneo

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Directivas de cliente](https://docs.astro.build/en/reference/directives-reference/#client-directives)

## 🎉 ¡Listo!

Tu proyecto ahora usa Astro con React. Todos tus componentes funcionan igual, pero con mejor rendimiento y SEO.

```bash
npm install
npm run dev
```

Abre http://localhost:4321 y verás tu sitio funcionando! 🚀
