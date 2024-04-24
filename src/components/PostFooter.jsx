import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Picker,
} from "react-native";
import Like from "../assets/images/like.jpeg";
import { AuthContext } from "../context/AuthContext";
import {
  fetchLike,
  fetchUnLike,
  fetchShare,
} from "../context/FriendInteractContext";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import LikeModal from "./LikeModel";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";

const PostFooter = ({ data, user }) => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [commentCount, setCommentCount] = useState(data.commentCount);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [shareCount, setShareCount] = useState(data.shareCount);

  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [caption, setCaption] = useState("");
  const [privacyOption, setPrivacyOption] = useState("PUBLIC");
  useEffect(() => {
    if (data.hasLike) {
      setIsLiked(true);
    }
    if (data.hasShare) {
      setIsShared(true);
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

  const onShare = async () => {
    try {
      setShareModalVisible(true);
    } catch (error) {
      console.error("Error share post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await fetchShare(data.id, caption, privacyOption, userInfo.accessToken);
      setIsShared(true);
      setShareCount((prevCount) => prevCount + 1);
      setShareModalVisible(false);
    } catch (error) {
      console.error("Error share post:", error);
    }
  };

  const onLikePress = () => {
    setIsLikeModalVisible(true);
  };

  const onCloseLikeModal = () => {
    setIsLikeModalVisible(false);
  };

  const onCloseShareModal = () => {
    setShareModalVisible(false);
  };

  const handlePrivacyOption = (value) => {
    setPrivacyOption(value === "PUBLIC" ? "PUBLIC" : "PRIVATE");
  };

  return (
    <View style={styles.postFooterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onLikePress}>
            <Image source={Like} style={styles.reactionIcon} />
          </TouchableOpacity>
          <Text style={styles.reactionCount}>{likeCount}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.reactionCount}>{commentCount} comment</Text>
          <TouchableOpacity onPress={onShare}>
            <Text style={styles.reactionCount}>{shareCount} share</Text>
          </TouchableOpacity>
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
          onPress={() => {
            navigation.push("CommentDetail", {
              postId: data.id,
              data1: data,
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
        <TouchableOpacity onPress={onShare}>
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
      {isLikeModalVisible && (
        <LikeModal
          visible={isLikeModalVisible}
          onClose={onCloseLikeModal}
          postId={data.id}
        />
      )}

      <Modal
        visible={shareModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onCloseShareModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                />
                <Text style={styles.modalText}>{user?.fullName}</Text>
              </View>
              <TouchableOpacity onPress={onCloseShareModal}>
                <VectorIcon
                  name="close"
                  type="Ionicons"
                  size={25}
                  color={Colors.grey}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rows}>
              <MenuProvider>
                <Menu onSelect={handlePrivacyOption}>
                  <MenuTrigger
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 50,
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 30,
                      width: 100,
                      backgroundColor: Colors.lightgrey,
                    }}
                  >
                    <VectorIcon
                      name="user-friends"
                      type="FontAwesome5"
                      size={20}
                    />
                    <Text>{privacyOption}</Text>
                  </MenuTrigger>
                  <MenuOptions
                    style={{
                      flexDirection: "column",
                      gap: -8,
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 50,
                    }}
                  >
                    <MenuOption value={"PUBLIC"}>
                      <Text>PUBLIC</Text>
                    </MenuOption>
                    <MenuOption value={"PRIVATE"}>
                      <Text>PRIVATE</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </MenuProvider>
            </View>
            <TextInput
              style={styles.captionInput}
              onChangeText={(text) => setCaption(text)}
              value={caption}
              placeholder="Write something about this content..."
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={handleShare}>
                <Text style={styles.modalButton}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  rows: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
  },
  captionInput: {
    height: 40,
    marginBottom: 10,
    fontSize: 15,
  },
  modalButton: {
    fontSize: 20,
  },
});

export default PostFooter;
