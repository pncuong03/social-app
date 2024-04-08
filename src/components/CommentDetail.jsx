import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
  fetchComment,
  fetchDetailPost,
} from "../context/FriendInteractContext";
import PostHeader from "./PostHeader";
import Carousel from "react-native-snap-carousel";
import PostFooter from "./PostFooter";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import TimeComparison from "../utils/Time";

const CommentDetail = ({ route }) => {
  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
  const { postId, data1 } = route.params;
  const windowWidth = Dimensions.get("window").width;
  const [commentText, setCommentText] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentCount, setCommentCount] = useState([]);

  useEffect(() => {
    const getPostDetail = async (postId) => {
      try {
        const data = await fetchDetailPost(postId, userInfo.accessToken);
        const sortedComments = data.comments.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setListComment(sortedComments);
      } catch (error) {
        console.log("getPostDetail error: ", error);
      }
    };
    getPostDetail(postId);
  }, [postId]);

  const onComment = async () => {
    if (commentText.trim() !== "") {
      try {
        await fetchComment(postId, commentText, userInfo.accessToken);

        const updatedPost = await fetchDetailPost(postId, userInfo.accessToken);

        const newComments = updatedPost.comments;

        const filteredNewComments = newComments.filter((newComment) => {
          return !listComment.find((existingComment) => {
            return existingComment.id === newComment.id;
          });
        });

        const updatedComments = [...filteredNewComments, ...listComment];

        setListComment(updatedComments);

        setCommentText("");
      } catch (error) {
        console.error("Error commenting:", error);
      }
    }
  };
  return (
    <ScrollView style={styles.postContainer}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push("MainScreen")}
          style={{ marginLeft: 5, marginTop: 10 }}
        >
          <VectorIcon
            name="left"
            type="AntDesign"
            size={25}
            color={Colors.borderGrey}
          />
        </TouchableOpacity>

        <PostHeader data={data1} />

        <Carousel
          data={data1.imageUrls || []}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={[styles.postImg, { width: windowWidth }]}
            />
          )}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
        <PostFooter data={data1} />

        <View style={styles.commentInputContainer}>
          <TextInput
            placeholder="Write a comment..."
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity onPress={onComment}>
            <VectorIcon
              name="caretright"
              type="AntDesign"
              size={27}
              color={Colors.borderGrey}
            />
          </TouchableOpacity>
        </View>

        <View>
          {listComment.map((data, index) => (
            <View
              key={index.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  margin: 8,
                }}
              >
                <Image
                  source={{ uri: data.imageUrl }}
                  style={styles.userProfile}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.commentContent}>
                    <Text style={styles.username}>{data.fullName}</Text>
                    <Text style={styles.commentText}>{data.comment}</Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.borderGrey,
                      marginLeft: 5,
                    }}
                  >
                    <TimeComparison time={data.createdAt} />
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <VectorIcon
                  name="close"
                  type="AntDesign"
                  size={20}
                  color={Colors.borderGrey}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  postImg: {
    height: 250,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 20,
  },
  commentInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
  },
  commentSubmit: {
    color: "#384CFF",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  commentText: {
    marginTop: 5,
    fontSize: 10,
    color: "black",
  },

  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 12,
    color: Colors.textColor,
    fontWeight: "500",
  },
  commentContent: {
    backgroundColor: Colors.lightgrey,
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    width: "auto",
    padding: 7,
    height: 50,
  },
});

export default CommentDetail;
