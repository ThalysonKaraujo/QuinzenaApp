// app/empresa/[id]/registros.tsx
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRegistroDatabase, RegistroListItem } from '../database/useRegistroDatabase';
import { TabelaRegistros } from '../components/tabela/TabelaRegistro';

export default function TelaRegistros() {
  const { id } = useLocalSearchParams();
  const [registros, setRegistros] = useState<RegistroListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { getRegistrosByEmpresa, updateQuantidade } = useRegistroDatabase();
  const router = useRouter();

  async function carregarRegistros() {
    try {
      const lista = await getRegistrosByEmpresa(Number(id));
      setRegistros(lista);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateQuantidade(idRegistro: number, novaQuantidade: number) {
    try {
      await updateQuantidade(idRegistro, novaQuantidade);
      await carregarRegistros(); // atualiza a lista após edição
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabelaRegistros
        registros={registros}
        onUpdateQuantidade={handleUpdateQuantidade}
        onClose={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edd4b6'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
