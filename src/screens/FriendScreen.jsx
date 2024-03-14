import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from "../utils/Colors";
import { friendRequests } from "../data/FriendData";

const FriendScreen = () => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerFriend}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: Colors.primaryColor }}>
          Friend request
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "red" }}>440</Text>
      </View>
      {friendRequests.map((request) => (
        <View key={request.id} style={styles.friendView}>
          <Image
            style={styles.avatar}
            source={request.image}
          />
          <View style={styles.headerBox}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{request.name}</Text>
                <Text style={{ fontWeight: 400, fontSize: 16, color: "gray" }}>{request.amount} mutual friend</Text>
              </View>
              <View >
                <Text style={{ fontWeight: 400, fontSize: 18, color: "gray" }}>{request.time}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]}>
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
    width: 80,
    height: 80,
    marginRight: 4,
    borderRadius: 10,
  },
});

export default FriendScreen;
