import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import { fetchUserGroup } from "../context/GroupChatContext";
import { AuthContext } from "../context/AuthContext";

const ManageMember = ({ route }) => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const { chatId, fullname, img } = route.params;
  useEffect(() => {
    const getAllGroupChat = async () => {
      try {
        const data = await fetchUserGroup(chatId, userInfo.accessToken);
        // setMembers(data.content);
        console.log(data);
      } catch (error) {
        console.log("getAllGroupChat: ", error);
      }
    };
    getAllGroupChat();
  }, [chatId]);

  const removeMemberFromGroup = (memberId) => {
    const index = members.findIndex((member) => member.id === memberId);
    if (index !== -1) {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);

      Alert.alert("Remove Member", "Member removed from group successfully!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerChat}>
        <View style={styles.headerUser}>
          <TouchableOpacity
            onPress={() =>
              navigation.push("MessageDetail", {
                chatId1: chatId,
                fullname1: fullname,
                img1: img,
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
            Members
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 100 }}
          onPress={() =>
            navigation.push("AddMemberGroup", {
              chatId1: chatId,
              fullname1: fullname,
              img1: img,
            })
          }
        >
          <Text style={{ fontWeight: 500, fontSize: 15 }}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        {members.map((member) => (
          <View key={member.id} style={styles.info}>
            <View style={styles.info1}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                source={member.image}
              />
              <Text style={{ fontWeight: 500, fontSize: 20 }}>
                {member.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeMemberFromGroup(member.id)}>
              <VectorIcon
                name="minus"
                type="AntDesign"
                size={24}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerChat: {
    flexDirection: "row",
    marginTop: 25,
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
    marginTop: 10,
  },
  info1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ManageMember;
