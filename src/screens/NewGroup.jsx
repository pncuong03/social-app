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
import * as ImagePicker from "expo-image-picker";
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

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
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
  return (
    <View style={{ marginTop: 100 }}>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 22,
          paddingHorizontal: 22,
        }}
      >
        <TouchableOpacity onPress={handleImageSelection}>
          <View
            style={{
              height: 170,
              width: 170,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#242760",
              overflow: "hidden",
              marginTop: -90,
            }}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            ) : null}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons name="photo-camera" size={32} color={"#242760"} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 22 }}>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Group Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 22 }}>
        <Text style={{ fontSize: 16 }}>Select Tag</Text>
        <View
          style={{
            height: 44,
            width: "100%",
            borderColor: "rgba(84, 76, 76, 0.14)",
            borderWidth: 1,
            borderRadius: 4,
            marginVertical: 6,
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setSelectedTag(value)}
            items={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 22 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Add member:</Text>
        <ScrollView>
          {friends.map((member) => (
            <View
              key={member.id}
              style={{ flexDirection: "row", alignItems: "center" }}
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
      <View style={{ paddingHorizontal: 22 }}>
        <TouchableOpacity
          onPress={createGroup}
          style={{
            backgroundColor: "black",
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
