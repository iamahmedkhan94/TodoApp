import { GestureResponderEvent, TextInputProps } from "react-native";


export interface CustomButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean; // New prop for loading state
    style?: object;
  }

  export interface CustomTextInputProps extends TextInputProps {
    label?: string; // Optional label for the input
    error?: string; // Optional error message
  }

  export interface CustomLoaderProps {
    size?: 'small' | 'large'; // Specify size options for the ActivityIndicator
    color?: string;          // Optional custom color for the ActivityIndicator
  }