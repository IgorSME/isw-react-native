import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { MapPin } from "react-native-feather";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    setPhoto(photo.uri);
    console.log("photo", photo.uri);
  };
  const publishPost = async () => {
    const location = await Location.getCurrentPositionAsync();
    navigation.navigate("DefaultPostScreen", { photo });
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

      <Text style={{ ...styles.btnTitle, color: "#BDBDBD", marginBottom: 32 }}>
        Download photo
      </Text>
      <TextInput placeholder="Title..." style={styles.input} />
      <View style={{ ...styles.input, marginBottom: 32, flexDirection: "row" }}>
        <MapPin
          color={"#BDBDBD"}
          style={{ alignSelf: "center", marginRight: 4 }}
        />
        <TextInput
          placeholder="Location..."
          style={{
            fontFamily: "Roboto-Regular",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 19,
          }}
        />
      </View>
      <TouchableOpacity
        // disabled={true}
        // activeOpacity={0.8}
        style={styles.btnDisabled}
        onPress={publishPost}
      >
        <Text style={{ ...styles.btnTitle, color: "#BDBDBD" }}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
});
