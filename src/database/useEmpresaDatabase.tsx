import { useSQLiteContext } from "expo-sqlite";

export type EmpresaDatabase = {
    id: number
    nome: string
}

export function useEmpresaDatabase() {
    const database = useSQLiteContext()

    async function createEmpresa(data: Omit<EmpresaDatabase, "id">) {
    if (!data.nome || data.nome.trim() === "") {
        throw new Error("O nome da empresa é obrigatório.");
    }
        const statement = await database.prepareAsync(
            "INSERT INTO Empresa (nome) VALUES ($nome)"
        )

        try {
            const result = await statement.executeAsync({$nome: data.nome})

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }

        
    }

    async function getEmpresas(): Promise<EmpresaDatabase[]> {
        const result = await database.getAllAsync<EmpresaDatabase>(
            "SELECT * FROM Empresa"
        );
        return result;
    }

    async function deleteEmpresa(id: number) {
        try {
            await database.execAsync("DELETE FROM Empresa WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    

    return { createEmpresa, getEmpresas, deleteEmpresa }
}