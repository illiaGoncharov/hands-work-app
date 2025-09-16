import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Shift } from '../types';
// Импорты экранов (пока создадим заглушки)
import ShiftListScreen from '../screens/ShiftListScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';

// Типы для навигации
export type RootStackParamList = {
  ShiftList: undefined;
  ShiftDetail: { shift: Shift };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShiftList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ShiftList"
          component={ShiftListScreen}
          options={{ title: 'Доступные смены' }}
        />
        <Stack.Screen
          name="ShiftDetail"
          component={ShiftDetailScreen}
          options={{ title: 'Детали смены' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
