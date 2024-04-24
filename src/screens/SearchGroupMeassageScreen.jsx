import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchGroup } from "../context/GroupChatContext";
import { AuthContext } from "../context/AuthContext";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";

const SearchGroupMessageScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [nameGroup, setNameGroup] = useState("");
  const [listGroup, setListGroup] = useState([]);
  const getGroup = async (name) => {
    try {
      const data = await fetchGroup(name, userInfo.accessToken);
      setListGroup(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    getGroup(nameGroup);
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.search}>
        <TouchableOpacity style={styles.searchView}>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
          <TextInput
            value={nameGroup}
            onChangeText={setNameGroup}
            placeholder="Enter group name"
            style={{ flex: 1 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.unread} onPress={handleSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {listGroup.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.peopleView}
            onPress={() =>
              navigation.push("ChatPrivate", {
                chatId: group.id,
                fullname: group.name,
              })
            }
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                source={{ uri: group.imageUrl }}
              />
              <View>
                <Text style={{ fontWeight: "500" }}>{group.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  searchView: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    marginLeft: 10,
    flex: 1,
    padding: 5,
  },
  unread: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    padding: 8,
    marginLeft: 10,
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
});

export default SearchGroupMessageScreen;
