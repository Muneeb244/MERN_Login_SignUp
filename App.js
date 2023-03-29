import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StartNavigation from './src/navigation/StartNavigation';
import Verification from './src/screens/Verification';
import Todo from './src/screens/Todo';

export default function App() {
  return (
    <NavigationContainer>
      <StartNavigation />
    </NavigationContainer>
    // <Todo />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 42,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
