import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { Colors } from "../utils/Colors";
import { AuthContext } from "../context/AuthContext";
import { fetchListUser } from "../context/UserContext";
import { fetchAddFriend, fetchUnfriend } from "../context/FriendContext";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [listUser, setListUser] = useState([] || null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  useEffect(() => {
    getListUser();
  }, []);

  const getListUser = async () => {
    try {
      setIsLoading(true);
      const data = await fetchListUser(page, size, userInfo.accessToken);
      setListUser(data.content);
      setPage(page + 1);
    } catch (error) {
      console.log("getListUser error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMoreUsers = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await fetchListUser(page, size, userInfo.accessToken);
      if (data.content.length === 0) {
        setIsLoading(false);
      } else {
        setListUser([...listUser, ...data.content]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log("fetchMoreUsers error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAdd = async (id) => {
    try {
      await fetchAddFriend(id, userInfo.accessToken);
    } catch (error) {
      console.log("Add friend: ", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await fetchUnfriend(id, userInfo.accessToken);
      const updatedRequests = listUser.filter((request) => request.id !== id);
      setListUser(updatedRequests);
      setFilteredUsers(updatedRequests);
    } catch (error) {
      console.log("Remove friend: ", error);
    }
  };

  const onSearch = (text) => {
    setSearchTerm(text);
    const filtered = listUser.filter((user) =>
      user.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handlePress = (friendId) => {
    navigation.navigate("FriendProfile", { friendId });
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(listUser);
    } else {
      const filtered = listUser.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, listUser]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <ScrollView
      style={styles.container}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchMoreUsers();
        }
      }}
      scrollEventThrottle={400}
    >
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
                onPress={() => {
                  if (
                    !item.isFriend &&
                    !item.hadSendFriendRequest &&
                    !item.hadReceiverFriendRequest
                  ) {
                    onAdd(item.id);
                  } else if (
                    !item.isFriend &&
                    !item.hadSendFriendRequest &&
                    item.hadReceiverFriendRequest
                  ) {
                  }
                }}
                disabled={
                  item.isFriend ||
                  item.hadSendFriendRequest ||
                  item.hadReceiverFriendRequest
                }
              >
                <Text style={styles.buttonText}>
                  {item.isFriend
                    ? "Friend"
                    : item.hadSendFriendRequest
                    ? "Request sent"
                    : item.hadReceiverFriendRequest
                    ? "Accept request"
                    : "Add Friend"}
                </Text>
              </TouchableOpacity>
              {item.isFriend ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "gray" }]}
                  onPress={() => {
                    if (
                      item.isFriend &&
                      !item.hadSendFriendRequest &&
                      !item.hadReceiverFriendRequest
                    ) {
                      onDelete(item.id);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      ))}
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : null}
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
    width: 120,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
