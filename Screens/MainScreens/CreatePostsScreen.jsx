import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MapPin, Trash2 } from "react-native-feather";

const initialState = {
  title: "",
  locationTitle: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardShow", () => {
      setIsShowKeyboard(true);
    });
    const keyboardHideListener = Keyboard.addListener("keyboardHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
    // console.log("photo", photo.uri);
  };
  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  const publishPost = async () => {
    const location =
      (await Location.getLastKnownPositionAsync()) ||
      Location.getCurrentPositionAsync();
    // console.log("location", location);
    const coordsCurrent = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    navigation.navigate("DefaultPostScreen", { state, photo, coordsCurrent });
    setState(initialState);
    setPhoto(null);
  };
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={{ ...styles.container, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "flex-end" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View style={styles.takePhotoContainer}>
            <Camera style={styles.camera} type={type} ref={setCamera}>
              {photo && (
                <View>
                  <Image
                    source={{ uri: photo }}
                    // style={{ height: 200, width: 200 }}
                  />
                </View>
              )}
              <TouchableOpacity activeOpacity={0.6} onPress={takePhoto}>
                <Image
                  source={require("../../assets/images/camera.png")}
                  style={styles.imageCamera}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          <TouchableOpacity onPress={imagePick}>
            <Text
              style={{ ...styles.btnTitle, color: "#BDBDBD", marginBottom: 32 }}
            >
              Download photo
            </Text>
          </TouchableOpacity>

          <TextInput
            value={state.title}
            placeholder="Title..."
            style={styles.input}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
          <View
            style={{
              ...styles.input,
              marginBottom: 32,
              flexDirection: "row",
            }}
          >
            <MapPin
              color={"#BDBDBD"}
              style={{ alignSelf: "center", marginRight: 4 }}
            />
            <TextInput
              value={state.locationTitle}
              placeholder="Location..."
              style={{
                fontFamily: "Roboto-Regular",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 19,
              }}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  locationTitle: value,
                }))
              }
            />
          </View>
          <TouchableOpacity
            disabled={!photo && !state.title && !state.locationTitle}
            activeOpacity={0.8}
            style={
              !state.title && !state.locationTitle && !photo
                ? styles.btnDisabled
                : styles.btn
            }
            onPress={publishPost}
          >
            <Text
              style={
                !photo && !state.title && !state.locationTitle
                  ? { ...styles.btnTitle, ...styles.btnTitleDisabled }
                  : styles.btnTitle
              }
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View style={isShowKeyboard ? { display: "none" } : styles.trashTab}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Trash2 name="trash" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  takePhotoContainer: {
    height: 240,
    width: "100%",
    justifyContent: "center",

    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  camera: {
    height: 240,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderBottomStyle: "solid",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,

    color: "#212121",
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
  btnDisabled: {
    justifyContent: "center",
    alignItems: "center",

    height: 51,
    backgroundColor: "#F6F6F6",
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
  btnTitleDisabled: {
    color: "#BDBDBD",
  },
  imageCamera: {
    // position: "absolute",
    borderRadius: 50,
    alignSelf: "center",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
  },
  trashTab: {
    position: "absolute",
    bottom: 34,
    width: "100%",
  },
  deleteBtn: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginBottom: 8,
  },
});
