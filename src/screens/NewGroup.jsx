import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { fetchListFriend } from "../context/FriendContext";
import { AuthContext } from "../context/AuthContext";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { createNewPost } from "../context/GroupContext";

export default function NewGroup() {
  const { userInfo } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.1.204:8080/api/v1/tag")
      .then((response) => setTags(response.data.content))
      .catch((error) => console.error(error));
  }, []);

  const handleMemberSelection = (member) => {
    setSelectedMember((prevState) => {
      if (prevState.includes(member)) {
        return prevState.filter((m) => m !== member);
      } else {
        return [...prevState, member];
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriends = async () => {
        try {
          const friendsData = await fetchListFriend(userInfo.accessToken);
          setFriends(friendsData.content);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchFriends();
    }, [])
  );

  console.log(selectedMember);

  const createGroup = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://192.168.1.204:8080/api/v1/group/create-group",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        data: {
          name: name,
          userIds: selectedMember.map((member) => member.id),
          tagIds: [selectedTag],
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Create group successfully");
      } else {
        Alert.alert("Error", "Failed to create group ");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  console.log(friends);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f0f2f5" }}>
      <View style={{ paddingHorizontal: 22, paddingTop: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          Create New Group
        </Text>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Group Name</Text>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            style={{
              height: 44,
              width: "100%",
              borderColor: "#ccd0d5",
              borderWidth: 1,
              borderRadius: 6,
              marginVertical: 10,
              paddingLeft: 8,
              backgroundColor: "#ffffff",
            }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Tag</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedTag(value)}
            items={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
            style={{
              inputIOS: {
                height: 44,
                width: "100%",
                borderColor: "#ccd0d5",
                borderWidth: 1,
                borderRadius: 6,
                marginVertical: 10,
                paddingLeft: 8,
                backgroundColor: "#ffffff",
              },
              inputAndroid: {
                height: 44,
                width: "100%",
                borderColor: "#ccd0d5",
                borderWidth: 1,
                borderRadius: 6,
                marginVertical: 10,
                paddingLeft: 8,
                backgroundColor: "#ffffff",
              },
            }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Add member:</Text>
          <ScrollView>
            {friends.map((member) => (
              <View
                key={member.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Switch
                  value={selectedMember.includes(member)}
                  onValueChange={() => handleMemberSelection(member)}
                />
                <Image
                  source={{ uri: member.imageUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 18 }}>{member.fullName}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={createGroup}
            style={{
              backgroundColor: "#1877f2",
              height: 44,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
