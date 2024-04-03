import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  Alert
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { Colors } from "../utils/Colors";
import avatar from "../assets/images/img1.jpeg";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserInfo } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import { userPost } from "../context/PostContext";
export default function NewPost() {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [privacyOption, setPrivacyOption] = useState("PUBLIC");
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userInfo.accessToken);
        // console.log(data);
        setImage(data.imageUrl);
        setName(data.fullName)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUserInfo();
  }, []);
  const handlePrivacyOption = (value) => {
    console.log("Privacy option selected:", value);
    setPrivacyOption(value === "PUBLIC" ? "PUBLIC" : "PRIVATE");
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    let formData = new FormData();
    formData.append('createPostInputString', JSON.stringify({
      content: postContent,
      state: privacyOption,
    }));
    let file = { uri: selectedImage, type: `image/${selectedImage.split('.').pop()}`, name: `image.${selectedImage.split('.').pop()}` };
    formData.append('images', file);
    try {
      const response = await userPost(userInfo.accessToken, formData);
      console.log(response.status);
      if (response.status === 200) {
        Alert.alert('Success', 'Post Success');
      } else {
        Alert.alert('Error', 'Failed to success');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <MenuProvider>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.push("MainScreen")}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={"black"}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Create a post</Text>
          <Pressable
            onPress={createPost}
            style={({ pressed }) => ({
              display: "flex",
              alignItems: "center",
              width: "23%",
              marginTop: 10,
              backgroundColor: postContent ? "#4267B2" : Colors.borderGrey,
              borderRadius: 15,
              padding: 8,
              margin: 5,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <Text
              style={{
                textAlign: "center",
                color: postContent ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginRight: 10,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 5,
                fontSize: 16,
              }}
            >
              {name}
            </Text>
            <Menu onSelect={handlePrivacyOption}>
              <MenuTrigger>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <VectorIcon
                    name="lock"
                    type="FontAwesome"
                    size={20}
                    color={"blue"}
                  />
                  <Text style={{ marginLeft: 5 }}>{privacyOption}</Text>
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value={"PUBLIC"}>
                  <Text>PUBLIC</Text>
                </MenuOption>
                <MenuOption value={"PRIVATE"}>
                  <Text>PRIVATE</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <TextInput
          style={{ height: 40, marginTop: 10, fontSize: 20 }}
          onChangeText={(text) => setPostContent(text)}
          value={postContent}
          placeholder="What's on your mind?"
        />
        <View>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: 240, marginVertical: 20 }}
            />
          )}
        </View>
        <Pressable
          style={{
            flexDirection: "coloumn",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Pressable
            onPress={pickImage}
            style={{
              widt: 40,
              height: 40,
              marginTop: 15,
              backgroundColor: "#E0E0E0",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="perm-media" size={24} color="black" />
          </Pressable>

          <Text>Media</Text>
        </Pressable>
      </View>
    </MenuProvider>
  );
}