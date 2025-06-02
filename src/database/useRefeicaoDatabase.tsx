import { useSQLiteContext } from "expo-sqlite";

export type RefeicaoDatabase = {
    id: number
    nome: string
    valorUnitario : number
    idEmpresa: number
}

export function useRefeicaoDatbase() {
    const database = useSQLiteContext()

    async function createRefeicao(data: Omit<RefeicaoDatabase, "id"> ) {
        const statement = await database.prepareAsync(
            "INSERT INTO Refeicao (nome, valorUnitario, idEmpresa) VALUES ($nome, $valorUnitario, $idEmpresa)"
        )

        try {
            const result = await statement.executeAsync({nome: data.nome, valorUnitario: data.valorUnitario, idEmpresa: data.idEmpresa})
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }

        }
    async function getRefeicoesByEmpresa(idEmpresa: number): Promise<RefeicaoDatabase[]> {
        const result = await database.getAllAsync<RefeicaoDatabase>(
            "SELECT * FROM Refeicao WHERE idEmpresa = $idEmpresa",
            {$idEmpresa: idEmpresa}
        );
        return result;
    }
    return {createRefeicao, getRefeicoesByEmpresa};
}