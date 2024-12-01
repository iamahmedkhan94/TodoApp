import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { addTodo } from "../../api/todo";
import { useRouter } from "expo-router";
import CustomButton from "@/src/components/CustomButton";
import CustomTextInput from "@/src/components/CustomTextInput";
import { APIError } from "@/src/types/api";

const AddTodoScreen = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Use the router instance for navigation

  const handleAddTodo = async () => {
    setIsLoading(true)
    if (!title.trim()) {
      Alert.alert("Validation Error", "Todo title cannot be empty.");
      return;
    }
    try {
      await addTodo(title);
      Alert.alert("Success", "Todo added successfully!");
      setTitle(""); // Clear the input field
      router.push('/todo-list'); // Navigate back to the TodoListScreen
    } catch (error: unknown) {
      const err = error as APIError;
      Alert.alert("Error", err.message || "Failed to add todo.");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomTextInput
        style={styles.input}
        placeholder="Enter Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <CustomButton title="Add Todo" onPress={handleAddTodo} loading={isLoading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default AddTodoScreen;
