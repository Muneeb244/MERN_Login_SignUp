import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Pressable
} from "react-native";
import React from "react";

import welcomeLogo from "../../assets/welcomeLogo.png";
import Buttons from "../components/Buttons";

import form from "../styles/form";

const Signup = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.login}>
          <Text style={form.header}>Create a new Account</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={form.subHeader}>Already Registered? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={form.sideText}>Login here</Text>
            </Pressable>
          </View>
          <View style={form.mainC}>
            <Text style={[form.subHeader, { fontSize: 15 }]}>Name</Text>
            <TextInput style={form.input} placeholder="name" />
          </View>

          <View style={form.mainC}>
            <Text style={[form.subHeader, { fontSize: 15 }]}>Email</Text>
            <TextInput style={form.input} placeholder="email" />
          </View>

          <View style={form.mainC}>
            <Text style={[form.subHeader, { fontSize: 15 }]}>Password</Text>
            <TextInput
              style={form.input}
              placeholder="password"
              secureTextEntry
            />
          </View>

          <View style={form.mainC}>
            <Text style={[form.subHeader, { fontSize: 15 }]}>
              Confirm Password
            </Text>
            <TextInput
              style={form.input}
              placeholder="confirm your passwprd"
              secureTextEntry
            />
          </View>

          <View style={form.mainC}>
            <Text style={[form.subHeader, { fontSize: 15 }]}>Address</Text>
            <TextInput
              style={[form.input, { height: 75 }]}
              placeholder="address"
            />

            <View
              style={{ width: "100%", padding: 10, alignItems: "flex-end" }}
            >
              <Text style={form.sideText}>Forgot password?</Text>
            </View>

            <Buttons
              title="Login"
              height="20%"
              onPress={() => console.log("Clicked")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  login: {
    paddingTop: 12,
    backgroundColor: "#fff",
    width: "100%",
    height: "95%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
  },
});
