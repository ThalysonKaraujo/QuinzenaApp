import React from 'react';
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { ModalButton } from '../buttons/modalButton';
import { ResumoRefeicaoProps } from '../../database/useRegistroDatabase';

type ModalFinalizarQuinzenaProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  resumoRefeicoes: ResumoRefeicaoProps[];
  totalGeral: number;
};

export function ModalFinalizarQuinzena({
  visible,
  onClose,
  title,
  onSubmit,
  resumoRefeicoes,
  totalGeral
}: ModalFinalizarQuinzenaProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={resumoRefeicoes}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>🍽 {item.nome}</Text>
                <Text style={styles.itemText}>Quantidade: {item.quantidadeTotal}</Text>
                <Text style={styles.itemText}>Valor unitário: R$ {item.valorUnitario.toFixed(2)}</Text>
                <Text style={styles.itemText}>Valor total: R$ {item.valorTotal.toFixed(2)}</Text>
              </View>
            )}
          />

          <Text style={styles.totalGeral}>
            💰 Total da quinzena: R$ {totalGeral.toFixed(2)}
          </Text>

          <ModalButton title="Finalizar Quinzena" onPress={onSubmit} />
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
    borderRadius: 12,
    width: '85%',
    backgroundColor: '#edd4b6',
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff7ec',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
  },
  totalGeral: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
});
