import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal, TouchableWithoutFeedback
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import member from "../assets/images/img1.jpeg";
import { AuthContext } from "../context/AuthContext";
import { fetchUserInfo } from '../context/ProfileContext';
import { fetchAddFriend, fetchFriendInfo, fetchListFriend, fetchUnfriend } from '../context/FriendContext'
import UserPost from "../components/UserPost";
import { getPostsOfUser } from "../context/PostContext";
export default function FriendProfile({ route }) {
  const { userInfo } = useContext(AuthContext);
  const { friendId } = route.params;
  console.log(friendId);
  const navigation = useNavigation();
  const [user, setUser] = useState({
    id: friendId,
    fullName: "",
    imageUrl: "",
    description: "",
    state: ""
  });
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUnfriend, setShowUnfriend] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const fetchFriends = async () => {
        try {
          console.log(friendId);
          console.log(userInfo.accessToken);
          const friendsData = await fetchFriendInfo(userInfo.accessToken, friendId);
          console.log(friendsData);
          setUser({
            fullName: friendsData.fullName,
            imageUrl: friendsData.imageUrl,
            description: friendsData.description,
            state: friendsData.state
          });
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      const fetchPosts = async () => {
        try {
          const postData = await getPostsOfUser(userInfo.accessToken, friendId);
          setPosts(postData.content);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchFriends();
      fetchPosts();
    }, [userInfo.accessToken, friendId])
  );
  console.log(user);
  const toggleUnfriendButton = () => {
    setShowUnfriend(!showUnfriend);
  };
  const addFriend = async (friendId) => {
    try {
      const response = await fetchAddFriend(friendId, userInfo.accessToken);
      console.log(response); 
  
    
      const friendsData = await fetchFriendInfo(userInfo.accessToken, friendId);
      setUser({
        fullName: friendsData.fullName,
        imageUrl: friendsData.imageUrl,
        description: friendsData.description,
        state: friendsData.state
      });
  
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };
  const handleUnfriend = async (friendId) => {
    try {
      const response = await fetchUnfriend(friendId, userInfo.accessToken);
      console.log(response); 
      
      const friendsData = await fetchFriendInfo(userInfo.accessToken, friendId);
      setUser({
        fullName: friendsData.fullName,
        imageUrl: friendsData.imageUrl,
        description: friendsData.description,
        state: friendsData.state
      });
  
    } catch (error) {
      console.error('Error unfriending:', error);
    }
  };
  if (loading) {
    return <Text>Loading...</Text>;
  };
 
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={member} style={styles.backgroundImage} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.fullName}</Text>
        {user.description && user.description.split("\\n").map((item, key) => {
          return (
            <Text key={key} style={styles.profileDescription}>
              {item}
            </Text>
          );
        })}
        {user.state === "FRIEND" && (
          <>
            <TouchableOpacity
              onPress={toggleUnfriendButton}
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileButtonText}>Friend</Text>
            </TouchableOpacity>

            {showUnfriend && (
              <TouchableOpacity
                onPress={() => handleUnfriend(friendId)}
                style={[styles.editProfileButton, styles.unfriendButton]}
              >
                <Text style={styles.editProfileButtonText}>Unfriend</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {user.state === "REQUESTING" && (
          <TouchableOpacity
            // onPress={/* handle action */}
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileButtonText}>Requesting</Text>
          </TouchableOpacity>
        )}

        {user.state === "STRANGER" && (
          <TouchableOpacity
            onPress={() => addFriend(friendId)}
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileButtonText}>Add Friend</Text>
          </TouchableOpacity>
        )}
        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Posts</Text>
            <Text style={styles.profileStatsValue}>{posts.length}</Text>
          </View>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Friends</Text>
            <Text style={styles.profileStatsValue}>{friends.length}</Text>
          </View>
        </View>
      </View>

      <UserPost accessToken={userInfo.accessToken} userId={friendId} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  backgroundImage: {
    height: 180,
    width: "100%",
  },
  backButton: {
    zIndex: 99,
    position: "absolute",
    left: 10,
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
    color: "#4267B2",
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#4267B2",
    overflow: "hidden",
    marginTop: -90,
  },
  profileName: {
    fontSize: 18,
    lineHeight: 22,
    color: "black",
    marginVertical: 8,
  },
  profileDescription: {
    fontSize: 16,
    lineHeight: 20,
    color: "black",
    marginVertical: 4,
  },
  editProfileButton: {
    backgroundColor: "#4267B2",
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
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unfriendButton: {
    marginTop: 10,
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
    justifyContent: "center",
    marginHorizontal: 10,
  },
  profileStatsLabel: {
    fontSize: 16,
    color: "#4267B2",
  },
  profileStatsValue: {
    fontSize: 20,
    color: "#4267B2",
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
    width: "100%",
    height: 250,
  },
});
