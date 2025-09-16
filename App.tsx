/**
 * HandsWork App - React Native приложение для поиска подработки
 * 
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2196F3"
      />
      <AppNavigator />
    </>
  );
};

export default App;