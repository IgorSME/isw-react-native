import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import Comment from "../../Components/Comment";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { postId } = route.params;
  const { nickname, userId, photoUrl } = useSelector((state) => state.auth);

  const getAllComments = () => {
    const q = query(collection(db, "posts", postId, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allComment = [];
      querySnapshot.forEach((doc) => {
        allComment.push(doc.data());
      });
      setAllComments(allComment);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const sendComment = async () => {
    const addComment = await addDoc(
      collection(db, "posts", postId, "comments"),
      {
        comment,
        nickname,
        userId,
        photoUrl,
        dateComment: Date.now().toString(),
      }
    );
    keyboardHide();
    setComment("");
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          // marginBottom: isShowKeyboard ? 144 : 16,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              source={{ uri: route.params.photo }}
              style={styles.postImage}
            />
            <View style={styles.comments}>
              {allComments.map((item, i) => (
                <Comment key={i} comment={item} />
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            ...styles.inputCommentWrapper,
            // marginBottom: isShowKeyboard ? 144 : 16,
          }}
        >
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            multiline
          />
          <View style={styles.sendBtnWrapper}>
            <TouchableOpacity
              style={{ ...styles.sendBtn, backgroundColor: "#FF6C00" }}
              onPress={sendComment}
            >
              <AntDesign name="arrowup" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  comments: {
    marginTop: 32,
  },
  inputCommentWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    minHeight: 50,
    justifyContent: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 32,
    position: "relative",
  },
  input: {
    padding: 16,
    paddingTop: 17,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,

    color: "#BDBDBD",
  },

  sendBtnWrapper: {
    position: "absolute",
    right: 8,
    top: 0,
    height: "100%",
    justifyContent: "center",
  },
  sendBtn: {
    borderRadius: 90,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
