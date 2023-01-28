import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MapPin, MessageCircle } from "react-native-feather";

export default function PostCard({ photo, navigation }) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Image source={{ uri: photo }} style={styles.postImage} />
      <Text style={styles.textComment}>Forest</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <MessageCircle color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.commentsCount}>0</Text>
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <MapPin
            color={"#BDBDBD"}
            style={{ alignSelf: "center", marginRight: 4 }}
          />
          <Text style={styles.textLocation}>
            Odessa, Odessa region, Ukraine
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  textComment: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,

    color: "#212121",
  },
  textLocation: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
});
