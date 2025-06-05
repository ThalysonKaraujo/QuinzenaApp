import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type TipoRefeicaoDropdownProps = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};


export function TipoRefeicaoDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Café', value: 'cafe' },
    { label: 'Almoço', value: 'almoco' },
    { label: 'Janta', value: 'janta' },
  ]);

  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo da Refeição:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecione..."
      />
      <Text style={styles.selecionado}>
        Selecionado: {value ? value : 'Nenhum'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  selecionado: {
    marginTop: 10,
    fontSize: 16,
  },
});
