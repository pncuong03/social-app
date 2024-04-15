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
  const { chatId, fullname, img } = route.params;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [toggle, setToggle] = useState(false);

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
  }, [chatId, toggle]);

  // useEffect(() => {
  //   let intervalId;

  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchChatMessage(chatId, userInfo.accessToken);
  //       setMessages(data.content.reverse());
  //       scrollToBottom();
  //     } catch (error) {
  //       console.log("Message chat: ", error);
  //     }
  //   };

  //   if (autoUpdate) {
  //     intervalId = setInterval(fetchData, 5000); // Fetch messages every 5 seconds
  //   }

  //   return () => {
  //     clearInterval(intervalId); // Cleanup interval on component unmount
  //   };
  // }, [chatId, userInfo.accessToken, autoUpdate]);

  const onSendMessage = () => {
    scrollToBottom();
    setMessageText("");
    handleToggle();
    updateAPI();
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    (async () => {
      const res = await fetchEventNoti(userInfo.accessToken);
      console.log(res);
      setMessages([res.messages, ...messages]);
      // console.log(111111, messages);
    })();
  }, [toggle]);
  const updateAPI = async () => {
    if (messageText.trim() !== "") {
      await fetchSendMessage(userInfo.accessToken, chatId, messageText);
      // console.log(1);
      // // const updateNew = await fetchEventNoti(userInfo.accessToken);
      // console.log(1111, res);

      // setMessages((prev) => [updateNewmessages, ...prev]);
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
            style={[
              styles.messageContainer,
              message && message.isMe
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
              {message && !message.isMe && (
                <Text style={{ color: Colors.textGrey }}>
                  {message?.fullName}
                </Text>
              )}
              {message && <Text>{message?.message}</Text>}
              {message && (
                <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                  <TimeComparison time={message?.createdAt} />
                </Text>
              )}
            </View>
            {message && message.isMe && (
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
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  messageRight: {
    justifyContent: "flex-end",
  },
  messageLeft: {
    justifyContent: "flex-start",
  },
});

export default ChatPrivateScreen;
