import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text, Alert } from "react-native";
import { EmpresaInput } from "../inputs/EmpresaInput";
import { ModalButton } from "../buttons/modalButton";
import { RegistroListItem } from "../../database/useRegistroDatabase";

type ModalEditarRegistroProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (idRegistro: number, novaData: string, novaQuantidade: number) => void;
  registro: RegistroListItem | null;
};

export function ModalEditarRegistro({
  visible,
  onClose,
  onSubmit,
  registro,
}: ModalEditarRegistroProps) {
  const [novaData, setNovaData] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");

  useEffect(() => {
    if (registro) {
        const [ano, mes, dia] = registro.data.split('-');
        setNovaData(`${dia}/${mes}/${ano}`);
        setNovaQuantidade(String(registro.quantidade));
    }
  }, [registro]);

  function handleDataChange(text: string) {
    const cleaned = text.replace(/\D/g, '');
    
    let formatted = cleaned;

    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }

    setNovaData(formatted.slice(0, 10));
  }

  function handleSubmit() {
    if (!registro) return;

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = novaData.match(dateRegex);

    if (!match) {
      Alert.alert("Erro", "Formato de data inválido. Por favor, use DD/MM/AAAA.");
      return;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    const dataObj = new Date(ano, mes - 1, dia);
    if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia) {
        Alert.alert("Erro", "Data inválida. Verifique o dia, mês e ano.");
        return;
    }

    const quantidadeNumerica = parseInt(novaQuantidade, 10);
    if (!isNaN(quantidadeNumerica) && quantidadeNumerica > 0) {
      const dataFormatadaParaDB = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      onSubmit(registro.id, dataFormatadaParaDB, quantidadeNumerica);
    } else {
      console.warn("Por favor, insira dados válidos.");
    }
  }

  if (!registro) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <Text style={styles.label}>Editar Registro</Text>
          <EmpresaInput
            placeHolder="Nova data (DD/MM/AAAA)"
            value={novaData}
            onChangeText={handleDataChange}
          />
          <EmpresaInput
            placeHolder="Nova quantidade"
            value={novaQuantidade}
            onChangeText={setNovaQuantidade}
          />
          <ModalButton title="Salvar" onPress={handleSubmit} />
          <ModalButton title="Cancelar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    gap: 15,
    borderRadius: 12,
    width: "85%",
    backgroundColor: "#edd4b6",
    elevation: 5,
    shadowColor: "#000",
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: '#3d2c1d',
  },
});