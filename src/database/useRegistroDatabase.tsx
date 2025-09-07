import { useSQLiteContext } from "expo-sqlite";

export type RegistroDatabase = {
    id: number
    data: string
    quantidade: number
    idRefeicao: number
    idEmpresa: number
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
            "INSERT INTO RegistroRefeicao (data, quantidade, idRefeicao, idEmpresa) VALUES ($data, $quantidade, $idRefeicao, $idEmpresa)"
        )

        try {
            const result = await statement.executeAsync({$data: data.data, $quantidade: data.quantidade, $idRefeicao: data.idRefeicao, $idEmpresa: data.idEmpresa})
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

    async function getRegistrosByEmpresa(idEmpresa: number): Promise<RegistroListItem[]> {
    const result = await database.getAllAsync<RegistroListItem>(
        `SELECT 
            rr.id,
            rr.data,
            rr.quantidade,
            e.nome AS nomeEmpresa,
            r.nome AS nomeRefeicao
        FROM RegistroRefeicao rr
        JOIN Refeicao r ON rr.idRefeicao = r.id
        JOIN Empresa e ON rr.idEmpresa = e.id
        WHERE rr.idEmpresa = ?`,
        [idEmpresa]
    );
    return result;
    }


    async function updateQuantidade(idRegistro: number, novaQuantidade: number) {
        await database.runAsync(
            `UPDATE RegistroRefeicao
            SET quantidade = ?
            WHERE id = ?`, [novaQuantidade, idRegistro]
        )
    }

    async function deleteRegistro(idRegistro: number) {
        await database.runAsync(
            `DELETE FROM RegistroRefeicao
            WHERE id = ?`, [idRegistro]
        )
    }

    async function updateData(idRegistro: number, novaData: string) {
        await database.runAsync(
            `UPDATE RegistroRefeicao
            SET data = ?
            WHERE id = ?`, [novaData, idRegistro]
        )
    }
    


    return { createRegistro, getResumoRefeicao, getRegistrosByEmpresa, updateQuantidade, deleteRegistro, updateData }
}