import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Platform,
  FlatList,
} from "react-native";

import GoalItem from "./components/GoalItem";
import Input from "./components/Input";

export default function App() {
  const [courseGoals, setcourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const addGoalHandler = (goalTitle) => {
    if(goalTitle.length === 0) {
      return alert('Please Enter Your Goal');
    }
    setcourseGoals((prevState) => [
      ...prevState,
      { key: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  const removeGoalHandler = (goalId) => {
    setcourseGoals((prevState) => {
      return prevState.filter((goal) => goal.key !== goalId);
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
        <Input visible={isAddMode} closeModal={cancelGoalAdditionHandler} onAddGoal={addGoalHandler} />
        {/* flatList for very long list in which case we dont know how long list is. */}
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.key}
              onDelete={removeGoalHandler}
              title={itemData.item.value}
            />
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: Platform.OS === "ios" ? 0 : 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
});
