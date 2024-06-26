import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  Alert,
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
import * as FileSystem from "expo-file-system";
import { Colors } from "../utils/Colors";
import avatar from "../assets/images/img1.jpeg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserInfo } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import { userPost } from "../context/PostContext";
import { createPostInGroup } from "../context/GroupContext";
export default function NewPostInGroup({route}) {
  const { userInfo } = useContext(AuthContext);
  const { groupId } = route.params;
  console.log(groupId);

  const navigation = useNavigation();
  const [privacyOption, setPrivacyOption] = useState("PUBLIC");
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userInfo.accessToken);
        // console.log(data);
        setImage(data.imageUrl);
        setName(data.fullName);
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
      aspect: [16, 20],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const createPost = async () => {
    let formData = new FormData();
    formData.append(
      "post_information",
      JSON.stringify({
        content: postContent,
        groupId: groupId,
      })
    );
    selectedImages.forEach((imageUri, index) => {
      let file = {
        uri: imageUri,
        type: `image/${imageUri.split(".").pop()}`,
        name: `image${index}.${imageUri.split(".").pop()}`,
      };
      formData.append("images", file);
    });
    try {
      const response = await createPostInGroup(userInfo.accessToken, formData);
      console.log(response.status);
      if (response.status === 200) {
        Alert.alert("Success", "Post Success");
        navigation.navigate("GroupDetail", { groupId });
      } else {
        Alert.alert("Error", "Failed to success");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          </View>
        </View>
        <TextInput
          style={{ height: 40, marginTop: 10, fontSize: 20 }}
          onChangeText={(text) => setPostContent(text)}
          value={postContent}
          placeholder="What's on your mind?"
        />
         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {selectedImages.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={{ width: selectedImages.length === 2 ? '49%' : '30%', height: 200, margin: '0.5%' }}
            />
          ))}
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