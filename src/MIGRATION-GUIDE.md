
# 🚀 Guía de Migración a Astro

## Paso 1: Mover archivos manualmente

Ejecuta estos comandos en tu terminal desde la raíz del proyecto:

```bash
# Crear estructura de carpetas si no existe
mkdir -p src/components

# Mover TODOS los componentes a src/components/
mv components/*.tsx src/components/
mv components/*.ts src/components/

# Los archivos ya creados:
# ✅ src/App.tsx
# ✅ src/pages/HomePage.tsx
# ✅ src/pages/index.astro
# ✅ src/layouts/Layout.astro
# ✅ src/styles/global.css
```

## Paso 2: Limpiar archivos antiguos

```bash
# Eliminar carpetas antiguas (después de mover todo)
rm -rf components/
rm -rf pages/
rm App.tsx
rm index.tsx
rm index.css
```

## Paso 3: Instalar dependencias

```bash
npm install
```

## Paso 4: Iniciar el servidor

```bash
npm run dev
```

Tu sitio estará en: **http://localhost:4321**

## 📁 Estructura final

```
proyecto/
├── src/
│   ├── components/          # ✅ TODOS tus componentes React
│   │   ├── AboutSection.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Navigation.tsx
│   │   ├── NewsCard.tsx
│   │   ├── NewsSection.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ScrollRevealText.tsx
│   │   ├── SponsorCarousel.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── Three3DBackground.tsx
│   │   └── TiltCard.tsx
│   ├── pages/
│   │   ├── index.astro      # ✅ Página principal Astro
│   │   └── HomePage.tsx     # ✅ Componente React de la página
│   ├── layouts/
│   │   └── Layout.astro     # ✅ Layout HTML base
│   ├── styles/
│   │   └── global.css       # ✅ Estilos globales
│   └── App.tsx              # ✅ Componente principal React
├── astro.config.mjs         # ✅ Configuración Astro
├── tailwind.config.js       # ✅ Configuración Tailwind
├── package.json             # ✅ Dependencias
└── tsconfig.json
```

## ✅ Verificación

Después de mover los archivos, verifica que:

1. ✅ Todos los archivos `.tsx` están en `src/components/`
2. ✅ No quedan archivos en las carpetas antiguas `components/` y `pages/`
3. ✅ `npm run dev` inicia sin errores
4. ✅ El sitio carga en http://localhost:4321

## 🎯 Ventajas de esta estructura

- ✅ **Todo funciona desde Astro** - Estructura oficial de Astro
- ✅ **Componentes React intactos** - Sin cambios en tu código
- ✅ **Mejor rendimiento** - HTML estático + React donde se necesita
- ✅ **Fácil de mantener** - Estructura clara y organizada

## 🆘 Solución de problemas

### Error: "Cannot find module"
→ Asegúrate de haber movido TODOS los archivos a `src/components/`

### Error: "Failed to load config"
→ Ejecuta `npm install` de nuevo

### La página no carga
→ Verifica que `src/pages/index.astro` existe y tiene el contenido correcto

### Los estilos no se aplican
→ Verifica que `src/styles/global.css` existe

## 📝 Comandos útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Verificar tipos TypeScript
npm run astro check
```

¡Listo! Tu proyecto ahora funciona completamente desde Astro 🚀
