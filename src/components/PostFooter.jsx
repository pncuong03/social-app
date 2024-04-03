import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Like from "../assets/images/like.jpeg";
import { AuthContext } from "../context/AuthContext";
import {
  fetchLike,
  fetchComment,
  fetchUnLike,
  fetchShare,
} from "../context/FriendInteractContext";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";

const PostFooter = ({ data }) => {
  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const [commentCount, setCommentCount] = useState(data.commentCount);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [shareCount, setShareCount] = useState(data.shareCount);

  useEffect(() => {
    if (data.hasLike) {
      setIsLiked(true);
    }
  }, []);

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
        <TouchableOpacity
          // onPress={() => {
          //   getPostDetail(data.id);
          //   setIsCommented(!isCommented);
          // }}
          onPress={() => {
            navigation.push("CommentDetail", {
              postId: data.id,
              data: data,
            });
          }}
        >
          <View style={styles.row}>
            <VectorIcon
              name="chatbox-outline"
              type="Ionicons"
              size={25}
              color={Colors.grey}
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
});

export default PostFooter;
