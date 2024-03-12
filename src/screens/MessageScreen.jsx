import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../assets/images/avatarChat.png";
import img1 from "../assets/images/img1.jpeg";
import img2 from "../assets/images/img2.jpeg";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";

const MessageScreen = () => {
  const navigation = useNavigation();
  return (
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
      <View style={style.header}>
        <View style={style.headerleft}>
          <Image source={Avatar} style={style.imgHeader} />
          <Text style={style.chatsText}>Chats</Text>
        </View>
        <View style={style.headerright}>
          <VectorIcon
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
        <TouchableOpacity style={style.searchView}>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
          <Text>Search</Text>
        </TouchableOpacity>
        <View style={style.unread}>
          <Text>Unread</Text>
        </View>
      </View>
      <View style={style.chatView}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}
            source={img2}
          />
          <View>
            <Text>Phạm Thanh Phúc</Text>
            <Text>You:OK.Thanks</Text>
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <VectorIcon
            name="checkbox-marked-circle-outline"
            type="MaterialCommunityIcons"
            size={20}
            color={Colors.black}
          />
        </View>
      </View>
      {/* <View style={style.chatView}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginLeft: 10,
            marginRight: 10,
          }}
          source={img1}
        />
        <View>
          <Text>Đỗ Nam Phú</Text>
          <Text>You:How are you?</Text>
        </View>
        <VectorIcon
          name="checkbox-marked-circle-outline"
          type="MaterialCommunityIcons"
          size={20}
          color={Colors.black}
        />
      </View> */}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 10,
    padding: 5,
    // width: "100%",
    // height: 60,
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
    width: "100%"
  },
  chatView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    margin: 10,
    borderWidth: 2,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 5,
  },
  unread: {
    display: "flex",
    alignItems: "center",
    width: "23%",
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
  //   imgCamera: {
  //     marginTop: 25,
  //     marginLeft: 120,
  //   },
  //   plusIcon: {
  //     marginTop: 25,
  //     marginLeft: 10,
  //   },
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
