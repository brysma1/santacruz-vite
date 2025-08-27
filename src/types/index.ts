// Tipos para el proyecto EduRate UPB

export interface Professor {
  id: number;
  nombre: string;
  titulo: string;
  universidad: string;
  facultad: string;
  materia: string;
  materias: string[];
  calificacion: number;
  cantidadRevisiones: number;
  imagen: string;
  insignia: string;
  descripcion: string;
  email: string;
  oficina: string;
  horario: string;
  dificultad: 'easy' | 'medium' | 'hard';
  promedioCalificacion: number;
  semestres: string[];
}

export interface Review {
  id: number;
  profesorId: number;
  estudianteId: number;
  calificacionGeneral: number;
  claridad: number;
  disponibilidad: number;
  dificultad: number;
  texto: string;
  semestre: string;
  nota: number;
  anonimo: boolean;
  fecha: Date;
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  codigoEstudiante: string;
  facultad: string;
  contraseña: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface SearchFilters {
  facultad: string;
  materia: string;
  calificacion: string;
  dificultad: string;
  semestre: string;
}

export interface Stats {
  profesores: number;
  reviews: number;
  facultades: number;
  estudiantes: number;
}

export type Faculty = 
  | 'ingenieria'
  | 'medicina'
  | 'derecho'
  | 'administracion'
  | 'comunicacion'
  | 'psicologia'
  | 'arquitectura'
  | 'enfermeria'
  | 'trabajo-social'
  | 'teologia'
  | 'filosofia'
  | 'educacion';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ModalState {
  login: boolean;
  register: boolean;
  search: boolean;
  review: boolean;
  professor: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
} 