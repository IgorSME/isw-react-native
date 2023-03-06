import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
      <View style={styles.comment}>
        <Text style={styles.text}>{comment.comment}</Text>
        <Text style={styles.commentDate}>{comment.dateComment}</Text>
      </View>
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 8,
    width: 28,
    height: 28,
  },
  comment: {
    padding: 16,
    flexShrink: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  leftComment: {
    marginLeft: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
  },
  rightComment: {
    marginRight: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  date: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",

    color: "#BDBDBD",
  },
  dateRight: {
    textAlign: "right",
  },
  dateLeft: {
    textAlign: "left",
  },
});
