import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../screens/Signin';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

const StartNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {
        backgroundColor: 'black',
        color: '#fff'
    }, headerTintColor: '#fff'}}>

        <Stack.Screen name="Welcome" component={Welcome} options={{
        headerShown: false
      }} />
        <Stack.Screen name="Login" component={SignIn} />
        <Stack.Screen name="SignUp" component={Signup} />

    </Stack.Navigator>
  )
}

export default StartNavigation

const styles = StyleSheet.create({})