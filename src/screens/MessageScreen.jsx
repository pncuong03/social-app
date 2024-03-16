import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";
import ChatHeader from "../components/ChatHeader";
import { messageResponse } from "../data/MessageData";

const MessageScreen = () => {
  const navigation = useNavigation();
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
          <ChatHeader />
        </View>
        {
          messageResponse.map((message) => (
            <TouchableOpacity key={message.id} onPress={() => navigation.push("ChatPrivate")}>
              <View style={style.chatView} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 10,
                    }}
                    source={message.img}
                  />
                  <View>
                    <Text>{message.name}</Text>
                    <Text>{message.content}</Text>
                  </View>
                </View>
                <View style={{ marginRight: 10 }}>
                  <VectorIcon
                    name="checkbox-marked-circle-outline"
                    type="MaterialCommunityIcons"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
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
