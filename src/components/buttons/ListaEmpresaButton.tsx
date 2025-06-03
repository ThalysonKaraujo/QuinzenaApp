import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export type EmpresaButtonProps = {
    title: string
    onPress?: () => void;
    disabled?: boolean
}

export function ListaEmpresaButton({ title, onPress ,disabled }: EmpresaButtonProps)  {
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