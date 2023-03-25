import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import Buttons from "../components/Buttons";
import { Formik } from "formik";
import * as yup from "yup";

import form from "../styles/form";
import ErrorMessage from "../components/ErrorMessage";


const Signup = ({ navigation }) => {
  const sendToBackend = (values, { resetForm }) => {
    if (values.password !== values.confirmPassword)
      return alert("Passwords do not match");
  
    fetch("http://192.168.0.128:3000/auth/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          resetForm();
          alert("Account created successfully");
          return navigation.navigate("Login");
        } else return alert(data);
      })
      .catch((err) => console.log(err));
  };
  
  const signupSchema = yup.object({
    name: yup.string().required().min(4).label("name"),
    email: yup.string().required().email().label("email"),
    password: yup.string().required().min(6).label("password"),
    confirmPassword: yup.string().required().min(6).label("confirmPassword"),
    address: yup.string().required().min(15).label("address"),
  });

  return (
    <Formik
      validationSchema={signupSchema}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
      }}
      onSubmit={sendToBackend}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <View style={styles.login}>
                <Text style={form.header}>Create a new Account</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={form.subHeader}>Already Registered? </Text>
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={form.sideText}>Login here</Text>
                  </Pressable>
                </View>
                <View style={form.mainC}>
                  <Text style={[form.subHeader, { fontSize: 15 }]}>Name</Text>
                  <TextInput
                    name="name"
                    style={form.input}
                    placeholder="name"
                    onChangeText={handleChange("name")}
                    value={values.name}
                    onBlur={handleBlur("name")}
                  />
                  <ErrorMessage
                    error={errors["name"]}
                    visible={touched["name"]}
                  />
                </View>

                <View style={form.mainC}>
                  <Text style={[form.subHeader, { fontSize: 15 }]}>Email</Text>
                  <TextInput
                    name="email"
                    style={form.input}
                    placeholder="email"
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  <ErrorMessage
                    error={errors["email"]}
                    visible={touched["email"]}
                  />
                </View>

                <View style={form.mainC}>
                  <Text style={[form.subHeader, { fontSize: 15 }]}>
                    Password
                  </Text>
                  <TextInput
                    name="password"
                    style={form.input}
                    placeholder="password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  <ErrorMessage
                    error={errors["password"]}
                    visible={touched["password"]}
                  />
                </View>

                <View style={form.mainC}>
                  <Text style={[form.subHeader, { fontSize: 15 }]}>
                    Confirm Password
                  </Text>
                  <TextInput
                    style={form.input}
                    placeholder="confirm your password"
                    secureTextEntry
                    onBlur={handleBlur("confirmPassword")}
                    onChangeText={handleChange("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  <ErrorMessage
                    error={errors["password"]}
                    visible={touched["password"]}
                  />
                </View>

                <View style={form.mainC}>
                  <Text style={[form.subHeader, { fontSize: 15 }]}>
                    Address
                  </Text>
                  <TextInput
                    name="address"
                    style={[form.input, { height: 75 }]}
                    placeholder="address"
                    onChangeText={handleChange("address")}
                    value={values.address}
                    onBlur={handleBlur("address")}
                  />
                  <ErrorMessage
                    error={errors["address"]}
                    visible={touched["address"]}
                  />
                  <View
                    style={{
                      width: "100%",
                      padding: 10,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={form.sideText}>Forgot password?</Text>
                  </View>

                  <Buttons title="Login" height="20%" onPress={handleSubmit} />
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
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
