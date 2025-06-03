import { Button, Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EmpresaButton } from '../components/buttons/EmpresaButton';
import { Logo } from '../components/logo/logo';

export default function EmpresaScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Logo />
            <EmpresaButton title="Adicionar Refeição" />
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