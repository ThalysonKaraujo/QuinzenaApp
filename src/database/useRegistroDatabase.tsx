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

export function useRegistroDatabase() {
    const database = useSQLiteContext();

    async function createRegistro(data: Omit<RegistroDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO RegistroRefeicao (data, quantidade, idRefeicao, idEmpresa) VALUES ($data, $quantidade, $idRefeicao, $idEmpresa)"
        )

        try {
            const result = await statement.executeAsync({data: data.data, quantidade: data.quantidade, idRefeicao: data.idRefeicao, idEmpresa:data.idEmpresa})
        } catch (error){
            throw error
        } finally {
            await statement.finalizeAsync();
        }

    }

    async function getRegistro(idRefeicao: number, idEmpresa: number): Promise<RegistroListItem[]> {
        const result = await database.getAllAsync<RegistroListItem>(
            `SELECT 
                RegistroRefeicao.id,
                RegistroRefeicao.data,
                RegistroRefeicao.quantidade,
                Empresa.nome AS nomeEmpresa,
                Refeicao.nome AS nomeRefeicao
            FROM RegistroRefeicao
            JOIN Empresa ON RegistroRefeicao.idEmpresa = Empresa.id
            JOIN Refeicao ON RegistroRefeicao.idRefeicao = Refeicao.id
            WHERE RegistroRefeicao.idEmpresa = $idEmpresa 
              AND RegistroRefeicao.idRefeicao = $idRefeicao`,
            {
                $idEmpresa: idEmpresa,
                $idRefeicao: idRefeicao,
            }
        );
        return result;
    }

    return {createRegistro, getRegistro}
}