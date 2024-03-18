import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Post from "../components/Post";

export default function ProfileScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://plainbackground.com/download.php?imagename=39569c.png",
          }}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          onPress={() => navigation.push("MainScreen")}
          style={styles.backButton}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/images/img1.jpeg")}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ronaldo</Text>
        <TouchableOpacity
          onPress={() => navigation.push("EditProfile")}
          style={styles.editProfileButton}
        >
          <Text style={styles.editProfileButtonText}>EditProfile</Text>
        </TouchableOpacity>
        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Posts</Text>
            <Text style={styles.profileStatsValue}>0</Text>
          </View>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Followers</Text>
            <Text style={styles.profileStatsValue}>0</Text>
          </View>
        </View>
        {/* <ScrollView style={{ width: "100%" }}>
          <Post />
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    height: 180,
    width: "100%",
    display: "flex",
  },
  backButton: {
    zIndex: 99,
    position: "absolute",
    left: 0,
    top: 10,
    display: "flex",
  },
  profileText: {
    fontSize: 30,
    fontWeight: "500",
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    display: "flex",
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#242760",
    overflow: "hidden",
    marginTop: -90,
  },
  profileName: {
    fontSize: 18,
    lineHeight: 22,
    color: "black",
    marginVertical: 8,
  },
  editProfileButton: {
    backgroundColor: "black",
    height: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  editProfileButtonText: {
    color: "white",
    fontSize: 16,
  },
  profileStatsContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  profileStatsItem: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  profileStatsLabel: {
    fontSize: 16,
    color: "#242760",
  },
  profileStatsValue: {
    fontSize: 20,
    color: "#242760",
  },
});
