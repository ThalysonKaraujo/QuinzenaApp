import { type SQLiteDatabase } from "expo-sqlite";

export async function clearDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync('DELETE FROM RegistroRefeicao;');
    await database.execAsync('DELETE FROM Refeicao;');
    await database.execAsync('DELETE FROM Empresa;');
    console.log('Banco limpo com sucesso!');
  } catch (error) {
    console.log('Erro ao limpar o banco:', error);
  }
}
