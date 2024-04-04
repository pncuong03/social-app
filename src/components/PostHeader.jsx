import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import TimeComparison from "../utils/Time"; // Import TimeComparison component

const PostHeader = ({ data, onClose }) => {
  const navigation = useNavigation();

  const handleClose = () => {
    onClose();
  };

  const handlePress = (friendId) => {
    navigation.navigate('FriendProfile', { friendId });
};
  return (
    <View style={styles.postHeaderContainer}>
      <View key={data.id}>
        <View style={styles.postTopSec}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => handlePress(data.userId)}
          >
            <Image source={{ uri: data.imageUrl }} style={styles.userProfile} />
            <View style={styles.userSection}>
              <Text style={styles.username}>{data.fullName}</Text>

              <View style={styles.row}>
                <Text style={styles.days}>
                  <TimeComparison time={data.createdAt} />
                </Text>
                <Text style={styles.dot}>•</Text>
                <VectorIcon
                  name="user-friends"
                  type="FontAwesome5"
                  size={13}
                  color={Colors.headerIconGrey}
                  style={styles.userIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleClose}>
            <VectorIcon
              name="close"
              type="Ionicons"
              size={25}
              color={Colors.headerIconGrey}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.caption}>{data.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postHeaderContainer: {
    padding: 16,
  },
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
  },
  postTopSec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontSize: 16,
    color: Colors.textColor,
    marginBottom: 2,
    fontWeight: "600",
  },
  userSection: {
    marginLeft: 12,
  },
  days: {
    fontSize: 14,
    color: Colors.textGrey,
  },
  dot: {
    fontSize: 14,
    color: Colors.textGrey,
    paddingHorizontal: 8,
  },
  userIcon: {
    marginTop: 3,
  },
  headerIcons: {
    marginRight: 20,
  },
  caption: {
    color: Colors.grey,
    fontSize: 15,
    marginTop: 10,
  },
});

export default PostHeader;
