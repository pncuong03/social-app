import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import member from "../assets/images/img1.jpeg";
import { PostData } from "../data/PostData";
import PostFooter from "../components/PostFooter";
import PostHeader from "../components/PostHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { fetchUserInfo } from '../context/ProfileContext';
import { fetchListFriend } from '../context/FriendContext'
export default function FriendProfile({route}) {
  const { userInfo } = useContext(AuthContext);
  const {friendId} = route.params;
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await fetchListFriend(userInfo.accessToken);
        console.log(friendsData.content);
        setFriends(friendsData.content);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchFriends();
  }, []);
  const friend = friends.find((f) => f.id === friendId);
  console.log(friend);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={member} style={styles.backgroundImage} />
        <TouchableOpacity
          onPress={() => navigation.push("MainScreen")}
          style={styles.backButton}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: friend.imageUrl }} style={styles.profileImage} />
        <Text style={styles.profileName}>{friend.fullName}</Text>
        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Posts</Text>
            <Text style={styles.profileStatsValue}>3</Text>
          </View>
          <View  style={styles.profileStatsItem}>
              <Text style={styles.profileStatsLabel}>Friends</Text>
              <Text style={styles.profileStatsValue}>{friends.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.postContainer}>
        {PostData.map(item => (
          <View key={item.id}>
            <PostHeader data={item} />
            <Image source={item.postImg} style={styles.postImg} />
            <PostFooter data={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    height: 180,
    width: "100%",
  },
  backButton: {
    zIndex: 99,
    position: "absolute",
    left: 0,
    top: 10,
  },
  profileText: {
    fontSize: 30,
    fontWeight: "500",
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  profileBirthday: {
    fontSize: 16,
    lineHeight: 20,
    color: "black",
    marginVertical: 4,
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "center",
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
    justifyContent: "space-around",
    width: "100%",
  },
  profileStatsItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
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
  postsContainer: {
    flex: 1,
    marginTop: 20,
  },
  postItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  postImg: {
    width: '100%',
    height: 250,
  },
});

