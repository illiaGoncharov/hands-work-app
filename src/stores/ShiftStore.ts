import { makeAutoObservable, runInAction } from 'mobx';
import { Shift } from '../types';
import { ApiService } from '../services/api';
import { LocationService } from '../services/location';

export class ShiftStore {
  shifts: Shift[] = [];
  selectedShift: Shift | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Загрузка смен по текущей геолокации
   */
  async loadShifts() {
    this.setLoading(true);
    this.setError(null);

    try {
      // Получаем геолокацию
      const location = await LocationService.getCurrentLocation();
      
      // Загружаем смены
      const shifts = await ApiService.getShifts(location);
      
      runInAction(() => {
        this.shifts = shifts;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Выбор смены для просмотра деталей
   */
  selectShift(shift: Shift) {
    this.selectedShift = shift;
  }

  /**
   * Очистка выбранной смены
   */
  clearSelectedShift() {
    this.selectedShift = null;
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  private setError(error: string | null) {
    this.error = error;
  }

  /**
   * Повторная загрузка смен
   */
  async refresh() {
    await this.loadShifts();
  }
}
