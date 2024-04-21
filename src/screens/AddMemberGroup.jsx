import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import { fetchAdd } from "../context/GroupChatContext";
import { AuthContext } from "../context/AuthContext";
import { fetchListFriend } from "../context/FriendContext";
import NotificationModal from "../components/NotiModel";

const AddMemberGroup = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [availableMembers, setAvailableMembers] = useState([]);
  const { chatId1, fullname1, img1 } = route.params;
  const [initialMembers, setInitialMembers] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchListFriend(userInfo.accessToken);
        setAvailableMembers(response.content);
        setInitialMembers(response.content);
      } catch (error) {
        console.error("Error user:", error);
      }
    };

    fetchUser();
  }, []);

  const addMember = async (userId) => {
    try {
      await fetchAdd(chatId1, [userId], userInfo.accessToken);
      setAddVisible(true);
    } catch (error) {
      setAddVisible(false);
    } finally {
      setNotificationVisible(true);
    }
  };

  const onSearch = (text) => {
    setSearchValue(text);
    if (text.trim() === "") {
      setAvailableMembers(initialMembers);
    } else {
      const filteredMembers = availableMembers.filter((member) =>
        member.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setAvailableMembers(filteredMembers);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerChat}>
        <View style={styles.headerUser}>
          <TouchableOpacity
            onPress={() =>
              navigation.push("ManageMember", {
                chatId: chatId1,
                fullname: fullname1,
                img: img1,
              })
            }
          >
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", fontSize: 23, marginLeft: 20 }}>
            Choice member
          </Text>
        </View>
      </View>
      <View style={styles.search}>
        <VectorIcon
          name="search1"
          type="AntDesign"
          size={24}
          color={Colors.black}
        />
        <TextInput
          style={{ marginLeft: 5 }}
          placeholder="Search"
          value={searchValue}
          onChangeText={onSearch}
        />
      </View>
      <Text
        style={{ margin: 20, color: "gray", fontWeight: 500, fontSize: 15 }}
      >
        Suggested
      </Text>
      <View>
        {availableMembers.map((friend) => (
          <View key={friend.id} style={styles.info}>
            <View style={styles.info1}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                source={{ uri: friend.imageUrl }}
              />
              <Text style={{ fontWeight: 500, fontSize: 20 }}>
                {friend.fullName}
              </Text>
            </View>
            <TouchableOpacity onPress={() => addMember(friend.id)}>
              <VectorIcon
                name="user-plus"
                type="FontAwesome5"
                size={22}
                color={Colors.headerIconGrey}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <NotificationModal
        isVisible={notificationVisible}
        message={
          addVisible ? "Member added successfully" : "Failed to add member"
        }
        type={addVisible ? "success" : "error"}
        onClose={() => setNotificationVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerChat: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  info1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    padding: 5,
    marginTop: 10,
  },
});

export default AddMemberGroup;
