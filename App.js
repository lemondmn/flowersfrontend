import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View, Modal, ToastAndroid } from "react-native";
import { styles } from "./Styles";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(""); // image uri
  const [imageStatus, setImageStatus] = useState(false); // image selected or not
  const [imageSent, setImageSent] = useState(false); // image sent or not
  const [prediction, setPrediction] = useState(""); // prediction result
  const [serverStatus, setServerStatus] = useState(""); // server status
  const [modalVisible, setModalVisible] = useState(false);

  const server = "http://localhost:5000";

  const selectImage = async (useLibrary) => {
    let result;

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    try {
      if (useLibrary) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        await ImagePicker.requestCameraPermissionsAsync();

        result = await ImagePicker.launchCameraAsync(options);
      }

      if (!result.cancelled) {
        console.log(result.assets[0].uri);
        setImage(result.assets[0].uri);
        setImageStatus(true);
      }
    } catch (error) {
      console.log(error);
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

  const displayImage = () => {
    if (imageStatus) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      );
    }
    else {
      return (
        <Image
          style={styles.image}
          source={require("./assets/placeholder.jpg")}
        />
      );
    }
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
            <Text style={styles.emphasisText}>{server}</Text>
            <Text style={styles.emphasisText}>{serverStatus}</Text>
            <Pressable style={styles.b3} onPress={() => closeModal()}>
              <Text style={styles.textbtn}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const displayImageStatus = () => {
    if (imageStatus === true) {
      return (
        <Text style={styles.hiddenText}>
          Imagen seleccionada
        </Text>
      );
    } else {
      return (
        <Text style={styles.emphasisText}>
          No se ha seleccionado una imagen
        </Text>
      );
    }
  };

  const predictionHandler = async () => {
    if (imageStatus === false) {
      ToastAndroid.show("No se ha seleccionado una imagen", ToastAndroid.SHORT);
      return;
    } else if (imageSent === true) {
      ToastAndroid.show("Ya se ha enviado una imagen", ToastAndroid.SHORT);
      return;
    } else {
      ToastAndroid.show("Enviando imagen", ToastAndroid.SHORT);
      setImageSent(true);
    }
    // } else {
    //   setImageSent(true);
    //   const data = new FormData();
    //   data.append("file", {
    //     uri: image,
    //     type: "image/jpeg",
    //     name: "image.jpg",
    //   });

    //   const response = await fetch(server + "/predict", {
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   const responseJson = await response.json();

    //   console.log(responseJson);

    //   setPrediction(responseJson.prediction);
    // }
  };

  const displayPrediction = () => {
    if (prediction === "") {
      return (<Text style={styles.hiddenText}>
        No se ha realizado una predicción
      </Text>);
    } else {
      return (
        <Text style={styles.emphasisText}>
          La flor es: {prediction}
        </Text>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediccion de Flores</Text>
      {displayImageStatus()}
      {displayImage()}
      {displayPrediction()}
      <View style={styles.buttongrid}>
        <Pressable style={styles.b1} onPress={() => selectImage(true)}>
          <Text style={styles.textbtn}>
            {imageStatus ? "Cambiar imagen" : "Seleccionar imagen"}
          </Text>
        </Pressable>
        <Pressable style={styles.b1} onPress={() => selectImage(false)}>
          <Text style={styles.textbtn}>Capturar</Text>
        </Pressable>
      </View>
      <Pressable style={styles.b2} onPress={() => predictionHandler()}>
        <Text style={styles.textbtn}>Realizar Predicción</Text>
      </Pressable>
      <Pressable style={styles.b3} onPress={() => getServerStatus()}>
        <Text style={styles.textbtn}>Obtener estado del servidor</Text>
      </Pressable>
      <StatusModal />
      <StatusBar style="auto" />
    </View>
  );
}
