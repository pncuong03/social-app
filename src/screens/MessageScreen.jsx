import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";
import ChatHeader from "../components/ChatHeader";
import { AuthContext } from "../context/AuthContext";
import TimeComparison from "../utils/Time";
import { fetchUserChat } from "../context/ChatContext";
import { fetchUserInfo } from "../context/ProfileContext";

const MessageScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [listChat, setListChat] = useState([]);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userInfo.accessToken);
        setImage(data.imageUrl);
        setUser(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getListChat = async () => {
      try {
        const data = await fetchUserChat(userInfo.accessToken);
        setListChat(data.content);
      } catch (error) {
        console.log("Chat error: ", error);
      }
    };
    getListChat();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.container}>
        <View style={{ borderBottomWidth: 1, marginTop: 40 }}>
          <TouchableOpacity onPress={() => navigation.push("MainScreen")}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
        <View>
          <ChatHeader data={image} />
        </View>
        {listChat.map((message) => (
          <TouchableOpacity
            key={message.id}
            onPress={() =>
              navigation.push("ChatPrivate", {
                chatId: message.id,
                fullname: message.name,
                img: message.imageUrl,
                userId: user.id,
              })
            }
          >
            <View style={style.chatView}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                  source={{ uri: message.imageUrl }}
                />
                <View>
                  <Text>{message.name}</Text>
                  {message.isMe ? (
                    <Text>Me: {message.newestMessage}</Text>
                  ) : (
                    <Text>{message.newestMessage}</Text>
                  )}
                </View>
              </View>
              <View style={{ marginRight: 10, flexDirection: "row", gap: 2 }}>
                <Text>
                  <TimeComparison time={message.newestChatTime} />
                </Text>
                {message.messageCount > 0 && (
                  <View
                    style={{
                      marginLeft: 5,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {message.messageCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBox: {
    marginLeft: "40%",
  },
  headerleft: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
  },
  headerright: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  search: {
    flexDirection: "row",
    width: "100%",
  },
  chatView: {
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
  unread: {
    display: "flex",
    alignItems: "center",
    width: "21%",
    marginTop: 10,
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    padding: 8,
    marginLeft: 10,
  },
  searchView: {
    alignItems: "center",
    width: "70%",
    flexDirection: "row",
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
  },
  chatsText: {
    fontWeight: "400",
    fontSize: 26,
    marginLeft: 10,
  },
  imgHeader: {
    width: 40,
    height: 40,
  },
});

export default MessageScreen;
