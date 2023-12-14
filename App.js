import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [serverStatus, setServerStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const server = "http://localhost:5000/";

  const selectImage = async (useLibrary) => {
    let result;

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
    }
  };

  const getServerStatus = () => {
    openModal();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const StatusModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Estado del servidor</Text>
            <Text style={styles.modalText}>{server}</Text>
            <Text style={styles.modalText}>{serverStatus}</Text>
            <Pressable style={styles.b3} onPress={() => closeModal()}>
              <Text style={styles.textbtn}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const getImageStatus = () => {
    if (imageStatus) {
      return "Imagen cargada";
    } else {
      return "Imagen no cargada";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediccion de flores</Text>
      <Text style={styles.modalText}>{getImageStatus()}</Text>
      <Image style={styles.image} source={require('./assets/placeholder.jpg')} />
      <View style={styles.buttongrid}>
        <Pressable style={styles.b1} onPress={() => selectImage(true)}>
          <Text style={styles.textbtn}>Cargar Imagen</Text>
        </Pressable>
        <Pressable style={styles.b1} onPress={() => selectImage(false)}>
          <Text style={styles.textbtn}>Capturar</Text>
        </Pressable>
      </View>
      <Pressable style={styles.b2}>
        <Text style={styles.textbtn}>Realizar Prediccion</Text>
      </Pressable>
      <Pressable style={styles.b3} onPress={() => getServerStatus()}>
        <Text style={styles.textbtn}>Obtener estado del servidor</Text>
      </Pressable>
      <StatusModal />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttongrid: {
    flexDirection: "row",
    width: "90%",
  },
  textbtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  b1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 0,
    backgroundColor: "#7114a3",
    width: "50%",
    margin: 1,
    height: "fit-content",
  },
  b2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 10,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 0,
    backgroundColor: "#7114a3",
    width: "90%",
    height: "fit-content",
  },
  b3: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 0,
    marginTop: 20,
    backgroundColor: "black",
    width: "90%",
    height: "fit-content",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    width: "95%",
    height: "50%",
    borderRadius: 10,
    alignItems: "center",
    elevation: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 15,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7114a3"
  },
});
