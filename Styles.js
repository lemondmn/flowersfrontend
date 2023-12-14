import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  emphasisText: {
    fontSize: 18,
    color: "#7114a3",
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: "contain",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7114a3",
  },
  normalText: {
    fontSize: 18,
    color: "black",
  },
  hiddenText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
  },
});
