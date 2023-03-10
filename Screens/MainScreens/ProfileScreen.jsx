import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Avatar from "../../Components/Avatar";
import PostCard from "../../Components/PostCard";
import { LogOut } from "react-native-feather";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userId, nickname } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getAllPosts = () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), postId: doc.id });
      });
      setPosts(allPosts);
      // console.log("posts", posts);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/image-bcg.jpg")}
      >
        <View style={styles.screen}>
          <Avatar isEmpty={false} navigation={navigation} isAuth={true} />
          <TouchableOpacity
            onPress={signOut}
            activeOpacity={0.6}
            style={styles.logout}
          >
            <LogOut color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.title}>{nickname}</Text>

          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                // isHiddenLikes={false}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, i) => i}
            style={{ marginBottom: 0 }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
  },
  screen: {
    backgroundColor: "#fff",

    // justifyContent: "flex-end",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "visible",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  logout: {
    position: "absolute",
    marginHorizontal: 16,
    right: 0,
    top: 22,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginBottom: 32,
    color: "#212121",
  },
});
