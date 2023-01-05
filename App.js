import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./Components/router";
import { StyleSheet, View, ImageBackground } from "react-native";

export default function App() {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
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
{
  /* <View style={styles.container}>
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
</View>; */
}
