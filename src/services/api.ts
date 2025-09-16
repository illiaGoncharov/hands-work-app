import { Shift, Location } from '../types';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export class ApiService {
  /**
   * Получение списка смен по координатам
   */
  static async getShifts(location: Location): Promise<Shift[]> {
    try {
      const url = `${API_BASE_URL}/shift?lat=${location.latitude}&lng=${location.longitude}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Добавляем уникальные ID если их нет
      if (Array.isArray(data)) {
        return data.map((shift: Shift, index: number) => ({
          ...shift,
          id: shift.id || `shift_${index}_${Date.now()}`,
        }));
      }

      return [];
    } catch (error) {
      console.error('Ошибка при получении смен:', error);
      throw error;
    }
  }
}
