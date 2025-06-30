import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Logo } from "../components/logo/logo";
import { EmpresaInput } from "../components/inputs/EmpresaInput";
import { EmpresaButton } from "../components/buttons/EmpresaButton";
import { ListaEmpresaButton } from "../components/buttons/ListaEmpresaButton";
import { useEmpresaDatabase ,EmpresaDatabase } from "../database/useEmpresaDatabase";
import { useRouter } from "expo-router";
import { RegistroListItem, ResumoRefeicaoProps, useRegistroDatabase } from '../database/useRegistroDatabase';


export default function HomeScreen() {
    const { createEmpresa,getEmpresas } = useEmpresaDatabase();
    const [data, setData] = useState<EmpresaDatabase[]>([]);
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const router = useRouter()
    

    const { verificarEstruturaTabela } = useRegistroDatabase();

    const handleItemPress = (itemId: number) => {
        router.push(`/empresa/${itemId}`);
    };

    useEffect(() => {
        carregarEmpresas();
        verificarEstruturaTabela();
    }, []) 

    
 

    const carregarEmpresas = async () => {
        try {
            const empresas = await getEmpresas();
            setData(empresas);
        } catch (error) {
            console.error(error)
        }
    };

    const handleCadastrarEmpresa = async () => {

        try {
            await createEmpresa({nome: nomeEmpresa})
            setNomeEmpresa('');
            await carregarEmpresas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ListaEmpresaButton 
                    onPress={() => handleItemPress(item.id)}
                    title={item.nome} />
            )}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Logo />
                    <Text style={styles.title}>Sabor Caseiro</Text>
                    <EmpresaInput placeHolder={"Insira uma Empresa"} value={nomeEmpresa} onChangeText={setNomeEmpresa} />
                    <EmpresaButton 
                        title="Cadastrar Empresa"
                        onPress={handleCadastrarEmpresa}
                    />
                    <Text style={styles.subTitle}>Empresas Cadastradas:</Text>
                </View>
            }
            contentContainerStyle={styles.contentContainer}
        />
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        backgroundColor: "#edd4b6",
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        marginBottom: 30,
        color: '#785b4b'
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#785b4b'
    },
    itemButton: {
        backgroundColor: '#f4a03f',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    itemButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
