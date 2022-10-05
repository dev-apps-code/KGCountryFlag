import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Initial} from '../screens/authentication/initial';
import {Login} from '../screens/authentication/login';
import {Arena} from '../screens/main/arena';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Arena" component={Arena} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
