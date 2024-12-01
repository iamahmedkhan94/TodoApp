import { APIError, SessionResponse } from "../types/api";
import API from "./axios";

export const login = async (username: string, password: string): Promise<void> => {
  try {
    await API.post("/auth/login", { username, password });
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Login failed");
  }
};

export const register = async (username: string, password: string): Promise<void> => {
  try {
    await API.post("/auth/register", { username, password });
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Registration failed");
  }
};

export const logout = async (): Promise<void> => {
  await API.post("/auth/logout");
};

export const getProfile = async (): Promise<string> => {
  try {
    const response = await API.get("/auth/profile");
    return response.data;
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Failed to fetch profile");
  }
};

export const getSession = async (): Promise<SessionResponse> => {
  try {
    const response = await API.get("/auth/session");
    return response.data;
  } catch (error: unknown) {
    const err = error as APIError;
    throw new Error(err.response?.data || "Session Expired");
  }
};
