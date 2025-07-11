import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { RegistroListItem } from '../../database/useRegistroDatabase';
import { EmpresaButton } from '../buttons/EmpresaButton';

type Props = {
  registros: RegistroListItem[];
  onUpdateQuantidade: (id: number, novaQuantidade: number) => void;
  onClose: () => void;
};

export function TabelaRegistros({ registros, onUpdateQuantidade, onClose }: Props) {
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novaQtd, setNovaQtd] = useState<{ [id: number]: string }>({});

  function formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.cellHeader}>Tipo</Text>
        <Text style={styles.cellHeader}>Qtd</Text>
        <Text style={styles.cellHeader}>Data</Text>
        <Text style={styles.cellHeader}>Ação</Text>
      </View>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const estaEditando = editandoId === item.id;

          return (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.nomeRefeicao}</Text>

              {estaEditando ? (
                <TextInput
                  style={[styles.cell, styles.input]}
                  keyboardType="numeric"
                  value={novaQtd[item.id] ?? item.quantidade.toString()}
                  onChangeText={(text) =>
                    setNovaQtd((prev) => ({ ...prev, [item.id]: text }))
                  }
                />
              ) : (
                <Text style={styles.cell}>{item.quantidade}</Text>
              )}

              <Text style={styles.cell}>{formatarData(item.data)}</Text>

              {estaEditando ? (
                <TouchableOpacity
                  onPress={() => {
                    const novaQuantidade = parseInt(novaQtd[item.id]);
                    if (!isNaN(novaQuantidade)) {
                      onUpdateQuantidade(item.id, novaQuantidade);
                      setEditandoId(null);
                    }
                  }}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setEditandoId(item.id)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <EmpresaButton title='Fechar' onPress={onClose}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#edd4b6',
    flex: 1,
    marginTop:10
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#785b4b',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#785b4b',
    fontSize: 16,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#4a3c34',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    borderRadius: 6,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  editText: {
    color: '#f4a03f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#f4a03f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#008000',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#785b4b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});