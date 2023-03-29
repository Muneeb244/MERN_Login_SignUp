import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import form from "../styles/form";
import ErrorMessage from "../components/ErrorMessage";
import { MaterialIcons } from "@expo/vector-icons";
import Task from "../components/Task";

const info = [
  { id: 1, task: "Social app", completed: true },
  { id: 2, task: "Social app1", completed: false },
  { id: 3, task: "Social app2", completed: true },
];

const Todo = ({ route }) => {
  const [input, setInput] = useState("");
  const [activeButton, setActiveButton] = useState(1);
  const [data, setData] = useState([]);

  const getTodo = () => {
    fetch("http://192.168.0.128:3000/todo", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token }),
    })
      .then((res) => res.json())
      .then((tData) => {
        setData(tData);
      })
      .catch((e) => console.log("Error", e));
  };

  const sendToBackend = () => {
    fetch("http://192.168.0.128:3000/todo/add", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token, todo: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data) {
          setData(data);
          setInput("");
        }
      })
      .catch((e) => console.log("Error", e));
  };

  useEffect(() => {
    getTodo();
  }, []);

  const all = () => {
    setActiveButton(1);
    return getTodo();
  };

  const completed = () => {
    setActiveButton(2);
    return setData(data.filter((item) => item.completed));
  };

  return (
    <View style={styles.screen}>
      <View style={[form.mainC, styles.add]}>
        <TextInput
          name="todo"
          style={[form.input, { flex: 1, marginRight: 5 }]}
          placeholder="Add your task"
          onChangeText={setInput}
        />
        <MaterialIcons
          name="add-circle"
          size={45}
          color="#F80053"
          onPress={() => {
            // data.push({ id: data.length + 1, task: input, completed: false });
            // setData(data);
            // console.log(data);
            sendToBackend();
          }}
        />
        {/* <ErrorMessage error={} visible={false} /> */}
      </View>
      <View style={styles.listParent}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Task task={item.todo} completed={item.completed} />
          )}
          keyExtractor={(item) => item._id}
          style={styles.list}
        />
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.footerbtn,
            { backgroundColor: activeButton == 1 ? "#F80053" : "#fff" },
          ]}
          onPress={all}
        >
          <Text
            style={[
              styles.footertext,
              { color: activeButton == 1 ? "#fff" : "#F80053" },
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.footerbtn,
            { backgroundColor: activeButton == 2 ? "#F80053" : "#fff" },
          ]}
          onPress={completed}
        >
          <Text
            style={[
              styles.footertext,
              { color: activeButton == 2 ? "#fff" : "#F80053" },
            ]}
          >
            Completed
          </Text>
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
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerbtn: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    padding: 10,
    width: "40%",
    borderWidth: 2,
    borderColor: "#F80053",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footertext: {
    color: "#F80053",
    fontSize: 15,
    fontWeight: "bold",
  },
});
