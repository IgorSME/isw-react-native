import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MapPin } from "react-native-feather";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.takePhotoContainer}>
        <Image
          source={{}}
          // style={}
        />
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={require("../../assets/images/camera-white.jpg")}
            style={styles.imageCamera}
          />
        </TouchableOpacity>
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
        disabled={true}
        // activeOpacity={0.8}
        style={styles.btnDisabled}
        // onPress={onFormSubmit}
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
    borderRadius: 10,
    justifyContent: "center",

    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderBottomStyle: "solid",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
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
  },
});
