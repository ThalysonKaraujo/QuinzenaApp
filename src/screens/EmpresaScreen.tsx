import { View, StyleSheet, Modal, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EmpresaButton } from '../components/buttons/EmpresaButton';
import { Logo } from '../components/logo/logo';
import {  useState } from 'react';
import { ModalRegistro } from '../components/modals/ModalRegistro';
import { ModalRefeicao } from '../components/modals/ModalRefeicao';
import { RefeicaoDatabase, useRefeicaoDatabase } from '../database/useRefeicaoDatabase';
import { useEmpresaDatabase } from '../database/useEmpresaDatabase';
import { ModalFinalizarQuinzena } from '../components/modals/ModalFinalizarQuinzena'
import { useRouter } from 'expo-router';
import { ListaEmpresaButton } from '../components/buttons/ListaEmpresaButton';
import { useEffect } from 'react';
import { RegistroListItem, ResumoRefeicaoProps, useRegistroDatabase } from '../database/useRegistroDatabase';


export default function EmpresaScreen() {
    const { id } = useLocalSearchParams();
    const [modalRefeicaoVisible, setModalRefeicaoVisible] = useState(false);
    const [modalFinalizarVisible, setModalFinalizarVisible] = useState(false);
    const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
    const [refeicoes, setRefeicoes] = useState<RefeicaoDatabase[]>([])
    const [valueRefeicao, setValueRefeicao] = useState<string | null> (null)
    const [nomeRefeicao, setNomeRefeicao] = useState<string | null>(null);
    const [quantidade, setQuantidade] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const router = useRouter();
    const [idRefeicaoSelecionada, setIdRefeicaoSelecionada] = useState<number | null>(null);
    const [resumoRefeicoes, setResumoRefeicoes] = useState<ResumoRefeicaoProps[]>([]);
    const [totalGeral, setTotalGeral] = useState<number>(0);
    const [modalListarVisible, setModalListarVisible] = useState(false)
    const [registros, setRegistros] = useState<RegistroListItem[]>([])
    
    const { createRefeicao, getRefeicoesByEmpresa } = useRefeicaoDatabase();
    const { deleteEmpresa } = useEmpresaDatabase();
    const { createRegistro, getResumoRefeicao, getRegistrosByEmpresa, updateQuantidade  } = useRegistroDatabase();

    async function handleDeleteEmpresa() {
        try {
            await deleteEmpresa(Number(id))
            router.push(`/`);
        } catch (error) {
            console.log(error)
        }
    }

    async function carregarResumo(){
        try {
            const resumo = await getResumoRefeicao(Number(id));
            setResumoRefeicoes(resumo)
            const total = resumo.reduce((acc, item) => acc + item.valorTotal, 0);
            setTotalGeral(total);
        } catch (error) {
            console.log(error)
        }
    }
    async function handleAdicionarQuantidade() {
        if (!quantidade || !idRefeicaoSelecionada) {
            console.warn("Dados incompletos")
            return ;
        }
        const dataHoje = new Date().toISOString().split('T')[0];
            console.log(dataHoje)

        try {
            
            await createRegistro({
                data: dataHoje,
                quantidade: parseInt(quantidade),
                idRefeicao: idRefeicaoSelecionada,
                idEmpresa: Number(id),
            })

            setModalRegistroVisible(false);
            setQuantidade('')
        } catch (erro) {
            console.error(erro)
        }
    }

    async function carregarRefeicoes(){
        try {
            const lista = await getRefeicoesByEmpresa(Number(id));
            setRefeicoes(lista);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        carregarRefeicoes();
    }, []);
        

    function abrirModalRegistro(refeicaoId: number, nome: string) {
        setIdRefeicaoSelecionada(refeicaoId);
        setNomeRefeicao(nome);
        setModalRegistroVisible(true);
    }

    async function abrirModalFinalizar() {
        await carregarResumo()
        setModalFinalizarVisible(true)
    }

    async function handleAdicionarRefeicao() {
        if (refeicoes.length >= 3) {
            console.error('Limite de 3 refeições atingido')
            return ;
        }
        
        try {
            await createRefeicao({
            nome: valueRefeicao!, 
            valorUnitario: Number(valorUnitario),
            idEmpresa: Number(id)
            });

            setModalRefeicaoVisible(false);
            await carregarRefeicoes();
            limparCampos();
        } catch (error) {
            console.log('Erro ao carregar refeições: ', error);
        }
        }

    function limparCampos(){
        setValorUnitario('')
        setValueRefeicao(null)
    }

    return (
        <View style={styles.container}>
            <Logo />
            <EmpresaButton title="Adicionar Refeição" onPress={() => setModalRefeicaoVisible(true)} />
            <ModalRefeicao visible={modalRefeicaoVisible} onClose={() => setModalRefeicaoVisible(false)} onSubmit={handleAdicionarRefeicao} title="Adicionar Refeição" message="Preencha os dados abaixo" value={valueRefeicao} setValue={setValueRefeicao} valorUnitario={valorUnitario} setValorUnitario={setValorUnitario}  />
            <EmpresaButton title="Listar Inserções" onPress={() => router.push(`/empresa/${id}/registros`)} />
            <EmpresaButton title="Finalizar Quinzena" onPress={abrirModalFinalizar} />
            <ModalFinalizarQuinzena visible={modalFinalizarVisible} onClose={() => setModalFinalizarVisible(false)} onSubmit={handleDeleteEmpresa} 
            title='Finalizar Quinzena' resumoRefeicoes={resumoRefeicoes} totalGeral={totalGeral}  />
            <FlatList
            data={refeicoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ListaEmpresaButton title={item.nome} onPress={() => abrirModalRegistro(item.id, item.nome)} />
            )}
            />
            <ModalRegistro visible={modalRegistroVisible} onClose={() => setModalRegistroVisible(false)} onSubmit={handleAdicionarQuantidade} value={quantidade} onChangeValue={setQuantidade} />
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