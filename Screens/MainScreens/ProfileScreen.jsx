import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const [posts, setPosts] = useState([]);
  const { userId, nickname } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
