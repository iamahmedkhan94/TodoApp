import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { CustomLoaderProps } from '../types/components';



const CustomLoader: React.FC<CustomLoaderProps> = ({ size = 'large', color = '#0000ff' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,              // Take up the entire screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional translucent background
  },
});

export default CustomLoader;
