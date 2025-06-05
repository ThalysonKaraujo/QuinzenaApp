import { Button, Text, View, StyleSheet, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EmpresaButton } from '../components/buttons/EmpresaButton';
import { Logo } from '../components/logo/logo';
import { useState } from 'react';
import { ModalRefeicao } from '../components/modals/ModalRefeicao';

export default function EmpresaScreen() {
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState<string | null> (null);

    return (
        <View style={styles.container}>
            <Logo />
            <EmpresaButton title="Adicionar Refeição" onPress={() => setModalVisible(true)} />
            <ModalRefeicao visible={modalVisible} onClose={() => setModalVisible(false)} title="Adicionar Refeição" message="Preencha os dados abaixo" value={value} setValue={setValue}  />
            <EmpresaButton title="Listar Inserções" />
            <EmpresaButton title="Excluir Empresa" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        backgroundColor: "#edd4b6",
        flex: 1
    }
})