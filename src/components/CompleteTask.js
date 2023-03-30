import { StyleSheet, Text, View, TOuch, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const CompleteTask = ({ onPress, completed }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <MaterialIcons name="check-circle" size={30} color={completed ? '#F80053' : "#C7D0E1"} />
    </Pressable>
  );
};

export default CompleteTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
  }
});
