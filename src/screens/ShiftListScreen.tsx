import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { shiftStore } from '../stores';
import ShiftCard from '../components/ShiftCard';
import { Shift } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftList'>;

const ShiftListScreen: React.FC<Props> = observer(({ navigation }) => {
  const loadShifts = useCallback(async () => {
    try {
      await shiftStore.loadShifts();
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Не удалось загрузить список смен. Проверьте подключение к интернету и разрешения на геолокацию.',
        [{ text: 'OK' }]
      );
    }
  }, []);

  useEffect(() => {
    // Загружаем смены при первом открытии экрана
    loadShifts();
  }, [loadShifts]);

  const handleShiftPress = (shift: Shift) => {
    shiftStore.selectShift(shift);
    navigation.navigate('ShiftDetail', { shift });
  };

  const renderShiftCard = ({ item }: { item: Shift }) => (
    <ShiftCard
      shift={item}
      onPress={() => handleShiftPress(item)}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {shiftStore.error
          ? 'Произошла ошибка при загрузке смен'
          : 'Смены не найдены'
        }
      </Text>
      {shiftStore.error && (
        <Text style={styles.errorText}>
          {shiftStore.error}
        </Text>
      )}
    </View>
  );

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.loadingText}>Загрузка смен...</Text>
    </View>
  );

  if (shiftStore.isLoading && shiftStore.shifts.length === 0) {
    return renderLoadingIndicator();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shiftStore.shifts}
        renderItem={renderShiftCard}
        keyExtractor={(item) => item.id || item.companyName + item.dateStartByCity}
        refreshControl={
          <RefreshControl
            refreshing={shiftStore.isLoading}
            onRefresh={loadShifts}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={
          shiftStore.shifts.length === 0 ? styles.emptyListContent : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#f44336',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ShiftListScreen;
