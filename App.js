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

  const server = "http://ip:8000";

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
        setPrediction("");
        setImageSent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getServerStatus = async() => {
    const statusCodes = ['Listo', 'Entrenando', 'Error']
    try {
      const response = await fetch(server + "/status");
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.status === 0) {
        setServerStatus(statusCodes[0]);
      } else if (responseJson.status === 1) {
        setServerStatus(statusCodes[1]);
      }
      else {
        setServerStatus(statusCodes[2]);
      }
    } catch (error) {
      console.error(error);
    }
    return (
      <Text style={styles.emphasisText}>
        {serverStatus}
      </Text>
    );
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
    getServerStatus();
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
            <Text style={styles.title}>Servidor</Text>
            <Text style={styles.emphasisText}>IP: {server}</Text>
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
      ToastAndroid.show("No se ha seleccionado una imágen", ToastAndroid.SHORT);
      return;
    } else if (imageSent === true) {
      ToastAndroid.show("Ya se ha enviado una imagen", ToastAndroid.SHORT);
      return;
    } else {
      ToastAndroid.show("Enviando imagen", ToastAndroid.SHORT);

      const data = new FormData();

      const name = new Date().getHours().toString()

      if (image.endsWith(".png")) {
        data.append("file", {
          uri: image,
          type: "image/png",
          name: name + ".png",
        });
      } else if (image.endsWith(".jpg")) {
        data.append("file", {
          uri: image,
          type: "image/jpeg",
          name: name + ".jpg",
        });
      } else if (image.endsWith(".jpeg")) {
        data.append("file", {
          uri: image,
          type: "image/jpeg",
          name: name + ".jpeg",
        });
      } else {
        ToastAndroid.show("Formato de imagen no soportado", ToastAndroid.SHORT);
        return;
      }

      setImageSent(true);
      console.log(data);

      try {
        const response = await fetch(server + "/predict", {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const responseJson = await response.json();
        console.log(responseJson);
        setPrediction(responseJson.prediction);
        setImageSent(false); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  const displayPrediction = () => {
    if (prediction === "") {
      return (<Text style={styles.hiddenText}>
        No se ha realizado una predicción
      </Text>);
    } else {
      return (
        <Text style={styles.emphasisText}>
          {prediction}
        </Text>
      );
    }
  }

  const adjustHandler = async () => {
    try {
      const response = await fetch(server + "/adjust");
      const responseJson = await response.json();
      console.log(responseJson);
      ToastAndroid.show("Entrenando modelo", ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
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
      <Pressable style={styles.b2} onPress={() => adjustHandler()}>
        <Text style={styles.textbtn}>Ajustar modelo</Text>
      </Pressable>
      <Pressable style={styles.b3} onPress={() => openModal()}>
        <Text style={styles.textbtn}>Obtener estado del servidor</Text>
      </Pressable>
      <StatusModal />
      <StatusBar style="auto" />
    </View>
  );
}
