import API from "./axios";
import { Todo } from "../types/todo";
import { APIError } from "../types/api";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await API.get("/todos");
    return response.data;
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Failed to fetch todos");
  }
};

export const addTodo = async (title: string): Promise<Todo> => {
  try {
    const response = await API.post("/todos", { title });
    return response.data;
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Failed to add todo");
  }
};

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  try {
    const response = await API.put(`/todos/${id}`, { completed });
    return response.data;
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Failed to update todo");
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await API.delete(`/todos/${id}`);
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Failed to delete todo");
  }
};
