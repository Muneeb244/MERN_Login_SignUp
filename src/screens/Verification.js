import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import welcomeLogo from "../../assets/welcomeLogo.png";
import Buttons from "../components/Buttons";

import form from "../styles/form";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorMessage from "../components/ErrorMessage";

const Verification = ({ navigation, route }) => {

  const [error , setError] = useState(false)

  const sendToBackend = (values, { resetForm }) => {
    if (values.code == route.params?.user.verificationCode) {
      setError(false)
      delete route.params.user["verificationCode"];
      fetch("http://192.168.0.128:3000/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(route.params?.user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            resetForm();
            return alert("Signup successful");
          } else return alert(data);
        })
        .catch((err) => console.log(err));
    } else setError(true)
  };

  const signinSchema = yup.object({
    code: yup.number().required().typeError("Code must be a number").min(6),
  });

  return (
    <Formik
      initialValues={{ code: "" }}
      onSubmit={sendToBackend}
      validationSchema={signinSchema}
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
          {
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Image style={styles.image} source={welcomeLogo} />
                <View style={styles.login}>
                  <Text style={form.header}>Verification</Text>
                  <Text
                    style={[
                      form.verify,
                      {
                        backgroundColor: "#000",
                        color: "#fff",
                        borderWidth: 0,
                        marginVertical: 8,
                      },
                    ]}
                  >
                    Verification code has been sent to your email
                  </Text>

                  <View style={form.mainC}>
                    <TextInput
                      name="code"
                      style={form.input}
                      placeholder="Enter your code"
                      secureTextEntry
                      onChangeText={handleChange("code")}
                      value={values.password}
                      onBlur={handleBlur("code")}
                    />
                    <ErrorMessage
                      error={errors["code"] || "Invalid code"}
                      visible={touched["code"] || error}
                    />
                    <View
                      style={{
                        width: "100%",
                        padding: 10,
                        alignItems: "flex-end",
                      }}
                    >
                      <Pressable onPress={() => console.log("reseding code")}>
                        <Text style={form.verify}>Resend code</Text>
                      </Pressable>
                    </View>
                    <Buttons
                      title="Submit"
                      height="22%"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </View>
            </View>
          }
        </>
      )}
    </Formik>
  );
};

export default Verification;

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
  image: {
    position: "absolute",
    top: 100,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  login: {
    paddingTop: 7,
    backgroundColor: "#fff",
    width: "100%",
    height: "45%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
  },
});
