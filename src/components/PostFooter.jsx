import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Like from "../assets/images/like.jpeg";
import Post1 from "../assets/images/post1.jpeg";
import { AuthContext } from "../context/AuthContext";
import {
  fetchLike,
  fetchComment,
  fetchUnLike,
  fetchPostDetail,
  fetchShare,
} from "../context/FriendInteractContext";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";

const PostFooter = ({ data }) => {
  const { userInfo } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const [commentCount, setCommentCount] = useState(data.commentCount);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [shareCount, setShareCount] = useState(data.shareCount);

  const [commentText, setCommentText] = useState("");
  const [listComment, setListComment] = useState([data.comments]);

  // useEffect(() => {
  //   const postDetail = async (postId) => {
  //     try {
  //       const postData = await fetchPostDetail(postId, userInfo.accessToken);
  //       setListComment(postData);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   postDetail();
  // }, []);
  // console.log(listComment);

  // const post = postDetail(data.id);

  const onLike = async (postId) => {
    try {
      await fetchLike(postId, userInfo.accessToken);
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error like post:", error);
    }
  };
  const onUnLike = async (postId) => {
    try {
      await fetchUnLike(postId, userInfo.accessToken);
      setIsLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error like post:", error);
    }
  };

  const onShare = async (postId) => {
    try {
      await fetchShare(postId, userInfo.accessToken);
      setIsShared(false);
      setShareCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error like post:", error);
    }
  };

  const onComment = async (postId, comment) => {
    if (commentText.trim() !== "") {
      try {
        await fetchComment(postId, comment, userInfo.accessToken);
        const newComment = { text: commentText };
        setListComment([...listComment, newComment]);
        setCommentCount((prevCount) => prevCount + 1); // Tăng commentCount lên 1
        setCommentText(""); // Xóa nội dung trong ô nhập comment sau khi gửi thành công
      } catch (error) {
        console.error("Error commenting:", error);
      }
    }
  };
  return (
    <View style={styles.postFooterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Image source={Like} style={styles.reactionIcon} />
          </TouchableOpacity>
          <Text style={styles.reactionCount}>{likeCount} like</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.reactionCount}>{commentCount} comment</Text>
          <Text style={styles.reactionCount}>{shareCount} share</Text>
        </View>
      </View>

      <View style={styles.userActionSec}>
        <TouchableOpacity
          onPress={() => (isLiked ? onUnLike(data.id) : onLike(data.id))}
        >
          <View style={styles.row}>
            <VectorIcon
              name={isLiked ? "like1" : "like2"}
              type="AntDesign"
              size={25}
              color={isLiked ? "#384CFF" : Colors.grey}
            />
            <Text style={styles.reactionCount}>Like</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCommented(!isCommented)}>
          <View style={styles.row}>
            <VectorIcon
              name={isCommented ? "chatbox-sharp" : "chatbox-outline"}
              type="Ionicons"
              size={25}
              color={isCommented ? "#384CFF" : Colors.grey}
            />
            <Text style={styles.reactionCount}>Comment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare(data.id)}>
          <View style={styles.row}>
            <VectorIcon
              name={isShared ? "arrow-redo-sharp" : "arrow-redo-outline"}
              type="Ionicons"
              size={25}
              color={isShared ? "#384CFF" : Colors.grey}
            />
            <Text style={styles.reactionCount}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isCommented && (
        <View style={styles.commentInputContainer}>
          <TextInput
            placeholder="Write a comment..."
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity onPress={() => onComment(data.id, commentText)}>
            <Text style={styles.commentSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* 
      {isCommented && (
        <View>
          {listComment.map((commentt, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                margin: 8,
              }}
            >
              <Image source={Post1} style={styles.userProfile} />
              <View style={styles.commentContent}>
                <Text style={styles.username}>{data.name}</Text>
                <Text style={styles.commentText}>{commentt.}</Text>
              </View>
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  postFotterContainer: {
    padding: 16,
  },
  reactionCount: {
    color: Colors.grey,
    fontSize: 14,
    paddingLeft: 5,
  },
  footerReactionSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    padding: 15,
  },
  userActionSec: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
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

export default PostFooter;