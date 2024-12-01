import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CustomButtonProps } from "../types/components";



const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  loading = false, // Default loading is false
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading} // Disable button when loading
      style={[styles.button, (disabled || loading) ? styles.disabled : {}, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // For consistent layout
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
});

export default CustomButton;
