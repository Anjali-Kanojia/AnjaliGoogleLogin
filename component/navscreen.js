import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './home';
import Login from './login';
import VideoRecorder from './video';

const Stack = createNativeStackNavigator();

function Navscreen() {

const [isLoggedIn,setIsLoggedIn]=useState()

  return (
    <NavigationContainer>
      <Stack.Navigator >  
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VideoRecorder" component={VideoRecorder} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navscreen;
