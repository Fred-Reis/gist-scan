import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#202020" />

      <Home />
    </>
  );
};

export default App;
