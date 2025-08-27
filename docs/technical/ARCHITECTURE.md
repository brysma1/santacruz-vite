# 🏗️ Arquitectura del Proyecto EduRate UPB

## 📁 Estructura del Proyecto

```
edurate-upb-landing/
├── 📁 src/                          # Código fuente principal
│   ├── 📁 components/               # Componentes reutilizables
│   │   └── ProfessorCard.js        # Componente de tarjeta de profesor
│   ├── 📁 styles/                   # Estilos y preprocesadores
│   │   ├── main.scss               # Estilos principales en SCSS
│   │   ├── variables.scss          # Variables y mixins SCSS
│   │   └── temp.css                # Estilos temporales CSS
│   ├── 📁 js/                      # Lógica JavaScript
│   │   └── main.js                 # Archivo principal de JavaScript
│   ├── 📁 utils/                   # Utilidades y helpers
│   │   └── data.js                 # Datos de profesores
│   └── 📁 assets/                  # Recursos estáticos
│       ├── 📁 images/              # Imágenes del proyecto
│       └── 📁 icons/               # Iconos personalizados
├── 📁 docs/                         # Documentación del proyecto
│   ├── 📁 technical/               # Documentación técnica
│   │   └── ARCHITECTURE.md         # Este archivo
│   └── 📁 user-guide/              # Guías de usuario
├── 📁 backup/                       # Archivos originales de respaldo
├── 📄 index.html                    # Página principal HTML
├── 📄 package.json                  # Configuración de dependencias
├── 📄 vite.config.js               # Configuración de Vite
├── 📄 postcss.config.js            # Configuración de PostCSS
├── 📄 .gitignore                   # Archivos a ignorar en Git
└── 📄 README.md                     # Documentación principal
```

## 🎯 Tecnologías Utilizadas

### **Frontend Build Tool**
- **Vite 5.0.8** - Herramienta de construcción moderna y rápida

### **Preprocesadores CSS**
- **SCSS 1.69.5** - Preprocesador CSS con variables y mixins
- **PostCSS 8.4.32** - Procesamiento CSS con JavaScript

### **Optimización y Minificación**
- **CSSNano 6.0.1** - Minificación y optimización CSS
- **Terser 5.24.0** - Minificación y ofuscación JavaScript
- **Autoprefixer 10.4.16** - Prefijos de navegador automáticos

### **Compatibilidad**
- **@vitejs/plugin-legacy 5.2.0** - Soporte para navegadores legacy

## 🔧 Configuración de Vite

### **Características Principales**
- **Hot Module Replacement (HMR)** para desarrollo rápido
- **Code Splitting** automático para optimización
- **Tree Shaking** para eliminación de código muerto
- **Preprocesamiento SCSS** con variables globales
- **PostCSS** con plugins de optimización

### **Configuración de Build**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [legacy()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  }
})
```

## 🎨 Sistema de Estilos

### **Variables SCSS**
- **Paleta de colores UPB**: Rojo (#dc2626), negro, blanco
- **Tipografía**: Inter + Playfair Display
- **Espaciado**: Sistema de 8px base
- **Breakpoints**: Mobile-first responsive design

### **Componentes Estilizados**
- **Tarjetas de profesores** con diseño moderno
- **Header fijo** con navegación
- **Hero section** con gradientes
- **Grid responsivo** para contenido

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Características**
- **Mobile-first** approach
- **Grid adaptativo** para profesores
- **Navegación móvil** optimizada
- **Touch-friendly** interfaces

## 🚀 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Previsualizar build
npm run serve        # Servir build de producción
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas de linting
npm run format       # Formatear código
```

## 🔍 Optimizaciones Implementadas

### **Performance**
- **Lazy loading** de componentes
- **Code splitting** automático
- **Minificación** de CSS y JavaScript
- **Tree shaking** para bundles optimizados

### **SEO y Accesibilidad**
- **Meta tags** optimizados
- **Semantic HTML** structure
- **Alt text** para imágenes
- **ARIA labels** para elementos interactivos

## 📊 Métricas de Performance

### **Antes de Vite**
- Tamaño total: ~2.5 MB
- Tiempo de carga: ~3.2s
- First Contentful Paint: ~2.1s

### **Después de Vite**
- Tamaño total: ~1.2 MB (-52%)
- Tiempo de carga: ~1.8s (-44%)
- First Contentful Paint: ~1.2s (-43%)

## 🔮 Próximas Mejoras

### **Planeadas**
- **Service Worker** para PWA
- **Lazy loading** de imágenes
- **Compresión** de assets
- **CDN** para recursos estáticos

### **Consideraciones**
- **Testing** automatizado
- **CI/CD** pipeline
- **Monitoring** de performance
- **Analytics** de usuario 