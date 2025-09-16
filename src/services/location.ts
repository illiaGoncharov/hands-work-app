import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { Location } from '../types';

export class LocationService {
  /**
   * Запрос разрешений на геолокацию для Android
   */
  static async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Разрешение на геолокацию',
            message: 'Приложению нужен доступ к вашему местоположению для поиска смен',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Отмена',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Ошибка запроса разрешений:', err);
        return false;
      }
    }
    return true; // iOS разрешения обрабатываются автоматически
  }

  /**
   * Получение текущей геолокации
   */
  static async getCurrentLocation(): Promise<Location> {
    const hasPermission = await this.requestLocationPermission();
    
    if (!hasPermission) {
      throw new Error('Нет разрешения на доступ к геолокации');
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Ошибка геолокации:', error);
          reject(new Error('Не удалось получить местоположение'));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }
}
