import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { EmpresaInput } from '../inputs/EmpresaInput';
import { ModalButton } from '../buttons/modalButton'

type TipoRefeicaoDropdownProps = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  message: string;
  valorUnitario: string;
  setValorUnitario: React.Dispatch<React.SetStateAction<string>>;
};

export function ModalRefeicao({
  value,
  setValue,
  visible,
  onClose,
  title,
  message,
  valorUnitario,
  onSubmit,
  setValorUnitario,
}: TipoRefeicaoDropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Café', value: 'Café' },
    { label: 'Almoço', value: 'Almoço' },
    { label: 'Janta', value: 'Janta' },
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  function handleChangedText(text: string) {
    if (/^[0-9]*[.]?[0-9]*$/.test(text) || text === '') {
      setErrorMsg('');
      setValorUnitario(text);
    } else {
      setErrorMsg('Por favor, digite apenas números');
    }
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <Text style={styles.label}>{title}</Text>
          <Text style={styles.labelText}>{message}</Text>
          <Text style={{ marginBottom: 8, fontSize: 16 }}>Tipo de Refeição:</Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione..."
            style={{ borderColor: '#ccc' }}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
          />

          <Text style={{ marginTop: 16, marginBottom: 8, fontSize: 16 }}>Valor Unitário:</Text>

          <EmpresaInput
            placeHolder="Digite o valor unitário da refeição"
            onChangeText={handleChangedText}
            value={valorUnitario}
          />

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <ModalButton
            title="Adicionar Refeição"
            onPress={() => {
                if (!value) {
                setErrorMsg('Selecione um tipo de refeição');
                return;
                }
                if (!valorUnitario || isNaN(Number(valorUnitario))) {
                setErrorMsg('Digite um valor unitário válido');
                return;
                }
                setErrorMsg('');
                onSubmit(); 
            }}
          />
          <ModalButton title='Fechar' onPress={onClose} />
        

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    gap: 10,
    borderRadius: 12,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: '#edd4b6',
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
  },
  labelText: {
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontWeight: '600',
  },
});
