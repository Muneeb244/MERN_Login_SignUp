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
import CompleteTask from "../components/CompleteTask";
import DeleteTask from "../components/DeleteTask";

// const info = [
//   { id: 1, task: "Social app", completed: true },
//   { id: 2, task: "Social app1", completed: false },
//   { id: 3, task: "Social app2", completed: true },
// ];

const Todo = ({ route }) => {
  const [input, setInput] = useState("");
  const [activeButton, setActiveButton] = useState(1);
  const [complete, setComplete] = useState([]);
  const [allT, setallT] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getTodo = () => {
    console.log("gettodo called");
    fetch("http://192.168.0.128:3000/todo", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token }),
    })
      .then((res) => res.json())
      .then((tData) => {
        if (typeof tData == "string") return alert(tData);
        setallT(tData);
        setComplete(tData.filter((item) => item.completed));
        // console.log(data, allT, complete, "here")
      })
      .catch((e) => console.log("Error", e));
  };

  const sendToBackend = () => {
    if (!input) return alert("Please enter a task");
    fetch("http://192.168.0.128:3000/todo/add", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token, todo: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == "string") return alert(data);
        if (data) {
          setallT(data);
          setComplete(data.filter((item) => item.completed));
          return alert("Task added successfully");
          // setInput("");
        }
      })
      .catch((e) => console.log("Error", e));
  };

  const completeTask = (task) => {
    if (!task) return alert("Something went wrong");

    setRefreshing(true);

    fetch("http://192.168.0.128:3000/todo/completed", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token, todo: task }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == "string") return alert(data);
        getTodo();
      })
      .catch((e) => console.log(e));
    setRefreshing(false);
  };


  const deleteTask = (task) => {
    setRefreshing(true);
    if (!task) return alert("Something went wrong");
    fetch("http://192.168.0.128:3000/todo/delete", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ token: route.params.token, todo: task }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == "string") return alert(data);
        getTodo();
      })
      .catch((e) => console.log(e));
    setRefreshing(false);
  };


  useEffect(() => {
    if (allT.length == 0) getTodo();
  }, []);

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
            console.log("pressed")
            sendToBackend();
          }}
        />
      </View>
      <View style={styles.listParent}>
        {allT.length == 0 && (
          <Text style={{ color: "#fff" }}>No Todos available to show</Text>
        )}
        {allT.length > 0 && (
          <FlatList
            data={activeButton == 1 ? allT : complete}
            renderItem={({ item }) => (
              <Task
                task={item.todo}
                completed={item.completed}
                renderRightActions={() => (
                  <CompleteTask
                    onPress={() => completeTask(item.todo)}
                    completed={item.completed}
                  />
                )}
                renderLeftActions={() => (
                  <DeleteTask onPress={() => deleteTask(item.todo)} />
                )}
              />
            )}
            keyExtractor={(item) => item._id}
            style={styles.list}
            refreshing={refreshing}
            onRefresh={() => getTodo()}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.footerbtn,
            { backgroundColor: activeButton == 1 ? "#F80053" : "#fff" },
          ]}
          onPress={() => setActiveButton(1)}
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
          onPress={() => setActiveButton(2)}
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
