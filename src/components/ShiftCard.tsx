import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Shift } from '../types';

interface ShiftCardProps {
  shift: Shift;
  onPress: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onPress }) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatRating = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Логотип компании */}
      <View style={styles.header}>
        <Image
          source={{ uri: shift.logo || 'https://via.placeholder.com/50' }}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName} numberOfLines={1}>
            {shift.companyName}
          </Text>
          <Text style={styles.rating}>
            {formatRating(shift.customerRating)} ({shift.customerFeedbacksCount})
          </Text>
        </View>
      </View>

      {/* Основная информация */}
      <Text style={styles.workType} numberOfLines={2}>
        {shift.workTypes}
      </Text>
      
      <Text style={styles.address} numberOfLines={2}>
        📍 {shift.address}
      </Text>

      {/* Время и дата */}
      <View style={styles.timeContainer}>
        <Text style={styles.date}>
          📅 {formatDate(shift.dateStartByCity)}
        </Text>
        <Text style={styles.time}>
          🕐 {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>

      {/* Нижняя секция */}
      <View style={styles.footer}>
        <View style={styles.workersInfo}>
          <Text style={styles.workers}>
            👥 {shift.currentWorkers}/{shift.planWorkers}
          </Text>
        </View>
        <Text style={styles.price}>
          {shift.priceWorker.toLocaleString('ru-RU')} ₽
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  workType: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2196F3',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  timeContainer: {
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workersInfo: {
    flex: 1,
  },
  workers: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export default ShiftCard;
