import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import SignIn from './pages/SignIn'
import Routes from './routes'

import AppProvider from './context'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
	      <View style={{ flex:1, backgroundColor: '#312e38'}}>
	        <Routes />
	      </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
