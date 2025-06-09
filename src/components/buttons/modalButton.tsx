import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export type ModalButtonProps = {
    title: string
    disabled?: boolean
    onPress: () => void
}

export function ModalButton({ title, disabled, onPress }: ModalButtonProps)  {
  return (
    <TouchableOpacity
        style={styles.button} 
        onPress={onPress}
        disabled={disabled}
        >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#795c4c', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});