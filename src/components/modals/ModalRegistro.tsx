import { View, Text, StyleSheet, Modal } from 'react-native';
import { EmpresaInput } from '../inputs/EmpresaInput';
import { ModalButton } from '../buttons/modalButton';
import { useState } from 'react';

type ModalRegistroProps = {
    visible: boolean
    onClose: () => void
    onSubmit: () => void
    value: string
    onChangeValue: (value: string) => void;
}

export function ModalRegistro({visible, onClose, onSubmit, value, onChangeValue  }: ModalRegistroProps) {

    function handleChangedText(text: string) {
    const texto = text.replace(/[^0-9]/g, '')
    onChangeValue(texto)
  }

    return(
        <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <Text style={styles.label}>Adicionar Quantidade</Text>
                    <EmpresaInput placeHolder='Adicione a quantidade da refeição' value={value} onChangeText={handleChangedText} />
                    <ModalButton title='Confirmar' onPress={onSubmit}  />
                    <ModalButton title='Fechar' onPress={onClose} />
                </View>
            </View>
        </Modal>
    )
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
    fontSize: 20,
    fontWeight: '600',
  },
});