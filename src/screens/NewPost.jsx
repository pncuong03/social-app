import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
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
import { Colors } from "../utils/Colors";
import avatar from "../assets/images/img1.jpeg";

export default function NewPost() {
  const navigation = useNavigation();
  const [privacyOption, setPrivacyOption] = useState("public");
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState("");
  const handlePrivacyOption = (value) => {
    console.log("Privacy option selected:", value);
    setPrivacyOption(value === "public" ? "public" : "friends");
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
              source={avatar}
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
              Nguyễn Thị C
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
                <MenuOption value={"public"}>
                  <Text>public</Text>
                </MenuOption>
                <MenuOption value={"friends"}>
                  <Text>friends</Text>
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
          {image && (
            <Image
              source={{ uri: image }}
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
