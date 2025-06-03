import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Logo } from "../components/logo/logo";
import { EmpresaInput } from "../components/inputs/EmpresaInput";
import { EmpresaButton } from "../components/buttons/EmpresaButton";

export default function HomeScreen() {
    const [data, setData] = useState([
        { id: '1', name: 'Empresa A' },
        { id: '2', name: 'Empresa B' },
        { id: '4', name: 'Empresa C' },
        { id: '5', name: 'Empresa C' },
        { id: '6', name: 'Empresa C' },
        { id: '7', name: 'Empresa C' },
    ]);

    const handleItemPress = (itemName: string) => {
        console.log('Clicou em:', itemName);
        // Navegação depois
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => handleItemPress(item.name)}
                >
                    <Text style={styles.itemButtonText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Logo />
                    <Text style={styles.title}>Sabor Caseiro</Text>
                    <EmpresaInput placeHolder={"Insira uma Empresa"} />
                    <EmpresaButton 
                        title="Cadastrar Empresa"
                        onPress={() => console.log('Cadastrar empresa')}
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
