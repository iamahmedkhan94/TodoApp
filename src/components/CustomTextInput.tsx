import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { CustomTextInputProps } from "../types/components";



const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, error ? styles.errorInput : {}]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: "red",
  },
});

export default CustomTextInput;
