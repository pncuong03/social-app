import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { Colors } from "../utils/Colors";
import { AuthContext } from "../context/AuthContext";
import { fetchListUser } from "../context/UserContext";
import { fetchAddFriend } from "../context/FriendContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const SearchScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [listUser, setListUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    const getListUser = async () => {
      try {
        const data = await fetchListUser(currentPage, userInfo.accessToken);
        setIsLoading(true);
        setListUser(data.content);
        setIsLoading(false);
      } catch (error) {
        console.log("getListUser", error);
      }
    };
    getListUser(listUser);
  }, [currentPage]);
  // console.log(listUser);
  const onAdd = async (id) => {
    try {
      await fetchAddFriend(id, userInfo.accessToken);
    } catch (error) {
      console.log("Add friend: ", error);
    }
  };

  const fetchMore = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    let usersList = await fetchListUser(nextPage, userInfo.accessToken);
    setListUser([...listUser, ...usersList]);
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  const onSearch = (text) => {
    setSearchTerm(text);
    const filtered = listUser.filter((user) =>
      user.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const handlePress = (friendId) => {
    navigation.navigate('FriendProfile', { friendId });
};

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(listUser);
    }
  }, [searchTerm, listUser]);

  // const checkFriendStatus = (user) => {
  //   if (user.isFriend) {
  //     return "Friend";
  //   } else if (user.hadSendFriendRequest) {
  //     return "Await Accept";
  //   } else {
  //     return "Add Friend";
  //   }
  // };
  // console.log(filteredUsers);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Find Users</Text>
      </View>
      <View style={styles.headerFriend}>
        <TextInput
          style={{
            fontSize: 17,
            borderWidth: 1,
            width: "100%",
            height: "100%",
            borderColor: Colors.borderGrey,
            borderRadius: 10,
            padding: 5,
          }}
          placeholder="Search user..."
          onChangeText={onSearch}
          value={searchTerm}
        />
      </View>
      {filteredUsers.map((item) => (
        <View key={item.id} style={styles.friendView}>
          <TouchableOpacity onPress={() => handlePress(item.id)}>
          <Image style={styles.avatar} source={{ uri: item.imageUrl }} />
          </TouchableOpacity>
          <View style={styles.headerBox}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.fullName}
                </Text>
              </View>
            </View>
           
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => onAdd(item.id)}
              >
                <Text style={styles.buttonText}>Add friend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "gray" }]}
                // onPress={() => onDelete(request.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerFriend: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  friendView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerBox: {
    flexDirection: "column",
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#384CFF",
    padding: 5,
    borderRadius: 5,
    width: 110,
    height: 30,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  avatar: {
    width: 65,
    height: 65,
    marginRight: 4,
    borderRadius: 10,
  },
  subNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  search: {
    borderWidth: 1,
    width: "25%",
    height: "100%",
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "gray",
  },
});

export default SearchScreen;
