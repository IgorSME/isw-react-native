import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Registration");
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/image-bcg.jpg")}
      >
        {currentScreen === "Registration" ? (
          <RegistrationScreen changePage={setCurrentScreen} />
        ) : (
          <LoginScreen changePage={setCurrentScreen} />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
