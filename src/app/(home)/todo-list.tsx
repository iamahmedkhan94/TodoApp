import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  ListRenderItem,
} from "react-native";
import { getTodos, deleteTodo, updateTodo } from "../../api/todo";
import { useRouter } from "expo-router";
import CustomButton from "@/src/components/CustomButton";
import TodoItem from "./components/TodoItem";
import { Todo } from "@/src/types/todo";
import CustomLoader from "@/src/components/CustomLoader";

const TodoListScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch Todos
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Todo
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      Alert.alert("Error", "Failed to delete todo");
    }
  };

  // Toggle Todo Completion
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id, !completed);
      fetchTodos();
    } catch (error) {
      Alert.alert("Error", "Failed to update todo");
    }
  };

  // Fetch Todos on Component Mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Render Item Function
  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <TodoItem
      item={item}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDelete}
    />
  );
  if (isLoading) return <CustomLoader />;
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        initialNumToRender={10} // Renders only 10 items initially
        maxToRenderPerBatch={10} // Renders 10 more items per batch
        windowSize={5} // Keeps 5 screens worth of items in memory
        getItemLayout={(_, index) => ({
          length: 70, // Fixed height of the item
          offset: 70 * index,
          index,
        })}
        ListEmptyComponent={
          isLoading ? null : (
            <Text style={styles.emptyList}>No todos found. Add one!</Text>
          )
        }
      />
      <CustomButton title="Add Todo" onPress={() => router.push("/add-todo")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 70, // Fixed height for getItemLayout optimization
  },
  todoText: { flex: 1, fontSize: 16 },
  deleteButton: { backgroundColor: "red", marginLeft: 5 },
  emptyList: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
});

export default TodoListScreen;
