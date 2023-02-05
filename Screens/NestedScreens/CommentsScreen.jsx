import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CommentsScreen({ route }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.photo }} style={styles.postImage} />
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
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
});
