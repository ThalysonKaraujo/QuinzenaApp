import { useEffect, useState } from "react"
import { Button, Text, TextInput,View, Alert, FlatList } from "react-native"
import { router } from "expo-router"

import { useEmpresaDatabase, EmpresaDatabase} from "../database/useEmpresaDatabase"




export default function Index() {
    const { getEmpresas } = useEmpresaDatabase();
    const[id,setId] = useState("")
    const[nome, setNome] = useState("")
    const[empresas, setEmpresas] = useState<EmpresaDatabase[]> ([])

    useEffect(() => {
      carregarEmpresas();
    })

    const empresaDatabase = useEmpresaDatabase()

    async function createEmpresa() {
        try{

            const response = await empresaDatabase.createEmpresa({
                nome
            })

            Alert.alert(`empresa: ${response.insertedRowId}`)
        } catch (error){
            console.log(error)
        }
    }

    async function carregarEmpresas() {
        try{
          const dados = await getEmpresas();
          setEmpresas(dados)
        } catch (error) {
          console.error("Erro ao carregar empresas", error)
        }
    }


    return (
        <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Cadastrar Empresa</Text>

      <TextInput
        placeholder="Nome da empresa"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <Button title="Criar Empresa" onPress={createEmpresa} />

      <FlatList
                data={empresas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{backgroundColor: "#f2f2f2", padding: 15, marginBottom: 10, borderRadius:8}}>
                        <Text>{item.nome}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhuma empresa cadastrada.</Text>}
            />

    </View>
    )
}

