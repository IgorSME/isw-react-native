import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const Avatar = ({ isEmpty, navigation, isAuth }) => {
  const chooseAvatar = () => {
    navigation.navigate("CreateAvatarScreen", { isAuth: isAuth });
  };
  const { photoURL } = useSelector((state) => state.auth);

  const avatar = <Image source={{ uri: photoURL }} style={styles.avatarImg} />;

  const addBtn = isEmpty ? (
    <Text style={styles.avatarInputBtnTextEmpty}>+</Text>
  ) : (
    <Text
      style={{
        ...styles.avatarInputBtnTextEmpty,
        ...styles.avatarInputBtnText,
      }}
    >
      +
    </Text>
  );

  return (
    <View style={styles.avatarInput}>
      {avatar}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={chooseAvatar}
        style={{
          ...styles.avatarInputBtn,
          borderColor: isEmpty ? "#FF6C00" : "#E8E8E8",
        }}
      >
        {addBtn}
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarInput: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",

    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 16,
    resizeMode: "contain",
  },
  avatarInputBtn: {
    flex:1,
    position: "absolute",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 90,
    borderColor: "#FF6C00",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    right: -12.5,
    bottom: 20,
  },
  avatarInputBtnTextEmpty: {
    color: "#FF6C00",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 26,
    lineHeight: 26,
  },
  avatarInputBtnText: {
    color: "#E8E8E8",
    transform: [{ rotate: "45deg" }],
  },
});
