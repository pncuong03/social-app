import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  fetchDeleteMemberGroup,
  fetchLeaveGroup,
  getMemberGroup,
} from "../context/GroupContext";
import { AuthContext } from "../context/AuthContext";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import NotificationModal from "../components/NotiModel";

export default function GroupMemberListScreen({ route }) {
  const { userInfo } = useContext(AuthContext);
  const { groupId } = route.params;
  const navigation = useNavigation();

  const [memberGroup, setMemberGroup] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  useEffect(() => {
    try {
      const getMember = async () => {
        const data = await getMemberGroup(groupId, userInfo.accessToken);
        setMemberGroup(data.content);
      };
      getMember();
    } catch (error) {
      console.log("getMemberGroup : ", error);
    }
  }, []);

  const onDelete = async (userId) => {
    try {
      await fetchDeleteMemberGroup(groupId, userId, userInfo.accessToken);
      setMemberGroup((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );
      setDeleteVisible(true);
    } catch (error) {
      setDeleteVisible(false);
    } finally {
      setNotificationVisible(true);
    }
  };

  const onLeave = async () => {
    try {
      await fetchLeaveGroup(groupId, userInfo.accessToken);
    } catch (error) {}
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.push("GroupDetail", { groupId })}
        >
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("AddMember", { groupId })}
        >
          <Text style={{ fontWeight: 500, fontSize: 18 }}>Add</Text>
        </TouchableOpacity>
      </View>
      {memberGroup
        .filter((member) => member.role === "ADMIN")
        .map((member) => (
          <View key={member.id} style={styles.adminContainer}>
            <Image
              source={{ uri: member.imageUrl }}
              style={styles.adminImage}
            />
            <Text style={styles.adminText}>{member.fullName} - ADMIN</Text>
          </View>
        ))}
      <Text style={styles.membersTitle}>Members:</Text>
      {memberGroup
        .filter((member) => member.role !== "ADMIN")
        .map((member) => (
          <View key={member.id} style={styles.memberContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: member.imageUrl }}
                style={styles.memberImage}
              />
              <Text style={styles.memberText}>{member.fullName}</Text>
            </View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => onDelete(member.id)}
            >
              <VectorIcon
                name="user-minus"
                type="FontAwesome5"
                size={22}
                color={Colors.headerIconGrey}
              />
            </TouchableOpacity>
          </View>
        ))}
      <TouchableOpacity
        style={styles.leaveGroupButton}
        onPress={() => {
          navigation.push("Group for you");
          onLeave();
        }}
      >
        <Text style={styles.leaveGroupText}>Leave group</Text>
      </TouchableOpacity>
      <NotificationModal
        isVisible={notificationVisible}
        message={
          deleteVisible
            ? "Member deleted successfully"
            : "Failed to delete member"
        }
        type={deleteVisible ? "success" : "error"}
        onClose={() => setNotificationVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25,
  },
  adminContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  adminImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  adminText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 10,
  },
  leaveGroupButton: {
    backgroundColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  leaveGroupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
