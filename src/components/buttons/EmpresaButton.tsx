import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export type EmpresaButtonProps = {
    title: string
    onPress?: () => void;
    disabled?: boolean
}

export function EmpresaButton({ title, onPress ,disabled }: EmpresaButtonProps)  {
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
    backgroundColor: '#f4a03f', 
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