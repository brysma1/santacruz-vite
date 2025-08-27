import { describe, it, expect } from 'vitest';

// Función de utilidad para formatear calificaciones
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} ⭐`;
}

// Función de utilidad para validar email UPB
export function isValidUPBEmail(email: string): boolean {
  const upbEmailRegex = /^[a-zA-Z0-9._%+-]+@upb\.edu\.co$/;
  return upbEmailRegex.test(email);
}

// Función de utilidad para calcular promedio
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

describe('Utils', () => {
  describe('formatRating', () => {
    it('should format rating with one decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6 ⭐');
      expect(formatRating(5.0)).toBe('5.0 ⭐');
      expect(formatRating(3.123)).toBe('3.1 ⭐');
    });
  });

  describe('isValidUPBEmail', () => {
    it('should validate correct UPB emails', () => {
      expect(isValidUPBEmail('juan.perez@upb.edu.co')).toBe(true);
      expect(isValidUPBEmail('maria.gonzalez@upb.edu.co')).toBe(true);
      expect(isValidUPBEmail('estudiante123@upb.edu.co')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidUPBEmail('juan.perez@gmail.com')).toBe(false);
      expect(isValidUPBEmail('invalid-email')).toBe(false);
      expect(isValidUPBEmail('test@upb.com')).toBe(false);
      expect(isValidUPBEmail('')).toBe(false);
    });
  });

  describe('calculateAverage', () => {
    it('should calculate average correctly', () => {
      expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
      expect(calculateAverage([4.5, 4.0, 5.0])).toBe(4.5);
      expect(calculateAverage([3.5, 4.0, 4.5])).toBe(4);
    });

    it('should return 0 for empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    it('should handle single number', () => {
      expect(calculateAverage([5])).toBe(5);
    });
  });
}); 