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
import { fetchDelete, fetchUserGroup } from "../context/GroupChatContext";
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
        setMembers(data);
      } catch (error) {
        console.log("getAllGroupChat: ", error);
      }
    };
    getAllGroupChat();
  }, [chatId]);

  const deleteMember = async (userId) => {
    try {
      await fetchDelete(chatId, userId, userInfo.accessToken);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );
      Alert.alert("Success", "Member deleted from group successfully!");
    } catch (error) {
      Alert.alert("Fail", "Members have been deleted from the group!");
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
                source={{ uri: member?.imageUrl }}
              />
              <Text style={{ fontWeight: 500, fontSize: 20 }}>
                {member?.fullName}
              </Text>
            </View>
            {member.role === "MEMBER" ? (
              <TouchableOpacity onPress={() => deleteMember(member.id)}>
                <VectorIcon
                  name="user-minus"
                  type="FontAwesome5"
                  size={22}
                  color={Colors.headerIconGrey}
                />
              </TouchableOpacity>
            ) : (
              <VectorIcon
                name="admin-panel-settings"
                type="MaterialIcons"
                size={30}
                color={Colors.headerIconGrey}
              />
            )}
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
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
  },
  info1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ManageMember;
