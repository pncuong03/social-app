import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const { chatId, fullname, img, userId } = route.params;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const getAllMessage = async () => {
    try {
      const data = await fetchChatMessage(chatId, userInfo.accessToken);
      setMessages(data.content.reverse());
      scrollToBottom();
    } catch (error) {
      console.log("Message chat: ", error);
    }
  };

  useEffect(() => {
    getAllMessage();
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const onSendMessage = () => {
    scrollToBottom();
    setMessageText("");
    handleToggle();
    updateAPI();
  };

  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetchEventNoti(chatId, userInfo.accessToken);

        setMessages((prev) => [
          ...prev,
          ...res.messages?.filter((message) => message.chatId === chatId),
        ]);

        data();
      } catch (error) {
        console.error(error);
        setTimeout(data, 5000);
      }
    };
    data();

    return () => {
      clearTimeout(data);
    };
  }, []);

  const updateAPI = async () => {
    if (messageText.trim() !== "") {
      await fetchSendMessage(userInfo.accessToken, chatId, messageText);
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
                userId1: userId,
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
        {messages?.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message && message?.isMe
                ? styles.messageRight
                : styles.messageLeft,
            ]}
          >
            {message && !message.isMe && (
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
            )}
            <View style={styles.detail}>
              {message && !message?.isMe && (
                <Text
                  style={{ color: "#B0B3B8", fontSize: 13, fontWeight: "200" }}
                >
                  {message?.fullName}
                </Text>
              )}
              {message && (
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {message?.message}
                </Text>
              )}
              {message && (
                <Text
                  style={{
                    color: "#B0B3B8",
                    fontSize: 13,
                    fontWeight: "200",
                  }}
                >
                  <TimeComparison time={message?.createdAt} />
                </Text>
              )}
            </View>
            {message && message?.isMe && (
              <Image
                style={{
                  width: 26,
                  height: 26,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 20,
                }}
                source={{ uri: userInfo.img }}
              />
            )}
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
    marginTop: 30,
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
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  messageRight: {
    justifyContent: "flex-end",
    marginRight: -30,
    // paddingRight: -10,
  },
  messageLeft: {
    justifyContent: "flex-start",
  },
});

export default ChatPrivateScreen;
