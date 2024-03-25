import React, { useRef, useState } from "react";
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
import img1 from "../assets/images/img1.jpeg";

const ChatPrivateScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      content: messageText,
      sender: "Me",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setMessageText(""); // Clear the message text after sending
    scrollToBottom();
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
            onPress={() => navigation.push("MessageDetail")}
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
              source={img1}
            />
            <Text style={{ fontWeight: "bold" }}>Phạm Thanh Phúc </Text>
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
        {messages.map((message) => (
          <View
            key={message.id}
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
              source={img1}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.detail}>
                <Text style={{ color: Colors.textGrey }}>{message.sender}</Text>
                <Text>{message.content}</Text>
                <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                  {message.timestamp}
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
            multiline
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity onPress={handleSendMessage}>
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
