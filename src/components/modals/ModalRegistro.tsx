import { View, Text, StyleSheet, Modal } from 'react-native';
import { EmpresaInput } from '../inputs/EmpresaInput';
import { ModalButton } from '../buttons/modalButton';
import { useState } from 'react';
import { ModalEdicaoRefeicao } from './ModalEdicaoRefeicao';

type ModalRegistroProps = {
    visible: boolean
    onClose: () => void
    onSubmit: () => void
    value: string
    onChangeValue: (value: string) => void;
    updateRefeicao?: (idRefeicao: number, novaQuantidade: number) => Promise<void> ,
    refeicaoSelecionada: {id:number, valorUnitario: number} | null;
}

export function ModalRegistro({visible, onClose, onSubmit, value, onChangeValue, updateRefeicao, refeicaoSelecionada  }: ModalRegistroProps) {

  const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);

  function handleChangedText(text: string) {
  const texto = text.replace(/[^0-9]/g, '')
  onChangeValue(texto)
  }

  async function handleUpdateRefeicao(novoValor: number) {
    if (refeicaoSelecionada && updateRefeicao) {
        await updateRefeicao(refeicaoSelecionada.id, novoValor);
        setModalEdicaoVisible(false); // Fecha o modal de edição
        onClose(); // Fecha o modal de registro também
    }
  }

  return(
      <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
          <View style={styles.modalBackground}>
              <View style={styles.container}>
                  <Text style={styles.label}>Adicionar Quantidade</Text>
                  <EmpresaInput placeHolder='Adicione a quantidade da refeição' value={value} onChangeText={handleChangedText} />
                  <ModalButton title='Confirmar' onPress={onSubmit}  />
                  <ModalButton title='Fechar' onPress={onClose} />
                  <ModalButton title='Mudar o valor unitário' onPress={() => setModalEdicaoVisible(true)} />

                  {refeicaoSelecionada && (
                    <ModalEdicaoRefeicao 
                        visible={modalEdicaoVisible} 
                        onClose={() => setModalEdicaoVisible(false)}
                        onSubmit={handleUpdateRefeicao}
                        valorAtual={refeicaoSelecionada.valorUnitario}
                    />
                  )}
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