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
import { useNavigation } from "@react-navigation/native";
import VectorIcon from "../utils/VectorIcon";

const GroupChatHeader = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={style.search}>
        <TouchableOpacity style={style.searchView}>
          <Text style={{ fontWeight: "600", marginLeft: 10 }}>GroupName:</Text>
          <TextInput placeholder="GroupName"></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={style.unread}>
          <Text>OK</Text>
        </TouchableOpacity>
      </View>
      <View style={style.search} >
        <TouchableOpacity style={style.searchView}>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
          <TextInput placeholder="People"></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={style.unread}>
          <Text>Seach</Text>
        </TouchableOpacity>
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
    marginTop: 5,
    padding: 5,
    display: "flex",
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
    padding: 4,
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
export default GroupChatHeader;
