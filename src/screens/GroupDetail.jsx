import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import GroupData from "../data/GroupData";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getGroupLists } from "../context/GroupContext";
import backGroundImg from "../assets/images/facebook-group-default-cover-photo.jpg";
import { fetchUserInfo } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";

export default function GroupDetail({ route }) {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const { groupId } = route.params;
  const [groupData, setGroupData] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const getGroup = async () => {
      try {
        const data = await getGroupLists();
        setGroupData(data.content);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userInfo.accessToken);
        setImage(data.imageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUserInfo();
    getGroup();
  }, []);

  const group = groupData.find((g) => g.idGroup === groupId);

  if (!group) {
    return null;
  }
  const handlePress = (groupId) => {
    navigation.navigate("NewPostInGroup", { groupId });
  };
  const checkMember = (groupId) => {
    navigation.navigate("GroupMemberListScreen", { groupId });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f0f2f5",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            zIndex: 99,
            position: "absolute",
            left: 20,
            top: 10,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"white"} />
        </TouchableOpacity>
        <Image
          source={backGroundImg}
          style={{
            height: 150,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 28,
            color: "black",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {group.name}
        </Text>
        <TouchableOpacity
          onPress={() => handlePress(group.idGroup)}
          style={{
            backgroundColor: "#1877f2",
            height: 40,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            width: 250,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Edit Group
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#242760",
                fontWeight: "bold",
              }}
            >
              Posts
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#242760",
                fontWeight: "bold",
              }}
            >
              0
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => checkMember(group.idGroup)}
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#242760",
                fontWeight: "bold",
              }}
            >
              Members
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#242760",
                fontWeight: "bold",
              }}
            >
              {group.memberCount}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.push("ProfileScreen")}>
            <Image source={{ uri: image }} style={styles.profileStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => navigation.push("NewPost")}
          >
            <View>
              <Text style={styles.inputStyle}>Write something here...</Text>
              <Text style={styles.inputStyle}>Seven...</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 40 }}
            onPress={() => navigation.push("NewPost")}
          >
            <MaterialIcons name="perm-media" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBg: {
    // backgroundColor: Colors.lightgrey,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  profileStyle: {
    height: 40,
    width: 40,
    marginRight: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: "70%",
    paddingVertical: 3,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});
