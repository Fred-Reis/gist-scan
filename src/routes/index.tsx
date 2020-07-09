import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import QRcodeScan from '../pages/QRcodeScan';
import GistPage from '../pages/GistPage';

const Route = createStackNavigator();

const Routes: React.FC = () => (
  <Route.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#202020' },
    }}
  >
    <Route.Screen name="Home" component={Home} />
    <Route.Screen name="QRcodeScan" component={QRcodeScan} />
    <Route.Screen name="GistPage" component={GistPage} />
  </Route.Navigator>
);

export default Routes;
