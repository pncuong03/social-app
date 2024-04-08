import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import Avatar from "../assets/images/avatarChat.png";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={style.header}>
        <View style={style.headerleft}>
          <Image source={Avatar} style={style.imgHeader} />
          <Text style={style.chatsText}>Chats</Text>
        </View>
        <View style={style.headerright}>
          <VectorIcon
            onPress={() => navigation.push("SearchMessageScreen")}
            name="camera"
            type="FontAwesome5"
            size={26}
            color={Colors.black}
          />
          <VectorIcon
            onPress={() => navigation.push("GroupMessageScreen")}
            name="pluscircle"
            type="AntDesign"
            size={26}
            color={Colors.black}
          />
        </View>
      </View>
      <View style={style.search}>
        <TouchableOpacity
          style={style.searchView}
          onPress={() => navigation.push("SearchGroupMessageScreen")}
        >
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
          <TextInput placeholder="Search"></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={style.unread}>
          <Text>Unread</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
  chatsText: {
    fontWeight: "400",
    fontSize: 26,
    marginLeft: 10,
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
  imgHeader: {
    width: 50,
    height: 50,
  },
});

export default ChatHeader;
