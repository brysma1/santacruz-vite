# 🚀 Guía de Despliegue - EduRate UPB

## 📋 Prerrequisitos

### **Cuenta de GitHub**
- ✅ Cuenta de GitHub activa
- ✅ Acceso a crear repositorios
- ✅ Configuración de Git en tu máquina local

### **Herramientas Locales**
- ✅ Node.js 16+ instalado
- ✅ Git configurado
- ✅ Editor de código (VS Code recomendado)

## 🔧 Configuración Inicial

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/TU_USUARIO/edurate-upb-landing.git
cd edurate-upb-landing
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Verificar Configuración**
```bash
npm run dev
# Debería abrir http://localhost:3001/
```

## 🚀 Despliegue en GitHub Pages

### **Opción 1: Despliegue Automático (Recomendado)**

#### **Paso 1: Crear Repositorio en GitHub**
1. Ve a [github.com](https://github.com)
2. Haz clic en **"New repository"**
3. Nombre: `edurate-upb-landing`
4. Descripción: `Landing page para EduRate UPB - Plataforma de evaluación de profesores`
5. **NO** inicialices con README (ya tenemos uno)
6. Haz clic en **"Create repository"**

#### **Paso 2: Configurar GitHub Actions**
1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **"GitHub Actions"**
3. Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### **Paso 3: Subir Código**
```bash
git add .
git commit -m "🚀 Initial commit: EduRate UPB Landing Page"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/edurate-upb-landing.git
git push -u origin main
```

### **Opción 2: Despliegue Manual**

#### **Paso 1: Build del Proyecto**
```bash
npm run build
```

#### **Paso 2: Subir a GitHub**
```bash
git add .
git commit -m "🚀 Build de producción"
git push origin main
```

#### **Paso 3: Configurar GitHub Pages**
1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **"Deploy from a branch"**
3. Selecciona la rama **`gh-pages`** o **`main`**
4. Haz clic en **"Save"**

## 🌐 Configuración del Dominio

### **URL de GitHub Pages**
Tu página estará disponible en:
```
https://TU_USUARIO.github.io/edurate-upb-landing/
```

### **Dominio Personalizado (Opcional)**
1. Compra un dominio (ej: `edurate-upb.com`)
2. En **Settings** → **Pages**, agrega tu dominio
3. Configura los registros DNS según GitHub

## 📱 Verificación del Despliegue

### **1. Verificar Build**
```bash
npm run build
# Debería crear la carpeta dist/ sin errores
```

### **2. Previsualizar Build**
```bash
npm run preview
# Debería abrir http://localhost:3002/
```

### **3. Verificar en GitHub Pages**
- Espera 2-5 minutos después del push
- Ve a tu URL de GitHub Pages
- Verifica que todos los estilos y funcionalidades funcionen

## 🔧 Solución de Problemas

### **Error: Build Fallido**
```bash
# Limpiar cache
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Error: Estilos No Cargan**
- Verifica que `vite.config.js` esté configurado correctamente
- Asegúrate de que los archivos SCSS se compilen
- Revisa la consola del navegador para errores

### **Error: JavaScript No Funciona**
- Verifica que `main.js` se esté importando correctamente
- Revisa la consola del navegador para errores
- Asegúrate de que las dependencias estén instaladas

## 📊 Monitoreo Post-Despliegue

### **Herramientas Recomendadas**
- **Google PageSpeed Insights** - Performance
- **GTmetrix** - Análisis de velocidad
- **Google Search Console** - SEO y indexación
- **GitHub Insights** - Estadísticas del repositorio

### **Métricas a Monitorear**
- ⚡ Tiempo de carga de página
- 📱 Performance en móviles
- 🔍 SEO score
- 🚀 Core Web Vitals

## 🔄 Actualizaciones

### **Flujo de Trabajo**
1. **Desarrollo local**: `npm run dev`
2. **Testing**: `npm run build && npm run preview`
3. **Commit**: `git add . && git commit -m "✨ Nueva funcionalidad"`
4. **Push**: `git push origin main`
5. **Despliegue automático** vía GitHub Actions

### **Versionado**
- Usa [Conventional Commits](https://conventionalcommits.org/)
- Ejemplo: `feat: ✨ agregar sistema de filtros para profesores`

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://github.com/features/actions)

### **Comunidad**
- [GitHub Community](https://github.com/orgs/community/discussions)
- [Vite Discord](https://chat.vitejs.dev/)

---

## 🎯 Checklist de Despliegue

- [ ] ✅ Repositorio creado en GitHub
- [ ] ✅ Código subido y funcionando localmente
- [ ] ✅ Build de producción exitoso
- [ ] ✅ GitHub Actions configurado
- [ ] ✅ Página desplegada en GitHub Pages
- [ ] ✅ Estilos y funcionalidades verificadas
- [ ] ✅ Performance optimizada
- [ ] ✅ SEO configurado

¡Tu landing page de EduRate UPB estará lista para impresionar al mundo! 🚀 