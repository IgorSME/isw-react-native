import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MapPin, MessageCircle } from "react-native-feather";
import PostCard from "../../Components/PostCard";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          //   <View style={{ marginBottom: 32 }}>
          //     <Image
          //       source={{ uri: item.photo }}
          //       style={{
          //         width: "100%",
          //         height: 240,
          //         borderRadius: 8,
          //         marginBottom: 8,
          //       }}
          //     />
          //     <Text
          //       style={{
          //         fontFamily: "Roboto-Regular",
          //         fontStyle: "normal",
          //         fontWeight: 500,
          //         fontSize: 16,
          //         lineHeight: 19,
          //         marginBottom: 8,

          //         color: "#212121",
          //       }}
          //     >
          //       Forest
          //     </Text>
          //     <View style={{ flexDirection: "row" }}>
          //       <TouchableOpacity>
          //         <MessageCircle color={"#BDBDBD"} />
          //       </TouchableOpacity>
          //       <TouchableOpacity
          //         style={{ flexDirection: "row", justifyContent: "center" }}
          //       >
          //         <MapPin
          //           color={"#BDBDBD"}
          //           style={{ alignSelf: "center", marginRight: 4 }}
          //         />
          //         <Text>Odessa, Odessa region, Ukraine</Text>
          //       </TouchableOpacity>
          //     </View>
          //   </View>
          <PostCard photo={item.photo} navigation={navigation} />
        )}
      />
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
});
