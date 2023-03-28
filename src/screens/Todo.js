import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from "react-native";
import React, { useState } from "react";

import form from "../styles/form";
import ErrorMessage from "../components/ErrorMessage";
import { MaterialIcons } from "@expo/vector-icons";
import Task from "../components/Task";

const data = [
  { id: 1, task: "Social app", completed: false },
  { id: 2, task: "Social app1", completed: false },
  { id: 3, task: "Social app2", completed: true },
];



const Todo = ({ route }) => {
    
    const [activeButton, setActiveButton] = useState(1);
    
    const all = () => {
        setActiveButton(1);
    }
    
    const completed = () => {
        setActiveButton(2);
        // return data.filter((item) => item.completed);
    }

  return (
    <View style={styles.screen}>
      <View style={[form.mainC, styles.add]}>
        <TextInput
          name="todo"
          style={[form.input, { flex: 1, marginRight: 5 }]}
          placeholder="Add your task"
          onChangeText={(val) => console.log(val)}
        />
        <MaterialIcons
          name="add-circle"
          size={45}
          color="#F80053"
          onPress={() => console.log(route.params?.token)}
        />
        {/* <ErrorMessage error={} visible={false} /> */}
      </View>
      <View style={styles.listParent}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Task task={item.task} completed={item.completed} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.footerbtn, {backgroundColor: activeButton == 1 ? '#F80053' : '#fff'}]} onPress={all}>
            <Text style={[styles.footertext, {color: activeButton == 1 ? '#fff' : '#F80053'}]}>All</Text>
        </Pressable>
        <Pressable style={[styles.footerbtn, {backgroundColor: activeButton == 2 ? '#F80053' : '#fff'}]} onPress={completed}>
            <Text style={[styles.footertext, {color: activeButton == 2 ? '#fff' : '#F80053'}]}>Completed</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },
  add: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "80%",
  },
  listParent: {
    width: "100%",
    // backgroundColor: "blue",
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
footerbtn: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 10,
    width: '40%',
    borderWidth: 2,
    borderColor: '#F80053',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footertext: {
    color: '#F80053',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
