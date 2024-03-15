import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../assets/images/avatarChat.png";
import img1 from "../assets/images/img1.jpeg";
import img2 from "../assets/images/img2.jpeg";
import img3 from "../assets/images/img3.jpeg";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";
import { TextInput } from "react-native-gesture-handler";
const SearchGroupMessageScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={{ borderBottomWidth: 1, marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.push("MessageScreen")}>
          <VectorIcon
            name="arrowleft"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={style.search}>
        <TouchableOpacity style={style.searchView}>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
          <TextInput>Group </TextInput>
        </TouchableOpacity>
        <View style={style.unread}>
          <Text>Seach</Text>
        </View>
      </View>
      <View style={style.peopleView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text style={{ fontWeight: "500" }}>GroupFunnyA</Text>
          </View>
        </View>
      </View>
      <View style={style.peopleView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}
            source={img3}
          />
          <View>
            <Text style={{ fontWeight: "500" }}>GroupFunnyB</Text>
          </View>
        </View>
      </View>
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
  headerSearch: {
    backgroundColor: Colors.borderGrey,
    height: 28,
    borderRadius: 10,
    flexDirection: "row",
    width: "90%",
    alignContent: "space-between",
  },
  headerOk: {
    height: 28,
    borderRadius: 10,
    backgroundColor: Colors.borderGrey,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    width: "100%",
  },
  peopleView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    margin: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
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

export default SearchGroupMessageScreen;
