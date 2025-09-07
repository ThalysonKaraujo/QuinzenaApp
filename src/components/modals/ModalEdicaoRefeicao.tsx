import { useEffect, useState } from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { EmpresaInput } from "../inputs/EmpresaInput";
import { ModalButton } from "../buttons/modalButton";

type ModalEdicaoRefeicaoProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (novoValor: number) => void;
  valorAtual: number;
};

export function ModalEdicaoRefeicao({
  visible,
  onClose,
  onSubmit,
  valorAtual,
}: ModalEdicaoRefeicaoProps) {
  const [novoValor, setNovoValor] = useState("");

  useEffect(() => {
    if (visible) {
      setNovoValor(String(valorAtual));
    }
  }, [visible, valorAtual]);

  function handleChangedText(text: string) {
    const texto = text.replace(/[^0-9]/g, "");
    setNovoValor(texto);
  }

  function handleSubmit() {
    const valorNumerico = Number(novoValor);
    if (!isNaN(valorNumerico) && valorNumerico > 0) {
      onSubmit(valorNumerico);
    } else {
      console.warn("Por favor, insira um valor válido.");
    }
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
          <Text style={styles.label}>Edite o valor unitário</Text>
          <EmpresaInput
            placeHolder="Novo valor unitário"
            value={novoValor}
            onChangeText={handleChangedText}
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
    gap: 10,
    borderRadius: 12,
    width: "85%",
    elevation: 5,
    shadowColor: "#000",
    backgroundColor: "#edd4b6",
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
