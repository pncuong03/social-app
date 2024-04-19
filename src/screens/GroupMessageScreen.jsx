import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";
import { fetchListFriend } from "../context/FriendContext";
import { AuthContext } from "../context/AuthContext";
import { fetchCreate } from "../context/GroupChatContext";

const GroupMessageScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [listUser, setListUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchListFriend(userInfo.accessToken);
        setListUser(response.content);
      } catch (error) {
        console.error("Error user:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleUserSelection = (user) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const addUserToGroup = (user) => {
    toggleUserSelection(user);
  };

  const createGroup = async () => {
    if (groupName.trim() !== "") {
      try {
        const userIDs = selectedUsers.map((user) => user.id);
        await fetchCreate(groupName, userIDs, userInfo.accessToken);
        Alert.alert("Success", "Create successful group!");
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push("MessageScreen")}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={createGroup}>
          <Text style={styles.chatsText}>Create Group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Text style={styles.chatsText}>GroupName: </Text>
        <View style={styles.searchView}>
          <TextInput
            placeholder="Name group..."
            onChangeText={(text) => setGroupName(text)}
            value={groupName}
          />
        </View>
      </View>

      <View>
        {listUser.map((person, index) => (
          <View key={index} style={styles.peopleView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                source={{ uri: person.imageUrl }}
              />
              <View>
                <Text style={{ fontWeight: "500" }}>{person.fullName}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                selectedUsers.some((u) => u.id === person.id) && {
                  backgroundColor: Colors.borderGrey,
                },
              ]}
              onPress={() => addUserToGroup(person)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    marginTop: 40,
  },
  chatsText: {
    fontWeight: "400",
    fontSize: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
  peopleView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 5,
  },
  addButton: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 15,
    marginRight: 10,
  },
  addButtonText: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default GroupMessageScreen;
