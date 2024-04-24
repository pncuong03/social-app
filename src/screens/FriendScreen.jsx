import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "../utils/Colors";
import { AuthContext } from "../context/AuthContext";
import {
  fetchAcceptFriend,
  fetchFriendRequests,
  fetchRejectFriend,
} from "../context/FriendContext";

const FriendScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriendRequests(userInfo.accessToken);
        const sorted = data.content.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRequests(data.content);
        setFilteredRequests(sorted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onConfirm = async (id) => {
    try {
      await fetchAcceptFriend(id, userInfo.accessToken);
      const updatedRequests = requests.filter((request) => request.id !== id);
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
    } catch (error) {
      console.error("Error confirming friend:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await fetchRejectFriend(id, userInfo.accessToken);
      const updatedRequests = requests.filter((request) => request.id !== id);
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
    } catch (error) {
      console.error("Error confirming friend:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Friends</Text>
      </View>
      <View style={styles.headerFriend}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: Colors.primaryColor,
          }}
        >
          Friend request
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "red" }}>
          {filteredRequests.length}
        </Text>
      </View>
      {filteredRequests.map((request) => (
        <View key={request.id} style={styles.friendView}>
          <Image style={styles.avatar} source={{ uri: request.imageUrl }} />
          <View style={styles.headerBox}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {request.fullName}
                </Text>
                {/* <Text style={{ fontWeight: 400, fontSize: 16, color: "gray" }}>
                  {request.amount} mutual friend
                </Text> */}
              </View>
              <View>
                <Text style={{ fontWeight: 400, fontSize: 18, color: "gray" }}>
                  {request.time}
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
                onPress={() => onConfirm(request.id)}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "gray" }]}
                onPress={() => onDelete(request.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
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
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    gap: 15,
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
    width: 70,
    height: 70,
    marginRight: 4,
    borderRadius: 15,
  },
  subNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
});

export default FriendScreen;
