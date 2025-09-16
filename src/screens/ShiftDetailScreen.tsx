import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftDetail'>;

const ShiftDetailScreen: React.FC<Props> = ({ route }) => {
  const { shift } = route.params;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatRating = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const getWorkersStatusColor = () => {
    if (shift.currentWorkers >= shift.planWorkers) {
      return '#f44336'; // Красный - набор закрыт
    } else if (shift.currentWorkers / shift.planWorkers > 0.8) {
      return '#ff9800'; // Оранжевый - почти набрано
    }
    return '#4CAF50'; // Зеленый - есть места
  };

  const getWorkersStatusText = () => {
    if (shift.currentWorkers >= shift.planWorkers) {
      return 'Набор закрыт';
    } else if (shift.currentWorkers / shift.planWorkers > 0.8) {
      return 'Остается мало мест';
    }
    return 'Набор открыт';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Заголовок с логотипом */}
      <View style={styles.header}>
        <Image
          source={{ uri: shift.logo || 'https://via.placeholder.com/80' }}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {formatRating(shift.customerRating)}
            </Text>
            <Text style={styles.reviewsCount}>
              ({shift.customerFeedbacksCount} отзывов)
            </Text>
          </View>
        </View>
      </View>

      {/* Тип работы */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Тип работы</Text>
        <Text style={styles.workType}>{shift.workTypes}</Text>
      </View>

      {/* Адрес */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Адрес</Text>
        <Text style={styles.address}>{shift.address}</Text>
      </View>

      {/* Дата и время */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Дата и время</Text>
        <Text style={styles.date}>{formatDate(shift.dateStartByCity)}</Text>
        <Text style={styles.time}>
          с {shift.timeStartByCity} до {shift.timeEndByCity}
        </Text>
      </View>

      {/* Оплата */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Оплата</Text>
        <Text style={styles.price}>
          {shift.priceWorker.toLocaleString('ru-RU')} ₽
        </Text>
        <Text style={styles.priceNote}>за смену</Text>
      </View>

      {/* Информация о наборе */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Набор сотрудников</Text>
        <View style={styles.workersContainer}>
          <View style={styles.workersInfo}>
            <Text style={styles.workersNumbers}>
              {shift.currentWorkers} из {shift.planWorkers} человек
            </Text>
            <Text
              style={[
                styles.workersStatus,
                { color: getWorkersStatusColor() }
              ]}
            >
              {getWorkersStatusText()}
            </Text>
          </View>

          {/* Индикатор заполненности */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((shift.currentWorkers / shift.planWorkers) * 100, 100)}%`,
                    backgroundColor: getWorkersStatusColor(),
                  }
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Дополнительная информация */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>О компании</Text>
        <Text style={styles.companyInfo}>
          Рейтинг: {shift.customerRating.toFixed(1)}/5.0 на основе {shift.customerFeedbacksCount} отзывов
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#FFB300',
    marginRight: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12,
  },
  lastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  workType: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2196F3',
    lineHeight: 24,
  },
  address: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 14,
    color: '#666',
  },
  workersContainer: {
    marginTop: 8,
  },
  workersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workersNumbers: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  workersStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  companyInfo: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ShiftDetailScreen;
