import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync('PRAGMA foreign_keys = ON;');

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Empresa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        );

    `);

    await database.execAsync(`CREATE TABLE IF NOT EXISTS Refeicao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valorUnitario REAL NOT NULL,
            idEmpresa Integer NOT NULL,
            FOREIGN KEY (idEmpresa) REFERENCES Empresa(id) ON DELETE CASCADE
        );`
    );

    await database.execAsync(`CREATE TABLE IF NOT EXISTS RegistroRefeicao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            idRefeicao INTEGER NOT NULL,
            idEmpresa INTEGER NOT NULL,
            FOREIGN KEY (idRefeicao) REFERENCES Refeicao(id) ON DELETE CASCADE
        );`
    );
}