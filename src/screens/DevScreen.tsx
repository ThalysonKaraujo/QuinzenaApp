import { View, Button, StyleSheet, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { clearDatabase } from '../database/clearDatabase';
import { initializeDatabase } from '../database/initializeDatabase';

export default function DevScreen() {
  const database = useSQLiteContext();

  async function handleClearDatabase() {
    await clearDatabase(database);
  }

  async function handleResetDatabase() {
    await clearDatabase(database);
    await initializeDatabase(database);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Desenvolvimento</Text>

      <Button title="🗑️ Limpar Banco de Dados" onPress={handleClearDatabase} />

      <View style={{ height: 20 }} />

      <Button title="🔄 Limpar e Reinicializar Banco" onPress={handleResetDatabase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4edea',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
