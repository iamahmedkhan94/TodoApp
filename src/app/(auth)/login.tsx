import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { login } from "../../api/auth";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { APIError } from "@/src/types/api";

const LoginScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await login(username, password);
      router.replace("/todo-list");
    } catch (error: unknown) {
      const err = error as APIError
      Alert.alert("Login Failed", err.message);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <CustomTextInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
        <CustomButton title="Login" onPress={handleLogin} disabled={!(username && password)} loading={isLoading}/>
        <CustomButton
          title="Register"
          onPress={() => router.push("/register")}
          style={styles.registerButton}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  registerButton: {
    marginTop: 5,
    backgroundColor: "#6c757d",
  },
});

export default LoginScreen;
