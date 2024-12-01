import { Redirect, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { getSession } from "../api/auth";
import { SessionResponse } from "../types/api";


export default function RootLayout() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null); // null indicates loading

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response: SessionResponse = await getSession(); // Fetch session status
        setIsLogin(response.isLogin); // Update state based on API response
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLogin(false); // Default to logged out on error
      }
    };

    checkSession();
  }, []);

  // Show loading screen while checking session status
  if (isLogin === null) {
    return null; // Or render a loading spinner
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href="/todo-list" /> : <Redirect href="/login" />}
    </>
  );
}
