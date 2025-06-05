import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { EmpresaInput } from '../inputs/EmpresaInput';
import { ListaEmpresaButton } from '../buttons/ListaEmpresaButton';

type TipoRefeicaoDropdownProps = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  visible: boolean
  onClose: () => void
  title: string
  message: string
};



export function ModalRefeicao({ value, setValue, visible, onClose }: TipoRefeicaoDropdownProps) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([

    { label: 'Café', value: 'cafe' },
    { label: 'Almoço', value: 'almoco' },
    { label: 'Janta', value: 'janta' },
    ]);
    const [quantidade,setQuantidade] = useState("")
    const [errorMsg, setErrorMsg] = useState('');

    function handleChangedText(text: string) {
    for (let i = 0; i < text.length; i++){
    const char = text[i]
    if ((char < '0' || char > '9' ) && char != "."  ) {
        setErrorMsg("Por favor, digite apenas números")
        return;
    }
    }
    setErrorMsg('')
    setQuantidade(text)
    }

    return (
    <Modal visible={visible} animationType='slide'  onRequestClose={onClose}>
        <View style={styles.modalBackground}>
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
            style={{ borderColor: '#ccc' }}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
            />
            <EmpresaInput placeHolder='Digite o valor unitário da refeição' onChangeText={handleChangedText} value={quantidade} />
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            <ListaEmpresaButton title='Adicionar Refeição' onPress={onClose}   />
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
    backgroundColor: "#edd4b6"
    },
    label: {
    fontSize: 16,
    fontWeight: '600',
    },
    errorText: {
    color: 'red',
    marginTop: 4,
    fontWeight: '600',
    }
    });
