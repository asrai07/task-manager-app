import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, multiline, style, ...props }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      style={[styles.input, multiline && styles.multiline, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 14,
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
});

export default Input;