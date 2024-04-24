import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { fetchListLike } from "../context/FriendInteractContext";
import { AuthContext } from "../context/AuthContext";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";

const LikeModal = ({ visible, onClose, postId }) => {
  const { userInfo } = useContext(AuthContext);
  const [listLike, setListLike] = useState([]);

  useEffect(() => {
    const getListLike = async () => {
      try {
        const data = await fetchListLike(postId, userInfo.accessToken);
        setListLike(data.content);
      } catch (error) {
        console.error("Error fetching list of likes:", error);
      }
    };
    getListLike();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalText}>All likes</Text>
            <TouchableOpacity onPress={onClose}>
              <VectorIcon
                name="close"
                type="Ionicons"
                size={25}
                color={Colors.headerIconGrey}
              />
            </TouchableOpacity>
          </View>
          {listLike.map((like) => (
            <View key={like.id} style={styles.likeItem}>
              <Image source={{ uri: like.imageUrl }} style={styles.avatar} />
              <Text style={styles.fullName}>{like.fullName}</Text>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "flex-start",
    width: "80%",
  },
  header: {
    flexDirection: "row",

    // justifyContent: "space-between",
    marginBottom: 10,
    gap: 170,
  },
  modalText: {
    fontSize: 18,
  },
  likeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 12,
    marginRight: 10,
  },
  fullName: {
    fontSize: 16,
    marginRight: "auto",
  },
  closeButton: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default LikeModal;
