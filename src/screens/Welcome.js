import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import welcomeLogo from "../../assets/welcomeLogo.png";
import Buttons from "../components/Buttons";

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image style={styles.image} source={welcomeLogo} />
        <View style={styles.buttongrp}>
          <Buttons title="Login" height='25%' onPress={() => navigation.navigate('Login')}/>
          <Buttons title="Sign up" height='25%' onPress={() => navigation.navigate('SignUp')} />
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  buttongrp: {
    padding: 20,
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-evenly",
    },
});
