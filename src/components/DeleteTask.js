import { StyleSheet, Text, View, TOuch, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteTask = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <MaterialIcons name="delete" size={30} color="red"/>
    </Pressable>
  );
};

export default DeleteTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
