import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { register } from "../../api/auth";
import { useRouter } from "expo-router";
import CustomButton from "@/src/components/CustomButton";
import CustomTextInput from "@/src/components/CustomTextInput";
import { APIError } from "@/src/types/api";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Use the router instance for navigation

  const handleRegister = async () => {
    try {
      await register(username, password);
      Alert.alert("Success", "User registered");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as APIError
      Alert.alert(
        "Registration Failed",
        err.response?.data || "An error occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Username"
        onChangeText={setUsername}
        style={styles.input}
      />
      <CustomTextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <CustomButton title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10, borderRadius: 5 },
});

export default RegisterScreen;
