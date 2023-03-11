import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import formatDate from "../helpers/formatDate";

const Comment = ({ comment }) => {
  const { userId } = useSelector((state) => state.auth);
  const date = formatDate(comment.dateComment);
  const isCommentOwner = userId === comment.userId;
  const avatar = comment.photoURL;
  console.log("avatar", avatar);
  return (
    <View
      style={
        isCommentOwner
          ? { ...styles.container, flexDirection: "row-reverse" }
          : styles.container
      }
    >
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View
        style={
          isCommentOwner
            ? { ...styles.comment, ...styles.commentRight }
            : { ...styles.comment, ...styles.commentLeft }
        }
      >
        <Text style={styles.text}>{comment.comment}</Text>
        <Text
          style={
            isCommentOwner
              ? { ...styles.date, ...styles.dateRight }
              : { ...styles.date, ...styles.dateLeft }
          }
        >
          {date}
        </Text>
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
    borderRadius: 90,
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
  commentLeft: {
    marginLeft: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
  },
  commentRight: {
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
