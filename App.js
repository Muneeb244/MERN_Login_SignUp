import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import Signin from './src/screens/Signin';
import SignUp from './src/screens/Signup';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Welcome /> */}
      {/* <Signin /> */}
      <SignUp />
    </View>
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
