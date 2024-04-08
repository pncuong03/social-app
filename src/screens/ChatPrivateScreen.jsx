import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";
import { AuthContext } from "../context/AuthContext";
import { fetchChatMessage, fetchSendMessage } from "../context/ChatContext";
import TimeComparison from "../utils/Time";
import { fetchEventNoti } from "../context/NotificationContext";

const ChatPrivateScreen = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const { userInfo } = useContext(AuthContext);
  const { chatId, fullname, img } = route.params;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const getAllMessage = useCallback(async () => {
    try {
      const data = await fetchChatMessage(chatId, userInfo.accessToken);
      setMessages(data.content.reverse());
      scrollToBottom();
    } catch (error) {
      console.log("Message chat: ", error);
    }
  }, [chatId]);

  useEffect(() => {
    getAllMessage();
  }, [chatId, getAllMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateNew();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateNew = async () => {
    try {
      const updateNew = await fetchEventNoti(userInfo.accessToken);
      if (updateNew.messages.length > 0) {
        setMessages((prevMessages) => [
          updateNew.messages[0]?.message,
          ...prevMessages,
        ]);
        scrollToBottom();
      }
    } catch (error) {
      console.log("Message chat: ", error);
    }
  };

  const onSendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        await fetchSendMessage(userInfo.accessToken, chatId, messageText);
        scrollToBottom();
        setMessageText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerChat}>
        <View style={styles.headerUser}>
          <TouchableOpacity onPress={() => navigation.push("MessageScreen")}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push("MessageDetail", {
                chatId1: chatId,
                fullname1: fullname,
                img1: img,
              })
            }
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
              }}
              source={{ uri: img }}
            />
            <Text style={{ fontWeight: "bold" }}>{fullname}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 100 }}
          onPress={() => navigation.push("SearchMessageScreen")}
        >
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContent}
        contentContainerStyle={styles.chatContentContainer}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              style={{
                width: 26,
                height: 26,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
              }}
              source={{ uri: message?.imageUrl }}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.detail}>
                <Text style={{ color: Colors.textGrey }}>
                  {message?.fullName}
                </Text>
                <Text>{message?.message}</Text>
                <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                  <TimeComparison time={message?.createdAt} />
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
          />
          <TouchableOpacity onPress={() => onSendMessage()}>
            <VectorIcon
              name="send"
              type="MaterialIcons"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerChat: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    flexDirection: "column",
    paddingTop: 20,
  },
  chatContent: {
    flex: 1,
    margin: 10,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
  },
  textInput: {
    flex: 1,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});

export default ChatPrivateScreen;
