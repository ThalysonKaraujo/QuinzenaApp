// app/empresa/[id]/registros.tsx
import { SafeAreaView, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRegistroDatabase, RegistroListItem } from '../database/useRegistroDatabase';
import { TabelaRegistros } from '../components/tabela/TabelaRegistro';

// Componente simples para o ícone de seta
const BackArrowIcon = () => (
  <Text style={styles.arrowText}>‹</Text>
);

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
      // Usando SafeAreaView aqui também para consistência
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tela Registros</Text>
      </View>


      <TabelaRegistros
        registros={registros}
        onUpdateQuantidade={handleUpdateQuantidade}
        onClose={() => router.back()}
      />
    </SafeAreaView>
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
    alignItems: 'center',
    backgroundColor: '#edd4b6', 
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 40, 
    paddingBottom: 15, 
    paddingHorizontal: 15,
    backgroundColor: '#d4a373', 
    position: 'relative', 
    borderBottomWidth: 1,
    borderBottomColor: '#bf926b',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3d2c1d',
  },
  backButton: {
    position: 'absolute', 
    top: 25,
    left: 15, 
    padding: 5, 
  },
  arrowText: {
    fontSize: 30, 
    color: '#3d2c1d',
  }
});
