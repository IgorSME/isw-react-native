import React, { useState } from "react";
import Avatar from "../Components/Avatar";
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
  Linking,
  Image,
  ImageBackground,
} from "react-native";
import { authSignUpUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const dispatch = useDispatch();

  const onSwitchShowPassword = () => setShowPassword((prevState) => !prevState);

  const onPressAddPhoto = () => Linking.openURL("http://google.com");
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onFormSubmit = () => {
    dispatch(authSignUpUser(state));
    keyboardHide();
    console.log("RegistrationForm: ", state);
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

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/image-bcg.jpg")}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
              {/* <View style={styles.addPhoto}>
                <Image source={{ url: "" }} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.add}
                  onPress={onPressAddPhoto}
                >
                  <Image source={require("../assets/images/add.jpg")} />
                </TouchableOpacity>
              </View> */}
              <Avatar
                isEmplty={true}
                navigation={navigation}
                isRegestration={true}
              />
              <Text style={styles.textHeader}>Registration</Text>
              <TextInput
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
                placeholder="Login"
                style={
                  !isFocused.login
                    ? styles.input
                    : {
                        ...styles.input,
                        ...styles.focusInput,
                      }
                }
                onFocus={() => onFocusHandler("login")}
                onBlur={() => onBlurHandler("login")}
              />
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
                <Text style={styles.btnTitle}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.link}>
                <Text style={styles.linkTitle}>
                  Already have an account?{" "}
                  <Text
                    style={{ color: "#212121" }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
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
  },
  linkTitle: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  addPhoto: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    top: -60,
  },
  add: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    left: 107,
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
