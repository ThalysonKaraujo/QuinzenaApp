import { useSQLiteContext } from "expo-sqlite";

export type RegistroDatabase = {
    id: number
    data: string
    quantidade: number
    idRefeicao: number
}

export type RegistroListItem = {
    id: number;
    data: string;
    quantidade: number;
    nomeEmpresa: string;
    nomeRefeicao: string;
};

export type ResumoRefeicaoProps = {
    nome: string;
    quantidadeTotal: number;
    valorUnitario: number;
    valorTotal: number;
}

export function useRegistroDatabase() {
    const database = useSQLiteContext();

    async function createRegistro(data: Omit<RegistroDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO RegistroRefeicao (data, quantidade, idRefeicao) VALUES ($data, $quantidade, $idRefeicao)"
        )

        try {
            const result = await statement.executeAsync({$data: data.data, $quantidade: data.quantidade, $idRefeicao: data.idRefeicao})
        } catch (error){
            throw error
        } finally {
            await statement.finalizeAsync();
        }

    }

    async function getResumoRefeicao(idEmpresa: number): Promise<ResumoRefeicaoProps[]> {
        const result = await database.getAllAsync<ResumoRefeicaoProps>(
        `SELECT 
        r.nome AS nome,
        SUM(rr.quantidade) AS quantidadeTotal,
        r.valorUnitario AS valorUnitario,
        SUM(rr.quantidade * r.valorUnitario) AS valorTotal
        FROM Refeicao r
        JOIN RegistroRefeicao rr ON r.id = rr.idRefeicao
        WHERE r.idEmpresa = ?
        GROUP BY r.nome`, [idEmpresa]
        );
        return result
    }

    


    return { createRegistro, getResumoRefeicao  }
}