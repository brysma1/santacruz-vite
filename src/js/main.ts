import type { Professor, Review, User, AuthState, SearchFilters, Stats, ModalState, Toast } from '../types';

// Variables Globales de la Aplicación
let slideActual: number = 0;
let intervaloBanner: number | null = null;
let datosProfesores: Professor[] = [];
let datosReviews: Review[] = [];
let usuarioActual: User | null = null;
let calificacionesActuales = {
  general: 0,
  claridad: 0,
  disponibilidad: 0,
  dificultad: 0,
};

// Base de datos simulada de usuarios UPB
const usuariosSimulados = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@upb.edu.co",
    codigoEstudiante: "ID000123456",
    facultad: "ingenieria",
    contraseña: "password123",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@upb.edu.co",
    codigoEstudiante: "ID000789012",
    facultad: "medicina",
    contraseña: "password123",
  },
]

// Elementos del DOM - Referencias principales
const barraNavegacion = document.getElementById("navbar")
const botonToggleNavegacion = document.getElementById("nav-toggle")
const menuNavegacion = document.getElementById("nav-menu")
const modalBusqueda = document.getElementById("searchModal")
const botonBusqueda = document.getElementById("searchBtn")
const cerrarBusqueda = document.getElementById("closeSearch")
const modalReview = document.getElementById("reviewModal")
const modalProfesor = document.getElementById("professorModal")
const botonAccionPrincipal = document.getElementById("mainFab")
const menuAcciones = document.getElementById("fabMenu")
const contenedorToast = document.getElementById("toastContainer")

// Elementos de autenticación y gestión de usuarios
const modalLogin = document.getElementById("loginModal")
const modalRegistro = document.getElementById("registerModal")
const botonLogin = document.getElementById("loginBtn")
const botonesAutenticacion = document.getElementById("authButtons")
const menuUsuario = document.getElementById("userMenu")

// Datos de muestra - Profesores de la Universidad Pontificia Bolivariana
const profesoresMuestra = [
  {
    id: 1,
    nombre: "Dr. María Elena Gómez",
    titulo: "Profesora Titular",
    universidad: "UPB",
    facultad: "ingenieria",
    materia: "ingenieria",
    materias: ["Cálculo Diferencial", "Álgebra Lineal", "Matemáticas Discretas"],
    calificacion: 4.8,
    cantidadRevisiones: 156,
    imagen: "/placeholder.svg?height=200&width=200&text=Dr.+María+Elena+Gómez",
    insignia: "Top Rated",
    descripcion: "Doctora en Matemáticas Aplicadas con 15 años de experiencia en la UPB.",
    email: "maria.gomez@upb.edu.co",
    oficina: "Bloque 11, Oficina 301",
    horario: "Lunes a Viernes 10:00-12:00",
    dificultad: "medium",
    promedioCalificacion: 4.2,
    semestres: ["2024-1", "2023-2", "2023-1"],
  },
  {
    id: 2,
    nombre: "Prof. Carlos Andrés Mendoza",
    titulo: "Profesor Asociado",
    universidad: "UPB",
    facultad: "ingenieria",
    materia: "ingenieria",
    materias: ["Programación I", "Estructuras de Datos", "Algoritmos"],
    calificacion: 4.6,
    cantidadRevisiones: 89,
    imagen: "/placeholder.svg?height=200&width=200&text=Prof.+Carlos+Mendoza",
    insignia: "Trending",
    descripcion: "Ingeniero de Sistemas con especialización en desarrollo de software.",
    email: "carlos.mendoza@upb.edu.co",
    oficina: "Bloque 9, Laboratorio 15",
    horario: "Martes y Jueves 14:00-16:00",
    dificultad: "hard",
    promedioCalificacion: 3.8,
    semestres: ["2024-1", "2023-2"],
  },
  {
    id: 3,
    nombre: "Dra. Ana Lucía Rodríguez",
    titulo: "Profesora Investigadora",
    universidad: "UPB",
    facultad: "medicina",
    materia: "medicina",
    materias: ["Anatomía", "Fisiología", "Patología"],
    calificacion: 4.9,
    cantidadRevisiones: 203,
    imagen: "/placeholder.svg?height=200&width=200&text=Dra.+Ana+Rodríguez",
    insignia: "Excellence",
    descripcion: "Doctora en Medicina, especialista en Medicina Interna.",
    email: "ana.rodriguez@upb.edu.co",
    oficina: "Clínica UPB, Consulta 3",
    horario: "Lunes, Miércoles y Viernes 8:00-10:00",
    dificultad: "hard",
    promedioCalificacion: 4.5,
    semestres: ["2024-1", "2023-2", "2023-1"],
  },
  {
    id: 4,
    nombre: "Prof. Luis Fernando Herrera",
    titulo: "Profesor de Cátedra",
    universidad: "UPB",
    facultad: "derecho",
    materia: "derecho",
    materias: ["Derecho Civil", "Derecho Comercial", "Derecho Constitucional"],
    calificacion: 4.4,
    cantidadRevisiones: 67,
    imagen: "/placeholder.svg?height=200&width=200&text=Prof.+Luis+Herrera",
    insignia: "Popular",
    descripcion: "Abogado especialista en Derecho Comercial, con 20 años de experiencia.",
    email: "luis.herrera@upb.edu.co",
    oficina: "Bloque 12, Oficina 205",
    horario: "Martes y Jueves 16:00-18:00",
    dificultad: "medium",
    promedioCalificacion: 4.1,
    semestres: ["2024-1", "2023-2"],
  },
  {
    id: 5,
    nombre: "Dr. Patricia Silva Restrepo",
    titulo: "Profesora Titular",
    universidad: "UPB",
    facultad: "administracion",
    materia: "administracion",
    materias: ["Administración Financiera", "Contabilidad", "Costos"],
    calificacion: 4.7,
    cantidadRevisiones: 134,
    imagen: "/placeholder.svg?height=200&width=200&text=Dr.+Patricia+Silva",
    insignia: "Expert",
    descripcion: "Doctora en Administración con especialización en finanzas corporativas.",
    email: "patricia.silva@upb.edu.co",
    oficina: "Bloque 7, Oficina 401",
    horario: "Lunes a Viernes 13:00-15:00",
    dificultad: "easy",
    promedioCalificacion: 4.3,
    semestres: ["2024-1", "2023-2", "2023-1"],
  },
  {
    id: 6,
    nombre: "Prof. Roberto Jiménez Cano",
    titulo: "Profesor Adjunto",
    universidad: "UPB",
    facultad: "comunicacion",
    materia: "comunicacion",
    materias: ["Comunicación Digital", "Periodismo", "Producción Audiovisual"],
    calificacion: 4.3,
    cantidadRevisiones: 78,
    imagen: "/placeholder.svg?height=200&width=200&text=Prof.+Roberto+Jiménez",
    insignia: "Rising Star",
    descripcion: "Comunicador Social con maestría en Comunicación Digital.",
    email: "roberto.jimenez@upb.edu.co",
    oficina: "Bloque 6, Estudio 412",
    horario: "Miércoles y Viernes 11:00-13:00",
    dificultad: "easy",
    promedioCalificacion: 4.0,
    semestres: ["2024-1", "2023-2"],
  },
]

const reviewsMuestra = [
  {
    id: 1,
    idProfesor: 1,
    nombreProfesor: "Dr. María Elena Gómez",
    autorNombre: "Ana M.",
    inicialesAutor: "AM",
    fecha: "2024-01-15",
    calificacion: 5,
    semestre: "2024-1",
    calificacionEstudiante: "4.5",
    contenido: `**Excelente profesora UPB** - Una de las mejores experiencias que he tenido en matemáticas.

### Lo que más me gustó:
- Explica de manera muy clara y paciente
- Siempre disponible para resolver dudas en horarios de oficina
- Sus exámenes son justos y bien estructurados
- Utiliza ejemplos prácticos que facilitan el aprendizaje

### Recomendaciones:
- Asistir a todas las clases, vale la pena
- Participar activamente en clase
- Aprovechar sus horarios de oficina en el Bloque 11

**Definitivamente la recomiendo** para cualquier materia de matemáticas en la UPB.`,
    util: 23,
    reportado: 0,
    anonimo: false,
  },
  {
    id: 2,
    idProfesor: 2,
    nombreProfesor: "Prof. Carlos Andrés Mendoza",
    autorNombre: "Estudiante Anónimo",
    inicialesAutor: "EA",
    fecha: "2024-01-10",
    calificacion: 4,
    semestre: "2023-2",
    calificacionEstudiante: "4.0",
    contenido: `Buen profesor de programación en la UPB, aunque a veces va muy rápido.

**Pros:**
- Conoce muy bien los lenguajes de programación
- Los proyectos son interesantes y desafiantes
- Feedback constructivo en las tareas
- Laboratorios bien equipados

**Contras:**
- A veces explica muy rápido
- Podría dar más ejemplos prácticos

En general, si te gusta la programación, es una buena opción en Ingeniería UPB.`,
    util: 15,
    reportado: 0,
    anonimo: true,
  },
  {
    id: 3,
    idProfesor: 3,
    nombreProfesor: "Dra. Ana Lucía Rodríguez",
    autorNombre: "Miguel R.",
    inicialesAutor: "MR",
    fecha: "2024-01-08",
    calificacion: 5,
    semestre: "2024-1",
    calificacionEstudiante: "4.8",
    contenido: `### ¡Increíble profesora de medicina en la UPB!

La Dra. Rodríguez es simplemente **excepcional**. Su pasión por la medicina es contagiosa y logra que hasta los conceptos más complejos sean comprensibles.

#### Destacable:
1. **Metodología innovadora** - Usa casos clínicos reales
2. **Accesibilidad** - Siempre dispuesta a ayudar
3. **Evaluación justa** - Los exámenes reflejan lo visto en clase
4. **Inspiradora** - Me motivó a considerar la especialización

*Nota: Sus clases requieren dedicación, pero vale totalmente la pena en Medicina UPB.*`,
    util: 31,
    reportado: 0,
    anonimo: false,
  },
]

// Inicialización de la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  inicializarAplicacion()
})

/**
 * Función principal de inicialización de la aplicación
 * Configura todos los componentes y funcionalidades
 */
function inicializarAplicacion() {
  // Cargar datos iniciales
  datosProfesores = [...profesoresMuestra]
  datosReviews = [...reviewsMuestra]

  // Configurar funcionalidades principales
  configurarEventListeners()
  inicializarBanner()
  renderizarProfesores()
  renderizarReviews()
  renderizarProfesoresDestacados()
  renderizarClasificaciones()
  renderizarMateriasPopulares()
  renderizarTestimonios()
  renderizarConsejosAcademicos()
  animarEstadisticas()
  animarGraficos()
  configurarBarraNavegacion()
  configurarAccionesFlotantes()
  configurarManejadoresFormulario()
  configurarCalificacionesEstrellas()
  configurarEditorMarkdown()

  console.log("✅ EduRate UPB - Plataforma de reviews académicos cargada correctamente.")
}

/**
 * Configura todos los event listeners principales de la aplicación
 * Incluye navegación, modales, búsqueda y filtros
 */
function configurarEventListeners() {
  // Configurar toggle de navegación móvil
  const botonToggle = document.getElementById("nav-toggle")
  const menuNavegacion = document.getElementById("nav-menu")

  if (botonToggle && menuNavegacion) {
    botonToggle.addEventListener("click", () => {
      menuNavegacion.classList.toggle("active")
      botonToggle.classList.toggle("active")
    })
  }

  // Configurar manejadores de modales
  configurarManejadoresModal()

  // Configurar funcionalidad de búsqueda
  configurarManejadoresBusqueda()

  // Configurar navegación del banner principal
  configurarNavegacionBanner()

  // Configurar filtros de profesores
  configurarFiltrosProfesores()

  // Configurar botones de acción flotante
  configurarAccionesFlotantes()
}

/**
 * Configura los manejadores de eventos para todos los modales
 * Incluye login, registro, evaluación y detalles de profesores
 */
function configurarManejadoresModal() {
  // Configurar modal de inicio de sesión
  const botonLogin = document.getElementById("loginBtn")
  const modalLogin = document.getElementById("loginModal")
  const cerrarModalLogin = document.getElementById("closeLoginModal")

  if (botonLogin && modalLogin) {
    botonLogin.addEventListener("click", () => {
      modalLogin.style.display = "block"
    })
  }

  if (cerrarModalLogin && modalLogin) {
    cerrarModalLogin.addEventListener("click", () => {
      modalLogin.style.display = "none"
    })
  }

  // Modal de registro
  const modalRegistro = document.getElementById("registerModal")
  const cerrarModalRegistro = document.getElementById("closeRegisterModal")
  const mostrarRegistro = document.getElementById("showRegister")
  const mostrarLogin = document.getElementById("showLogin")

  if (mostrarRegistro && modalRegistro && modalLogin) {
    mostrarRegistro.addEventListener("click", (e) => {
      e.preventDefault()
      modalLogin.style.display = "none"
      modalRegistro.style.display = "block"
    })
  }

  if (cerrarModalRegistro && modalRegistro) {
    cerrarModalRegistro.addEventListener("click", () => {
      modalRegistro.style.display = "none"
    })
  }

  if (mostrarLogin && modalRegistro && modalLogin) {
    mostrarLogin.addEventListener("click", (e) => {
      e.preventDefault()
      modalRegistro.style.display = "none"
      modalLogin.style.display = "block"
    })
  }

  // Modal de evaluación
  const botonEscribirReview = document.getElementById("writeReviewBtn")
  const modalReview = document.getElementById("reviewModal")
  const cerrarModalReview = document.getElementById("closeReviewModal")

  if (botonEscribirReview && modalReview) {
    botonEscribirReview.addEventListener("click", () => {
      modalReview.style.display = "block"
      poblarSeleccionarProfesor()
    })
  }

  if (cerrarModalReview && modalReview) {
    cerrarModalReview.addEventListener("click", () => {
      modalReview.style.display = "none"
    })
  }

  // Cerrar modales al hacer clic fuera
  window.addEventListener("click", (event) => {
    if (event.target === modalLogin) {
      modalLogin.style.display = "none"
    }
    if (event.target === modalRegistro) {
      modalRegistro.style.display = "none"
    }
    if (event.target === modalReview) {
      modalReview.style.display = "none"
    }
  })
}

function configurarManejadoresBusqueda() {
  const botonBusqueda = document.getElementById("searchBtn")
  const modalBusqueda = document.getElementById("searchModal")
  const cerrarBusqueda = document.getElementById("closeSearch")
  const campoBusqueda = document.getElementById("searchInput")

  if (botonBusqueda && modalBusqueda) {
    botonBusqueda.addEventListener("click", () => {
      modalBusqueda.style.display = "block"
      if (campoBusqueda) campoBusqueda.focus()
    })
  }

  if (cerrarBusqueda && modalBusqueda) {
    cerrarBusqueda.addEventListener("click", () => {
      modalBusqueda.style.display = "none"
    })
  }

  if (campoBusqueda) {
    campoBusqueda.addEventListener("input", realizarBusqueda)
  }
}

function configurarNavegacionBanner() {
  const botonAnterior = document.getElementById("prevBtn")
  const botonSiguiente = document.getElementById("nextBtn")
  const indicadores = document.querySelectorAll(".indicator")

  if (botonAnterior) {
    botonAnterior.addEventListener("click", () => {
      slideAnterior()
    })
  }

  if (botonSiguiente) {
    botonSiguiente.addEventListener("click", () => {
      siguienteSlide()
    })
  }

  indicadores.forEach((indicador, index) => {
    indicador.addEventListener("click", () => {
      irASlide(index)
    })
  })
}

function configurarFiltrosProfesores() {
  const botonesFiltro = document.querySelectorAll(".filter-btn")

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Eliminar clase activa de todos los botones
      botonesFiltro.forEach((b) => b.classList.remove("active"))
      // Agregar clase activa al botón clicado
      boton.classList.add("active")

      const filtro = boton.getAttribute("data-filter")
      filtrarProfesores(filtro)
    })
  })

  // Configurar filtros avanzados
  configurarFiltrosAvanzados()
}

function configurarAccionesFlotantes() {
  const botonAccionPrincipal = document.getElementById("mainFab")
  const menuAcciones = document.getElementById("fabMenu")
  const botonEscribirReview = document.getElementById("writeReviewFab")
  const botonBuscar = document.getElementById("searchFab")
  const botonScrollTop = document.getElementById("scrollTopFab")

  if (botonAccionPrincipal && menuAcciones) {
    botonAccionPrincipal.addEventListener("click", () => {
      menuAcciones.classList.toggle("active")
    })
  }

  if (botonEscribirReview) {
    botonEscribirReview.addEventListener("click", () => {
      document.getElementById("reviewModal").style.display = "block"
      menuAcciones.classList.remove("active")
    })
  }

  if (botonBuscar) {
    botonBuscar.addEventListener("click", () => {
      document.getElementById("searchModal").style.display = "block"
      menuAcciones.classList.remove("active")
    })
  }

  if (botonScrollTop) {
    botonScrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      menuAcciones.classList.remove("active")
    })
  }
}

function configurarBarraNavegacion() {
  const barraNavegacion = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      barraNavegacion.classList.add("scrolled")
    } else {
      barraNavegacion.classList.remove("scrolled")
    }
  })
}

function configurarManejadoresFormulario() {
  // Formulario de contacto
  const formularioContacto = document.getElementById("contactForm")
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", manejarFormularioContacto)
  }

  // Formulario de login
  const formularioLogin = document.getElementById("loginForm")
  if (formularioLogin) {
    formularioLogin.addEventListener("submit", manejarLogin)
  }

  // Formulario de registro
  const formularioRegistro = document.getElementById("registerForm")
  if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", manejarRegistro)
  }

  // Formulario de evaluación
  const formularioReview = document.getElementById("reviewForm")
  if (formularioReview) {
    formularioReview.addEventListener("submit", manejarEnvioReview)
  }
}

function configurarCalificacionesEstrellas() {
  const estrellasCalificacion = document.querySelectorAll(".star-rating")

  estrellasCalificacion.forEach((calificacion) => {
    const estrellas = calificacion.querySelectorAll("i")
    const categoria = calificacion.getAttribute("data-category") || "general"

    estrellas.forEach((estrella, index) => {
      estrella.addEventListener("click", () => {
        const valorCalificacion = index + 1
        calificacionesActuales[categoria] = valorCalificacion

        // Actualizar estado visual
        estrellas.forEach((s, i) => {
          if (i < valorCalificacion) {
            s.classList.add("active")
          } else {
            s.classList.remove("active")
          }
        })
      })

      estrella.addEventListener("mouseenter", () => {
        estrellas.forEach((s, i) => {
          if (i <= index) {
            s.style.color = "#fbbf24"
          } else {
            s.style.color = "#e5e7eb"
          }
        })
      })
    })

    calificacion.addEventListener("mouseleave", () => {
      const calificacionActual = calificacionesActuales[categoria]
      estrellas.forEach((s, i) => {
        if (i < calificacionActual) {
          s.style.color = "#fbbf24"
        } else {
          s.style.color = "#e5e7eb"
        }
      })
    })
  })
}

function configurarEditorMarkdown() {
  const botonesEditor = document.querySelectorAll(".editor-btn")
  const textoReview = document.getElementById("reviewText")
  const vistaPreviaMarkdown = document.getElementById("markdownPreview")

  botonesEditor.forEach((boton) => {
    boton.addEventListener("click", () => {
      const accion = boton.getAttribute("data-action")
      manejarAccionMarkdown(accion, textoReview, vistaPreviaMarkdown)
    })
  })

  if (textoReview) {
    textoReview.addEventListener("input", () => {
      actualizarConteoPalabras()
      guardarBorradorReview()
    })

    // Cargar borrador guardado
    const borradorGuardado = localStorage.getItem("borradorReview")
    if (borradorGuardado) {
      textoReview.value = borradorGuardado
    }
  }
}

/**
 * Inicializa el banner principal con rotación automática
 * Configura las imágenes de fondo y la navegación
 */
function inicializarBanner() {
  const slides = document.querySelectorAll(".hero-slide")

  // Configurar imágenes de fondo para cada slide
  slides.forEach((slide, index) => {
    const urlFondo = slide.getAttribute("data-bg")
    slide.style.backgroundImage = `url('${urlFondo}')`
  })

  // Iniciar rotación automática del banner cada 5 segundos
  intervaloBanner = setInterval(siguienteSlide, 5000)

  // Pausar rotación cuando el usuario interactúa con el banner
  const seccionHero = document.querySelector(".hero-section")
  if (seccionHero) {
    seccionHero.addEventListener("mouseenter", () => {
      clearInterval(intervaloBanner)
    })

    seccionHero.addEventListener("mouseleave", () => {
      intervaloBanner = setInterval(siguienteSlide, 5000)
    })
  }
}

/**
 * Avanza al siguiente slide del banner
 * Actualiza tanto el slide como el indicador correspondiente
 */
function siguienteSlide() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicadores = document.querySelectorAll(".indicator")

  // Ocultar slide actual
  slides[slideActual].classList.remove("active")
  indicadores[slideActual].classList.remove("active")

  // Calcular siguiente slide (ciclo circular)
  slideActual = (slideActual + 1) % slides.length

  // Mostrar nuevo slide
  slides[slideActual].classList.add("active")
  indicadores[slideActual].classList.add("active")
}

/**
 * Retrocede al slide anterior del banner
 * Maneja el caso especial del primer slide
 */
function slideAnterior() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicadores = document.querySelectorAll(".indicator")

  // Ocultar slide actual
  slides[slideActual].classList.remove("active")
  indicadores[slideActual].classList.remove("active")

  // Calcular slide anterior (ciclo circular)
  slideActual = slideActual === 0 ? slides.length - 1 : slideActual - 1

  // Mostrar nuevo slide
  slides[slideActual].classList.add("active")
  indicadores[slideActual].classList.add("active")
}

/**
 * Navega directamente a un slide específico
 * @param {number} indice - Índice del slide al que navegar
 */
function irASlide(indice) {
  const slides = document.querySelectorAll(".hero-slide")
  const indicadores = document.querySelectorAll(".indicator")

  // Ocultar slide actual
  slides[slideActual].classList.remove("active")
  indicadores[slideActual].classList.remove("active")

  // Establecer nuevo slide
  slideActual = indice

  // Mostrar nuevo slide
  slides[slideActual].classList.add("active")
  indicadores[slideActual].classList.add("active")
}

/**
 * Renderiza la lista de profesores en el grid principal
 * @param {string} filtro - Filtro de facultad a aplicar (default: "all")
 */
function renderizarProfesores(filtro = "all") {
  const gridProfesores = document.getElementById("professorsGrid")
  if (!gridProfesores) return

  // Limpiar grid existente
  gridProfesores.innerHTML = ""

  // Filtrar profesores según el criterio seleccionado
  const profesoresFiltrados =
    filtro === "all" ? datosProfesores : datosProfesores.filter((prof) => prof.facultad === filtro)

  // Crear y agregar tarjetas de profesores
  profesoresFiltrados.forEach((profesor) => {
    const tarjetaProfesor = crearTarjetaProfesor(profesor)
    gridProfesores.appendChild(tarjetaProfesor)
  })
}

/**
 * Crea una tarjeta visual para mostrar información de un profesor
 * @param {Object} profesor - Objeto con datos del profesor
 * @returns {HTMLElement} Elemento DOM de la tarjeta del profesor
 */
function crearTarjetaProfesor(profesor) {
  const tarjeta = document.createElement("div")
  tarjeta.className = "professor-card"
  tarjeta.setAttribute("data-facultad", profesor.facultad)

  // Mapear nivel de dificultad a texto en español
  const textoDificultad = profesor.dificultad === 'easy' ? 'Fácil' : 
                        profesor.dificultad === 'medium' ? 'Intermedio' : 'Difícil'
  
  // Obtener clase CSS para el color de dificultad
  const claseDificultad = profesor.dificultad || 'medium'

  tarjeta.innerHTML = `
    <div class="professor-image">
      <img src="${profesor.imagen}" alt="${profesor.nombre}">
      <div class="professor-badge">${profesor.insignia}</div>
    </div>
    <div class="professor-info">
      <h3 class="professor-name">${profesor.nombre}</h3>
      <p class="professor-title">${profesor.titulo}</p>
      <p class="professor-university">${profesor.universidad}</p>
      <div class="professor-rating">
        <div class="stars">
          ${generarEstrellas(profesor.calificacion)}
        </div>
        <span class="rating-text">${profesor.calificacion} (${profesor.cantidadRevisiones} reviews)</span>
      </div>
      <div class="professor-subjects">
        ${profesor.materias.map((materia) => `<span class="subject-tag">${materia}</span>`).join("")}
      </div>
      <div class="professor-stats">
        <span>📧 ${profesor.email}</span>
        <span>🏢 ${profesor.oficina}</span>
      </div>
      <div class="professor-advanced-info">
        <div class="difficulty-indicator ${claseDificultad}">
          <span>Dificultad: ${textoDificultad}</span>
        </div>
        <div class="grade-indicator">
          <span>Promedio de Calificación: ${profesor.promedioCalificacion || 'N/A'}</span>
        </div>
      </div>
    </div>
  `

  tarjeta.addEventListener("click", () => {
    mostrarDetalleProfesor(profesor)
  })

  return tarjeta
}

/**
 * Genera el HTML para mostrar estrellas de calificación
 * @param {number} calificacion - Calificación del profesor (1-5)
 * @returns {string} HTML con las estrellas correspondientes
 */
function generarEstrellas(calificacion) {
  let estrellas = ""
  
  for (let i = 1; i <= 5; i++) {
    if (i <= calificacion) {
      // Estrella completa
      estrellas += '<i class="fas fa-star"></i>'
    } else if (i - 0.5 <= calificacion) {
      // Media estrella
      estrellas += '<i class="fas fa-star-half-alt"></i>'
    } else {
      // Estrella vacía
      estrellas += '<i class="fas fa-star empty"></i>'
    }
  }
  
  return estrellas
}

/**
 * Filtra y renderiza profesores según el criterio seleccionado
 * @param {string} filtro - Tipo de filtro a aplicar
 */
function filtrarProfesores(filtro) {
  renderizarProfesores(filtro)
}

// Funciones de filtros avanzados
function configurarFiltrosAvanzados() {
  const filtroDificultad = document.getElementById("difficultyFilter")
  const filtroSemestre = document.getElementById("semesterFilter")
  const filtroCalificacion = document.getElementById("gradeFilter")
  const botonResetearFiltros = document.getElementById("resetFiltersBtn")

  if (filtroDificultad) {
    filtroDificultad.addEventListener("change", aplicarFiltrosAvanzados)
  }

  if (filtroSemestre) {
    filtroSemestre.addEventListener("change", aplicarFiltrosAvanzados)
  }

  if (filtroCalificacion) {
    filtroCalificacion.addEventListener("change", aplicarFiltrosAvanzados)
  }

  if (botonResetearFiltros) {
    botonResetearFiltros.addEventListener("click", resetearFiltrosAvanzados)
  }
}

function aplicarFiltrosAvanzados() {
  const filtroDificultad = document.getElementById("difficultyFilter")
  const filtroSemestre = document.getElementById("semesterFilter")
  const filtroCalificacion = document.getElementById("gradeFilter")
  const botonFiltroActivo = document.querySelector(".filter-btn.active")
  
  let filtroActual = "all"
  if (botonFiltroActivo) {
    filtroActual = botonFiltroActivo.getAttribute("data-filter")
  }

  let profesoresFiltrados = datosProfesores

  // Aplicar filtro de facultad
  if (filtroActual !== "all") {
    profesoresFiltrados = profesoresFiltrados.filter(prof => prof.facultad === filtroActual)
  }

  // Aplicar filtro de dificultad
  if (filtroDificultad && filtroDificultad.value !== "") {
    profesoresFiltrados = profesoresFiltrados.filter(prof => prof.dificultad === filtroDificultad.value)
  }

  // Aplicar filtro de semestre
  if (filtroSemestre && filtroSemestre.value !== "") {
    profesoresFiltrados = profesoresFiltrados.filter(prof => 
      prof.semestres && prof.semestres.includes(filtroSemestre.value)
    )
  }

  // Aplicar filtro de calificación
  if (filtroCalificacion && filtroCalificacion.value !== "") {
    const minCalificacion = parseFloat(filtroCalificacion.value)
    profesoresFiltrados = profesoresFiltrados.filter(prof => 
      prof.promedioCalificacion >= minCalificacion
    )
  }

  renderizarProfesoresFiltrados(profesoresFiltrados)
}

function renderizarProfesoresFiltrados(profesores) {
  const gridProfesores = document.getElementById("professorsGrid")
  if (!gridProfesores) return

  gridProfesores.innerHTML = ""

  if (profesores.length === 0) {
    gridProfesores.innerHTML = `
      <div class="no-results">
        <h3>No se encontraron profesores</h3>
        <p>Intenta ajustar los filtros para ver más resultados</p>
      </div>
    `
    return
  }

  profesores.forEach((profesor) => {
    const tarjetaProfesor = crearTarjetaProfesor(profesor)
    gridProfesores.appendChild(tarjetaProfesor)
  })

  // Mostrar conteo de resultados
  mostrarConteoFiltros(profesores.length)
}

function mostrarConteoFiltros(conteo) {
  const encabezadoSeccion = document.querySelector(".professors-section .section-header")
  if (!encabezadoSeccion) return

  let resultadosExistentes = encabezadoSeccion.querySelector(".filter-results")
  if (!resultadosExistentes) {
    resultadosExistentes = document.createElement("p")
    resultadosExistentes.className = "filter-results"
    resultadosExistentes.style.textAlign = "center"
    resultadosExistentes.style.color = "var(--text-secondary)"
    resultadosExistentes.style.marginTop = "1rem"
    encabezadoSeccion.appendChild(resultadosExistentes)
  }

  resultadosExistentes.textContent = `Mostrando ${conteo} profesor${conteo !== 1 ? 'es' : ''}`
}

function resetearFiltrosAvanzados() {
  const filtroDificultad = document.getElementById("difficultyFilter")
  const filtroSemestre = document.getElementById("semesterFilter")
  const filtroCalificacion = document.getElementById("gradeFilter")

  if (filtroDificultad) filtroDificultad.value = ""
  if (filtroSemestre) filtroSemestre.value = ""
  if (filtroCalificacion) filtroCalificacion.value = ""

  // Resetear a todos los profesores
  const botonFiltroTodos = document.querySelector('.filter-btn[data-filter="all"]')
  if (botonFiltroTodos) {
    document.querySelectorAll(".filter-btn").forEach(boton => boton.classList.remove("active"))
    botonFiltroTodos.classList.add("active")
  }

  renderizarProfesores("all")
  
  // Eliminar conteo de resultados
  const resultadosFiltro = document.querySelector(".filter-results")
  if (resultadosFiltro) {
    resultadosFiltro.remove()
  }
}

function mostrarDetalleProfesor(profesor) {
  const modal = document.getElementById("professorModal")
  const titulo = document.getElementById("professorModalTitle")
  const detalle = document.getElementById("professorDetail")

  if (!modal || !titulo || !detalle) return

  titulo.textContent = profesor.nombre

  detalle.innerHTML = `
    <div class="professor-header">
      <img src="${profesor.imagen}" alt="${profesor.nombre}" class="professor-photo">
      <div class="professor-main-info">
        <h2>${profesor.nombre}</h2>
        <p>${profesor.titulo}</p>
        <p>${profesor.universidad}</p>
        <p>${profesor.descripcion}</p>
        <div class="professor-overall-rating">
          <span class="rating-number">${profesor.calificacion}</span>
          <div class="stars">${generarEstrellas(profesor.calificacion)}</div>
          <span>(${profesor.cantidadRevisiones} reviews)</span>
        </div>
      </div>
    </div>
    <div class="professor-tabs">
      <button class="tab-btn active" data-tab="info">Información</button>
      <button class="tab-btn" data-tab="reviews">Reviews</button>
      <button class="tab-btn" data-tab="schedule">Horarios</button>
    </div>
    <div class="tab-content active" id="info">
      <h3>Materias que dicta:</h3>
      <ul>
        ${profesor.materias.map((materia) => `<li>${materia}</li>`).join("")}
      </ul>
      <h3>Contacto:</h3>
      <p><strong>Email:</strong> ${profesor.email}</p>
      <p><strong>Oficina:</strong> ${profesor.oficina}</p>
      <p><strong>Horario de atención:</strong> ${profesor.horario}</p>
    </div>
    <div class="tab-content" id="reviews">
      <p>Reviews específicas de este profesor aparecerían aquí...</p>
    </div>
    <div class="tab-content" id="schedule">
      <p>Horarios detallados de clases aparecerían aquí...</p>
    </div>
  `

  // Configurar funcionalidad de pestañas
  const botonesPestañas = detalle.querySelectorAll(".tab-btn")
  const contenidosPestañas = detalle.querySelectorAll(".tab-content")

  botonesPestañas.forEach((boton) => {
    boton.addEventListener("click", () => {
      const idPestaña = boton.getAttribute("data-tab")

      botonesPestañas.forEach((b) => b.classList.remove("active"))
      contenidosPestañas.forEach((c) => c.classList.remove("active"))

      boton.classList.add("active")
      detalle.querySelector(`#${idPestaña}`).classList.add("active")
    })
  })

  modal.style.display = "block"

  // Manejador de cierre del modal
  const botonCerrar = document.getElementById("closeProfessorModal")
  if (botonCerrar) {
    botonCerrar.onclick = () => {
      modal.style.display = "none"
    }
  }
}

// Funciones de evaluaciones
function renderizarReviews() {
  const listaReviews = document.getElementById("reviewsList")
  if (!listaReviews) return

  // Limpiar contenido existente excepto video
  const reviewsExistentes = listaReviews.querySelectorAll(".review-card")
  reviewsExistentes.forEach((review) => review.remove())

  datosReviews.forEach((review) => {
    const tarjetaReview = crearTarjetaReview(review)
    listaReviews.appendChild(tarjetaReview)
  })
}

function crearTarjetaReview(review) {
  const tarjeta = document.createElement("div")
  tarjeta.className = "review-card"

  tarjeta.innerHTML = `
    <div class="review-header">
      <div class="review-author">
        <div class="author-avatar">${review.inicialesAutor}</div>
        <div class="author-info">
          <h4>${review.autorNombre}</h4>
          <p>${review.fecha}</p>
        </div>
      </div>
      <div class="review-date">${review.fecha}</div>
    </div>
    <div class="review-professor">
      <a href="#" class="professor-link">${review.nombreProfesor}</a>
    </div>
    <div class="review-rating">
      <div class="stars">${generarEstrellas(review.calificacion)}</div>
      <span class="rating-text">${review.calificacion}/5</span>
    </div>
    <div class="review-content">${parsearMarkdown(review.contenido)}</div>
    <div class="review-actions">
      <button class="action-btn" data-action="helpful">
        <i class="fas fa-thumbs-up"></i>
        ${review.util} útil
      </button>
      <button class="action-btn" data-action="report">
        <i class="fas fa-flag"></i>
        Reportar
      </button>
    </div>
  `

  return tarjeta
}

function renderizarProfesoresDestacados() {
  const listaDestacados = document.getElementById("trendingList")
  if (!listaDestacados) return

  // Obtener los 5 profesores con mejor calificación
  const destacados = [...datosProfesores].sort((a, b) => b.calificacion - a.calificacion).slice(0, 5)

  listaDestacados.innerHTML = ""

  destacados.forEach((profesor) => {
    const item = document.createElement("div")
    item.className = "trending-item"

    item.innerHTML = `
      <div class="trending-avatar">${profesor.nombre.charAt(0)}</div>
      <div class="trending-info">
        <h4>${profesor.nombre}</h4>
        <p>${profesor.calificacion} ⭐ (${profesor.cantidadRevisiones} reviews)</p>
      </div>
    `

    item.addEventListener("click", () => {
      mostrarDetalleProfesor(profesor)
    })

    listaDestacados.appendChild(item)
  })
}

function poblarSeleccionarProfesor() {
  const select = document.getElementById("professorSelect")
  if (!select) return

  // Limpiar opciones existentes excepto la primera
  select.innerHTML = '<option value="">Selecciona un profesor</option>'

  datosProfesores.forEach((profesor) => {
    const opcion = document.createElement("option")
    opcion.value = profesor.id
    opcion.textContent = `${profesor.nombre} - ${profesor.materias.join(", ")}`
    select.appendChild(opcion)
  })
}

// Manejadores de formulario
function manejarFormularioContacto(e) {
  e.preventDefault()

  const datosFormulario = new FormData(e.target)
  const datos = Object.fromEntries(datosFormulario)

  // Guardar en localStorage
  const contactos = JSON.parse(localStorage.getItem("contactos") || "[]")
  contactos.push({
    ...datos,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  })
  localStorage.setItem("contactos", JSON.stringify(contactos))

  mostrarToast("Mensaje enviado correctamente", "success")
  e.target.reset()
}

/**
 * Maneja el proceso de inicio de sesión
 * @param {Event} e - Evento del formulario
 */
function manejarLogin(e) {
  e.preventDefault()

  const datosFormulario = new FormData(e.target)
  const email = datosFormulario.get("email")
  const contraseña = datosFormulario.get("password")

  // Validar credenciales contra la base de datos simulada
  const usuario = usuariosSimulados.find((u) => u.email === email && u.contraseña === contraseña)

  if (usuario) {
    // Inicio de sesión exitoso
    usuarioActual = usuario
    localStorage.setItem("usuarioActual", JSON.stringify(usuario))
    actualizarUIAutenticacion()
    document.getElementById("loginModal").style.display = "none"
    mostrarToast(`¡Bienvenido ${usuario.nombre}!`, "success")
  } else {
    // Credenciales incorrectas
    mostrarToast("Credenciales incorrectas", "error")
  }
}

/**
 * Maneja el proceso de registro de nuevos usuarios
 * @param {Event} e - Evento del formulario
 */
function manejarRegistro(e) {
  e.preventDefault()

  const datosFormulario = new FormData(e.target)
  const datos = Object.fromEntries(datosFormulario)

  // Validar que sea un email institucional UPB
  if (!datos.email.endsWith("@upb.edu.co")) {
    mostrarToast("Debe usar un email institucional UPB", "error")
    return
  }

  // Verificar que el usuario no esté ya registrado
  if (usuariosSimulados.find((u) => u.email === datos.email)) {
    mostrarToast("Este email ya está registrado", "error")
    return
  }

  // Crear nuevo usuario con datos del formulario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: datos.nombre,
    apellido: datos.apellido,
    email: datos.email,
    codigoEstudiante: datos.codigoEstudiante,
    facultad: datos.facultad,
    contraseña: datos.contraseña,
  }

  // Guardar usuario en la base de datos simulada
  usuariosSimulados.push(nuevoUsuario)
  localStorage.setItem("usuariosSimulados", JSON.stringify(usuariosSimulados))

  // Iniciar sesión automáticamente
  usuarioActual = nuevoUsuario
  localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario))

  actualizarUIAutenticacion()
  document.getElementById("registerModal").style.display = "none"
  mostrarToast(`¡Cuenta creada exitosamente! Bienvenido ${nuevoUsuario.nombre}`, "success")
}

function manejarEnvioReview(e) {
  e.preventDefault()

  if (!usuarioActual) {
    mostrarToast("Debes iniciar sesión para escribir una review", "error")
    return
  }

  const datosFormulario = new FormData(e.target)
  const datos = Object.fromEntries(datosFormulario)

  const profesor = datosProfesores.find((p) => p.id == datos.profesor)
  if (!profesor) {
    mostrarToast("Selecciona un profesor válido", "error")
    return
  }

  const nuevaReview = {
    id: Date.now(),
    idProfesor: profesor.id,
    nombreProfesor: profesor.nombre,
    autorNombre:
      datos.anonimo === "on" ? "Estudiante Anónimo" : `${usuarioActual.nombre} ${usuarioActual.apellido.charAt(0)}.`,
    inicialesAutor:
      datos.anonimo === "on" ? "EA" : `${usuarioActual.nombre.charAt(0)}${usuarioActual.apellido.charAt(0)}`,
    fecha: new Date().toISOString().split("T")[0],
    calificacion: calificacionesActuales.general,
    semestre: datos.semestre,
    calificacionEstudiante: datos.calificacion,
    contenido: datos.reviewText,
    util: 0,
    reportado: 0,
    anonimo: datos.anonimo === "on",
  }

  datosReviews.unshift(nuevaReview)
  localStorage.setItem("reviews", JSON.stringify(datosReviews))

  // Actualizar calificación y cantidad de evaluaciones del profesor
  profesor.cantidadRevisiones++
  const todasReviewsProfesor = datosReviews.filter((r) => r.idProfesor === profesor.id)
  const promedioCalificacion = todasReviewsProfesor.reduce((suma, r) => suma + r.calificacion, 0) / todasReviewsProfesor.length
  profesor.calificacion = Math.round(promedioCalificacion * 10) / 10

  localStorage.setItem("profesores", JSON.stringify(datosProfesores))

  renderizarReviews()
  renderizarProfesores()
  renderizarProfesoresDestacados()

  document.getElementById("reviewModal").style.display = "none"
  e.target.reset()
  resetearCalificacionesEstrellas()
  localStorage.removeItem("borradorReview")

  mostrarToast("Review publicada exitosamente", "success")
}

// Funciones de autenticación
function actualizarUIAutenticacion() {
  const botonesAutenticacion = document.getElementById("authButtons")
  const menuUsuario = document.getElementById("userMenu")
  const nombreUsuario = document.getElementById("userName")
  const emailUsuario = document.getElementById("userEmail")
  const inicialesUsuario = document.getElementById("userInitials")

  if (usuarioActual) {
    botonesAutenticacion.style.display = "none"
    menuUsuario.style.display = "block"
    nombreUsuario.textContent = `${usuarioActual.nombre} ${usuarioActual.apellido}`
    emailUsuario.textContent = usuarioActual.email
    inicialesUsuario.textContent = `${usuarioActual.nombre.charAt(0)}${usuarioActual.apellido.charAt(0)}`
  } else {
    botonesAutenticacion.style.display = "block"
    menuUsuario.style.display = "none"
  }
}

function cerrarSesion() {
  usuarioActual = null
  localStorage.removeItem("usuarioActual")
  actualizarUIAutenticacion()
  mostrarToast("Sesión cerrada correctamente", "info")
}

// Funciones de utilidad
/**
 * Realiza búsqueda en tiempo real de profesores
 * Filtra por nombre, materias y facultad
 */
function realizarBusqueda() {
  const campoBusqueda = document.getElementById("searchInput")
  const resultadosBusqueda = document.getElementById("searchResults")

  if (!campoBusqueda || !resultadosBusqueda) return

  const consulta = campoBusqueda.value.toLowerCase().trim()

  // Requerir mínimo 2 caracteres para buscar
  if (consulta.length < 2) {
    resultadosBusqueda.innerHTML = ""
    return
  }

  // Filtrar profesores según la consulta
  const resultados = datosProfesores.filter(
    (profesor) =>
      profesor.nombre.toLowerCase().includes(consulta) ||
      profesor.materias.some((materia) => materia.toLowerCase().includes(consulta)) ||
      profesor.facultad.toLowerCase().includes(consulta),
  )

  // Limpiar resultados anteriores
  resultadosBusqueda.innerHTML = ""

  if (resultados.length === 0) {
    resultadosBusqueda.innerHTML = "<p>No se encontraron profesores</p>"
    return
  }

  // Crear elementos de resultado
  resultados.forEach((profesor) => {
    const resultado = document.createElement("div")
    resultado.className = "search-result-item"
    resultado.innerHTML = `
      <h4>${profesor.nombre}</h4>
      <p>${profesor.titulo} - ${profesor.materias.join(", ")}</p>
      <div class="rating">${generarEstrellas(profesor.calificacion)} ${profesor.calificacion}</div>
    `

    // Agregar funcionalidad de clic para ver detalles
    resultado.addEventListener("click", () => {
      mostrarDetalleProfesor(profesor)
      document.getElementById("searchModal").style.display = "none"
    })

    resultadosBusqueda.appendChild(resultado)
  })
}

/**
 * Configura animaciones para las estadísticas cuando entran en vista
 * Utiliza Intersection Observer para detectar cuando los elementos son visibles
 */
function animarEstadisticas() {
  const numerosEstadisticas = document.querySelectorAll(".stat-number")

  // Crear observador para detectar cuando los elementos entran en vista
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const objetivo = Number.parseInt(entrada.target.getAttribute("data-target"))
        animarNumero(entrada.target, objetivo)
        observador.unobserve(entrada.target) // Dejar de observar después de animar
      }
    })
  })

  // Observar todos los elementos de estadísticas
  numerosEstadisticas.forEach((estadistica) => observador.observe(estadistica))
}

/**
 * Anima un número desde 0 hasta su valor objetivo
 * @param {HTMLElement} elemento - Elemento DOM que contiene el número
 * @param {number} objetivo - Valor final al que animar
 */
function animarNumero(elemento, objetivo) {
  let actual = 0
  const incremento = objetivo / 100 // Dividir en 100 pasos para animación suave
  
  const timer = setInterval(() => {
    actual += incremento
    if (actual >= objetivo) {
      actual = objetivo
      clearInterval(timer)
    }
    elemento.textContent = Math.floor(actual).toLocaleString()
  }, 20) // Actualizar cada 20ms para animación fluida
}

/**
 * Configura animaciones para las barras de gráficos cuando entran en vista
 * Anima las barras desde 0% hasta su porcentaje final
 */
function animarGraficos() {
  const barras = document.querySelectorAll(".bar, .subject-fill")

  // Crear observador para detectar cuando las barras entran en vista
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const porcentaje = entrada.target.getAttribute("data-percentage")
        entrada.target.style.width = porcentaje + "%"
        observador.unobserve(entrada.target) // Dejar de observar después de animar
      }
    })
  })

  // Observar todas las barras de gráficos
  barras.forEach((barra) => observador.observe(barra))
}

function manejarAccionMarkdown(accion, textarea, preview) {
  const inicio = textarea.selectionStart
  const fin = textarea.selectionEnd
  const valor = textarea.value

  let nuevoTexto = valor
  let nuevoInicio = inicio
  let nuevoFin = fin

  switch (accion) {
    case "bold":
      nuevoTexto = valor.slice(0, inicio) + "**" + valor.slice(inicio, fin) + "**" + valor.slice(fin)
      nuevoInicio = inicio + 2
      nuevoFin = fin + 2
      break
    case "italic":
      nuevoTexto = valor.slice(0, inicio) + "*" + valor.slice(inicio, fin) + "*" + valor.slice(fin)
      nuevoInicio = inicio + 1
      nuevoFin = fin + 1
      break
    case "heading":
      nuevoTexto = valor.slice(0, inicio) + "### " + valor.slice(inicio, fin) + valor.slice(fin)
      nuevoInicio = inicio + 4
      nuevoFin = fin + 4
      break
    case "list":
      nuevoTexto = valor.slice(0, inicio) + "- " + valor.slice(inicio, fin) + valor.slice(fin)
      nuevoInicio = inicio + 2
      nuevoFin = fin + 2
      break
    case "link":
      nuevoTexto = valor.slice(0, inicio) + "[" + valor.slice(inicio, fin) + "](url)" + valor.slice(fin)
      nuevoInicio = inicio + 1
      nuevoFin = fin + 1
      break
    case "preview":
      if (preview.style.display === "none") {
        preview.innerHTML = parsearMarkdown(textarea.value)
        preview.style.display = "block"
        textarea.style.display = "none"
      } else {
        preview.style.display = "none"
        textarea.style.display = "block"
      }
      return
  }

  textarea.value = nuevoTexto
  textarea.focus()
  textarea.setSelectionRange(nuevoInicio, nuevoFin)
}

/**
 * Convierte texto Markdown básico a HTML
 * @param {string} texto - Texto en formato Markdown
 * @returns {string} HTML generado
 */
function parsearMarkdown(texto) {
  return texto
    // Negrita: **texto** -> <strong>texto</strong>
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Cursiva: *texto* -> <em>texto</em>
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Encabezados: ### texto -> <h3>texto</h3>
    .replace(/### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/# (.*?)$/gm, "<h1>$1</h1>")
    // Listas: - texto -> <li>texto</li>
    .replace(/^- (.*?)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    // Enlaces: [texto](url) -> <a href="url">texto</a>
    .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank">$1</a>')
    // Saltos de línea: \n -> <br>
    .replace(/\n/g, "<br>")
}

function actualizarConteoPalabras() {
  const textoReview = document.getElementById("reviewText")
  let contador = document.getElementById("reviewCounter")

  if (!contador && textoReview) {
    contador = document.createElement("div")
    contador.id = "reviewCounter"
    contador.style.textAlign = "right"
    contador.style.fontSize = "0.9rem"
    contador.style.color = "#6b7280"
    contador.style.marginTop = "0.5rem"
    textoReview.parentNode.appendChild(contador)
  }

  if (contador && textoReview) {
    const palabras = textoReview.value.trim().split(/\s+/).filter(Boolean).length
    const caracteres = textoReview.value.length
    contador.textContent = `${palabras} palabras, ${caracteres} caracteres`
  }
}

function guardarBorradorReview() {
  const textoReview = document.getElementById("reviewText")
  if (textoReview) {
    localStorage.setItem("borradorReview", textoReview.value)
  }
}

function resetearCalificacionesEstrellas() {
  calificacionesActuales = {
    general: 0,
    claridad: 0,
    disponibilidad: 0,
    dificultad: 0,
  }

  const estrellasCalificacion = document.querySelectorAll(".star-rating")
  estrellasCalificacion.forEach((calificacion) => {
    const estrellas = calificacion.querySelectorAll("i")
    estrellas.forEach((estrella) => {
      estrella.classList.remove("active")
      estrella.style.color = "#e5e7eb"
    })
  })
}

/**
 * Muestra notificaciones toast en la interfaz
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación (success, error, info, warning)
 */
function mostrarToast(mensaje, tipo = "info") {
  const contenedorToast = document.getElementById("toastContainer")
  if (!contenedorToast) return

  // Crear elemento toast
  const toast = document.createElement("div")
  toast.className = `toast ${tipo}`

  // Mapear tipos a iconos correspondientes
  const iconos = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
  }

  // Generar HTML del toast
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${iconos[tipo]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-message">${mensaje}</div>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `

  contenedorToast.appendChild(toast)

  // Animación de entrada
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Eliminar automáticamente después de 5 segundos
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 5000)

  // Configurar botón de cierre manual
  const botonCerrar = toast.querySelector(".toast-close")
  botonCerrar.addEventListener("click", () => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  })
}

/**
 * Carga datos guardados en localStorage al inicializar la aplicación
 * Restaura el estado de autenticación y datos de reviews/profesores
 */
function cargarDatosGuardados() {
  // Cargar usuario autenticado si existe
  const usuarioGuardado = localStorage.getItem("usuarioActual")
  if (usuarioGuardado) {
    usuarioActual = JSON.parse(usuarioGuardado)
    actualizarUIAutenticacion()
  }

  // Cargar reviews guardadas
  const reviewsGuardadas = localStorage.getItem("reviews")
  if (reviewsGuardadas) {
    datosReviews = JSON.parse(reviewsGuardadas)
  }

  // Cargar profesores guardados
  const profesoresGuardados = localStorage.getItem("profesores")
  if (profesoresGuardados) {
    datosProfesores = JSON.parse(profesoresGuardados)
  }
}

// Funciones de clasificaciones
function renderizarClasificaciones() {
  const contenidoClasificaciones = document.getElementById("rankingsContent")
  if (!contenidoClasificaciones) return

  const datosClasificaciones = {
    general: [...datosProfesores].sort((a, b) => b.calificacion - a.calificacion).slice(0, 10),
    facultad: {
      ingenieria: datosProfesores.filter(p => p.facultad === "ingenieria").sort((a, b) => b.calificacion - a.calificacion).slice(0, 5),
      medicina: datosProfesores.filter(p => p.facultad === "medicina").sort((a, b) => b.calificacion - a.calificacion).slice(0, 5),
      derecho: datosProfesores.filter(p => p.facultad === "derecho").sort((a, b) => b.calificacion - a.calificacion).slice(0, 5),
      administracion: datosProfesores.filter(p => p.facultad === "administracion").sort((a, b) => b.calificacion - a.calificacion).slice(0, 5)
    },
    dificultad: {
      facil: datosProfesores.filter(p => p.calificacion >= 4.5).sort((a, b) => b.cantidadRevisiones - a.cantidadRevisiones).slice(0, 5),
      intermedio: datosProfesores.filter(p => p.calificacion >= 4.0 && p.calificacion < 4.5).sort((a, b) => b.cantidadRevisiones - a.cantidadRevisiones).slice(0, 5),
      dificil: datosProfesores.filter(p => p.calificacion >= 3.5 && p.calificacion < 4.0).sort((a, b) => b.cantidadRevisiones - a.cantidadRevisiones).slice(0, 5)
    },
    trending: [...datosProfesores].sort((a, b) => b.cantidadRevisiones - a.cantidadRevisiones).slice(0, 10)
  }

  // Configurar funcionalidad de pestañas
  const pestañasClasificacion = document.querySelectorAll(".ranking-tab")
  pestañasClasificacion.forEach(pestaña => {
    pestaña.addEventListener("click", () => {
      const tipoPestaña = pestaña.getAttribute("data-tab")
      
      // Eliminar clase activa de todas las pestañas
      pestañasClasificacion.forEach(t => t.classList.remove("active"))
      pestaña.classList.add("active")
      
      // Renderizar contenido apropiado
      renderizarContenidoClasificacion(tipoPestaña, datosClasificaciones)
    })
  })

  // Renderizar contenido inicial (general)
  renderizarContenidoClasificacion("general", datosClasificaciones)
}

function renderizarContenidoClasificacion(tipo, datos) {
  const contenidoClasificaciones = document.getElementById("rankingsContent")
  if (!contenidoClasificaciones) return

  let profesores = []
  let titulo = ""

  switch (tipo) {
    case "general":
      profesores = datos.general
      titulo = "Mejores Profesores UPB - General"
      break
    case "facultad":
      profesores = [...datos.facultad.ingenieria, ...datos.facultad.medicina, ...datos.facultad.derecho, ...datos.facultad.administracion].slice(0, 10)
      titulo = "Mejores por Facultad"
      break
    case "dificultad":
      profesores = [...datos.dificultad.facil, ...datos.dificultad.intermedio, ...datos.dificultad.dificil].slice(0, 10)
      titulo = "Por Nivel de Dificultad"
      break
    case "trending":
      profesores = datos.trending
      titulo = "Profesores Trending"
      break
  }

  contenidoClasificaciones.innerHTML = `
    <h3>${titulo}</h3>
    <div class="rankings-list">
      ${profesores.map((profesor, indice) => `
        <div class="ranking-item" data-professor-id="${profesor.id}">
          <div class="ranking-position">#${indice + 1}</div>
          <div class="ranking-professor">
            <img src="${profesor.imagen}" alt="${profesor.nombre}">
            <div class="ranking-info">
              <h4>${profesor.nombre}</h4>
              <p>${profesor.titulo} - ${profesor.facultad}</p>
            </div>
          </div>
          <div class="ranking-stats">
            <div class="ranking-rating">
              <div class="stars">${generarEstrellas(profesor.calificacion)}</div>
              <span>${profesor.calificacion}</span>
            </div>
            <div class="ranking-reviews">${profesor.cantidadRevisiones} reviews</div>
          </div>
        </div>
      `).join("")}
    </div>
  `

  // Añadir manejadores de clic
  const itemsClasificacion = contenidoClasificaciones.querySelectorAll(".ranking-item")
  itemsClasificacion.forEach(item => {
    item.addEventListener("click", () => {
      const idProfesor = parseInt(item.getAttribute("data-professor-id"))
      const profesor = datosProfesores.find(p => p.id === idProfesor)
      if (profesor) {
        mostrarDetalleProfesor(profesor)
      }
    })
  })
}

// Funciones de materias populares
function renderizarMateriasPopulares() {
  const gridMaterias = document.getElementById("subjectsGrid")
  if (!gridMaterias) return

  const datosMaterias = [
    {
      nombre: "Cálculo Diferencial",
      facultad: "Ingeniería",
      icono: "fas fa-calculator",
      calificacion: 4.6,
      cantidadRevisiones: 234,
      dificultad: "medium",
      descripcion: "Fundamentos matemáticos esenciales para ingenieros UPB"
    },
    {
      nombre: "Anatomía Humana",
      facultad: "Medicina",
      icono: "fas fa-heartbeat",
      calificacion: 4.8,
      cantidadRevisiones: 189,
      dificultad: "hard",
      descripcion: "Estudio de la estructura del cuerpo humano"
    },
    {
      nombre: "Programación I",
      facultad: "Ingeniería",
      icono: "fas fa-code",
      calificacion: 4.4,
      cantidadRevisiones: 156,
      dificultad: "medium",
      descripcion: "Introducción a la programación y algoritmos"
    },
    {
      nombre: "Derecho Civil",
      facultad: "Derecho",
      icono: "fas fa-balance-scale",
      calificacion: 4.5,
      cantidadRevisiones: 142,
      dificultad: "medium",
      descripcion: "Fundamentos del derecho civil colombiano"
    },
    {
      nombre: "Administración Financiera",
      facultad: "Administración",
      icono: "fas fa-chart-line",
      calificacion: 4.3,
      cantidadRevisiones: 128,
      dificultad: "easy",
      descripcion: "Gestión financiera empresarial"
    },
    {
      nombre: "Fisiología",
      facultad: "Medicina",
      icono: "fas fa-lungs",
      calificacion: 4.7,
      cantidadRevisiones: 167,
      dificultad: "hard",
      descripcion: "Funcionamiento de los sistemas corporales"
    }
  ]

  gridMaterias.innerHTML = datosMaterias.map(materia => `
    <div class="subject-card">
      <div class="subject-icon">
        <i class="${materia.icono}"></i>
      </div>
      <div class="subject-info">
        <h3>${materia.nombre}</h3>
        <p class="subject-faculty">${materia.facultad}</p>
        <p class="subject-description">${materia.descripcion}</p>
        <div class="subject-stats">
          <div class="subject-rating">
            <div class="stars">${generarEstrellas(materia.calificacion)}</div>
            <span>${materia.calificacion}</span>
          </div>
          <div class="subject-difficulty ${materia.dificultad}">
            <span>${materia.dificultad === 'easy' ? 'Fácil' : materia.dificultad === 'medium' ? 'Intermedio' : 'Difícil'}</span>
          </div>
        </div>
        <div class="subject-reviews">${materia.cantidadRevisiones} reviews</div>
      </div>
    </div>
  `).join("")

  // Añadir manejadores de clic para tarjetas de materias
  const tarjetasMaterias = gridMaterias.querySelectorAll(".subject-card")
  tarjetasMaterias.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
      const nombreMateria = tarjeta.querySelector("h3").textContent
      // Filtrar profesores por materia y mostrar resultados de búsqueda
      const profesoresRelacionados = datosProfesores.filter(p => 
        p.materias.some(materia => materia.toLowerCase().includes(nombreMateria.toLowerCase()))
      )
      if (profesoresRelacionados.length > 0) {
        mostrarToast(`Mostrando ${profesoresRelacionados.length} profesores de ${nombreMateria}`, "info")
        // Puedes implementar un modal o redirigir a resultados de búsqueda
      }
    })
  })
}

// Funciones de testimonios
function renderizarTestimonios() {
  const sliderTestimonios = document.getElementById("testimonialsSlider")
  if (!sliderTestimonios) return

  const datosTestimonios = [
    {
      nombre: "Ana María López",
      facultad: "Ingeniería",
      avatar: "AM",
      calificacion: 5,
      contenido: "EduRate UPB me ayudó a encontrar los mejores profesores para mi carrera. La comunidad es muy activa y las reviews son muy útiles.",
      fecha: "2024-01-20"
    },
    {
      nombre: "Carlos Andrés Ramírez",
      facultad: "Medicina",
      avatar: "CR",
      calificacion: 5,
      contenido: "Como estudiante de medicina, necesitaba información confiable sobre los profesores. Esta plataforma es exactamente lo que buscaba.",
      fecha: "2024-01-18"
    },
    {
      nombre: "María Fernanda Gómez",
      facultad: "Derecho",
      avatar: "MG",
      calificacion: 4,
      contenido: "Las reviews me han ayudado a tomar mejores decisiones académicas. La información es precisa y actualizada.",
      fecha: "2024-01-15"
    },
    {
      nombre: "Juan David Herrera",
      facultad: "Administración",
      avatar: "JH",
      calificacion: 5,
      contenido: "Excelente plataforma para la comunidad UPB. Las estadísticas y rankings son muy útiles para planificar mi semestre.",
      fecha: "2024-01-12"
    }
  ]

  sliderTestimonios.innerHTML = datosTestimonios.map(testimonio => `
    <div class="testimonial-card">
      <div class="testimonial-content">
        <div class="testimonial-rating">
          ${generarEstrellas(testimonio.calificacion)}
        </div>
        <p>${testimonio.contenido}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${testimonio.avatar}</div>
          <div class="testimonial-info">
            <h4>${testimonio.nombre}</h4>
            <p>${testimonio.facultad} - ${testimonio.fecha}</p>
          </div>
        </div>
      </div>
    </div>
  `).join("")

  // Añadir funcionalidad de desplazamiento automático
  let testimonioActual = 0
  const tarjetasTestimonio = sliderTestimonios.querySelectorAll(".testimonial-card")
  
  if (tarjetasTestimonio.length > 1) {
    setInterval(() => {
      tarjetasTestimonio[testimonioActual].style.display = "none"
      testimonioActual = (testimonioActual + 1) % tarjetasTestimonio.length
      tarjetasTestimonio[testimonioActual].style.display = "block"
    }, 5000)
  }
}

// Funciones de consejos académicos
function renderizarConsejosAcademicos() {
  const gridConsejos = document.getElementById("tipsGrid")
  if (!gridConsejos) return

  const datosConsejos = [
    {
      titulo: "Cómo Elegir el Profesor Correcto",
      categoria: "Selección",
      icono: "fas fa-user-check",
      consejos: [
        "Revisa las reviews más recientes",
        "Considera tu estilo de aprendizaje",
        "Verifica la disponibilidad de horarios",
        "Consulta con compañeros de tu facultad"
      ]
    },
    {
      titulo: "Preparación para el Semestre",
      categoria: "Organización",
      icono: "fas fa-calendar-alt",
      consejos: [
        "Revisa los horarios con anticipación",
        "Organiza tu agenda académica",
        "Identifica las materias más demandantes",
        "Planifica tus horarios de estudio"
      ]
    },
    {
      titulo: "Éxito en las Evaluaciones",
      categoria: "Estudio",
      icono: "fas fa-graduation-cap",
      consejos: [
        "Asiste a todas las clases",
        "Participa activamente en las discusiones",
        "Forma grupos de estudio",
        "Aprovecha los horarios de oficina"
      ]
    },
    {
      titulo: "Networking Académico",
      categoria: "Comunidad",
      icono: "fas fa-users",
      consejos: [
        "Conecta con estudiantes de tu carrera",
        "Únete a grupos de estudio",
        "Participa en eventos académicos",
        "Mantén contacto con profesores destacados"
      ]
    },
    {
      titulo: "Gestión del Tiempo",
      categoria: "Productividad",
      icono: "fas fa-clock",
      consejos: [
        "Establece rutinas de estudio",
        "Prioriza las materias más difíciles",
        "Usa técnicas de estudio efectivas",
        "Mantén un balance vida-académica"
      ]
    },
    {
      titulo: "Recursos UPB",
      categoria: "Institucional",
      icono: "fas fa-university",
      consejos: [
        "Aprovecha la biblioteca universitaria",
        "Usa los laboratorios disponibles",
        "Consulta los servicios de bienestar",
        "Participa en actividades extracurriculares"
      ]
    }
  ]

  gridConsejos.innerHTML = datosConsejos.map(consejo => `
    <div class="tip-card">
      <div class="tip-header">
        <div class="tip-icon">
          <i class="${consejo.icono}"></i>
        </div>
        <div class="tip-title">
          <h3>${consejo.titulo}</h3>
          <span class="tip-category">${consejo.categoria}</span>
        </div>
      </div>
      <ul class="tip-list">
        ${consejo.consejos.map(consejoItem => `<li>${consejoItem}</li>`).join("")}
      </ul>
    </div>
  `).join("")

  // Añadir efectos de hover y interacciones
  const tarjetasConsejo = gridConsejos.querySelectorAll(".tip-card")
  tarjetasConsejo.forEach(tarjeta => {
    tarjeta.addEventListener("mouseenter", () => {
      tarjeta.style.transform = "translateY(-5px)"
    })
    
    tarjeta.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "translateY(0)"
    })
  })
}

// Funciones de widget meteorológico
function actualizarWidgetMeteorologico() {
  const widgetMeteorologico = document.getElementById("weatherWidget")
  const contadorOnline = document.getElementById("onlineCount")
  
  if (!widgetMeteorologico || !contadorOnline) return

  // Simular datos meteorológicos en tiempo real para Medellín
  const condicionesMeteorologicas = [
    { temperatura: 24, condicion: "Soleado", icono: "fas fa-sun" },
    { temperatura: 22, condicion: "Parcialmente nublado", icono: "fas fa-cloud-sun" },
    { temperatura: 20, condicion: "Lluvia ligera", icono: "fas fa-cloud-rain" },
    { temperatura: 26, condicion: "Soleado", icono: "fas fa-sun" }
  ]
  
  const condicionActual = condicionesMeteorologicas[Math.floor(Math.random() * condicionesMeteorologicas.length)]
  
  // Actualizar información meteorológica
  const temperatura = widgetMeteorologico.querySelector(".temperature")
  const condicion = widgetMeteorologico.querySelector(".condition")
  
  if (temperatura) temperatura.textContent = `${condicionActual.temperatura}°C`
  if (condicion) {
    condicion.innerHTML = `<i class="${condicionActual.icono}"></i><span>${condicionActual.condicion}</span>`
  }
  
  // Actualizar conteo de usuarios en línea con números realistas
  const baseOnline = 1247
  const variacion = Math.floor(Math.random() * 50) - 25
  const onlineActual = baseOnline + variacion
  
  if (contadorOnline) {
    contadorOnline.textContent = `${onlineActual.toLocaleString()} estudiantes conectados`
  }
}

// Sistema de logros
function mostrarToastLogro() {
  const toastLogro = document.getElementById("achievementToast")
  const descripcionLogro = document.getElementById("achievementDescription")
  
  if (!toastLogro || !descripcionLogro) return
  
  const logros = [
    "¡Primera review publicada!",
    "¡Ayudaste a 10 estudiantes!",
    "¡Completaste tu perfil UPB!",
    "¡Llegaste a 5 reviews!",
    "¡Eres un miembro activo de la comunidad!"
  ]
  
  const logroAleatorio = logros[Math.floor(Math.random() * logros.length)]
  descripcionLogro.textContent = logroAleatorio
  
  toastLogro.classList.add("show")
  
  setTimeout(() => {
    toastLogro.classList.remove("show")
  }, 4000)
}

/**
 * Inicialización final de la aplicación cuando el DOM esté completamente cargado
 * Configura funcionalidades adicionales como widget meteorológico y logros
 */
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos guardados previamente
  cargarDatosGuardados()
  
  // Configurar widget meteorológico con actualización automática
  actualizarWidgetMeteorologico()
  setInterval(actualizarWidgetMeteorologico, 30000) // Actualizar cada 30 segundos
  
  // Mostrar toast de logro después de 5 segundos
  setTimeout(mostrarToastLogro, 5000)
})

