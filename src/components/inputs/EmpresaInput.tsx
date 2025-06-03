import React from 'react';
import { View, TextInput as RNInput, StyleSheet } from 'react-native';

type LoginTextInputProps = {
  placeHolder: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

export function EmpresaInput({
  placeHolder,
  onChangeText,
  value,
}: LoginTextInputProps) {
  return (
    <View style={styles.container}>
      <RNInput
        placeholder={placeHolder}
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 50,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
