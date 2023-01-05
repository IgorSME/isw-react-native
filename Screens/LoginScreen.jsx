import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
//   });
// };

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const onSwitchShowPassword = () => setShowPassword((prevState) => !prevState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onFormSubmit = () => {
    setState(initialState);
    keyboardHide();
    console.log("LoginForm: ", state);
  };
  const onFocusHandler = (textInput) => {
    setIsShowKeyboard(true);
    setIsFocused({
      [textInput]: true,
    });
  };
  const onBlurHandler = (textInput) => {
    setIsFocused({
      [textInput]: false,
    });
  };
  //   if (!isReady) {
  //     return (
  //       <AppLoading
  //         startAsync={loadFonts}
  //         onFinish={() => setIsReady(true)}
  //         onError={console.warn}
  //       />
  //     );
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View
          onLayout={onLayoutRootView}
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 32 : 144,
          }}
        >
          <Text style={styles.textHeader}>Login</Text>

          <TextInput
            value={state.email}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            placeholder="Email address"
            style={
              !isFocused.email
                ? styles.input
                : {
                    ...styles.input,
                    ...styles.focusInput,
                  }
            }
            onFocus={() => onFocusHandler("email")}
            onBlur={() => onBlurHandler("email")}
          />
          <View
            style={
              !isFocused.password
                ? { ...styles.input, marginBottom: 43 }
                : {
                    ...styles.input,
                    ...styles.focusInput,
                    marginBottom: 43,
                  }
            }
          >
            <TextInput
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              placeholder="Password"
              secureTextEntry={showPassword}
              onFocus={() => onFocusHandler("password")}
              onBlur={() => onBlurHandler("password")}
              style={styles.inputPass}
            />
            <TouchableOpacity
              onPress={onSwitchShowPassword}
              style={styles.showBtn}
            >
              <Text style={styles.showBtnText}>
                {showPassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={onFormSubmit}
          >
            <Text style={styles.btnTitle}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.linkTitle}>No account? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
  },
  textHeader: {
    marginHorizontal: 16,
    alignItems: "center",
    height: 35,

    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginBottom: 32,

    color: "#212121",
  },
  input: {
    marginHorizontal: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,

    color: "#212121",
  },
  inputPass: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  showBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  showBtnText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  link: {
    justifyContent: "center",
    height: 19,
    alignItems: "center",
    // marginBottom: 78,
  },
  linkTitle: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  focusInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
  },
});
