import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import CustomButton from "@/src/components/CustomButton";
import { TodoItemProps } from "@/src/types/todo";


// Memoized TodoItem Component
const TodoItem: React.FC<TodoItemProps> = memo(({ item, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.todoItem}>
      <Text
        style={[
          styles.todoText,
          item.completed && { textDecorationLine: "line-through" },
        ]}
      >
        {item.title}
      </Text>
      <CustomButton
        title="Toggle"
        onPress={() => onToggleComplete(item._id, item.completed)}
      />
      <CustomButton
        title="Delete"
        onPress={() => onDelete(item._id)}
        style={styles.deleteButton}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 70, // Fixed height for getItemLayout optimization
  },
  todoText: { flex: 1, fontSize: 16 },
  deleteButton: { backgroundColor: "red", marginLeft: 5 },
});

export default TodoItem;
