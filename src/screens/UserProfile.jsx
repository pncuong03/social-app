import React, { useState, useEffect, useContext, useRef } from "react";
import {
    Animated,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { fetchUserInfo } from '../context/ProfileContext';
import member from "../assets/images/img1.jpeg";
import { fetchListFriend, fetchUnfriend } from '../context/FriendContext'
import UserPost from "../components/UserPost";
import { getPostsOfUser } from "../context/PostContext";
import { fetchListUser } from "../context/UserContext";
export default function UserProfile({ route }) {
    const { userInfo } = useContext(AuthContext);
    const { friendId } = route.params;
    console.log(friendId);
    const navigation = useNavigation();
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUnfriend, setShowUnfriend] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            const fetchUsers = async () => {
                try {
                    const usersData = await fetchListUser(userInfo.accessToken);
                    setUsers(usersData.content);
                    console.log(usersData.content);
                    setLoading(false);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            const fetchFriends = async () => {
                try {
                    const friendsData = await fetchListFriend(userInfo.accessToken);
                    setFriends(friendsData.content);
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
            fetchUsers()
            fetchFriends();
            fetchPosts();
        }, [userInfo.accessToken, friendId])
    );
    const user = users.find((u) => u.id === friendId) || {};
    console.log(users)
    // const handleUnfriend = async (friendId) => {
    //   try {
    //     await fetchUnfriend(friendId, userInfo.accessToken);
    //       // Update the friends list after unfriending
    //       const updatedFriends = friends.filter(f => f.id !== friendId);
    //       setFriends(updatedFriends);
    //       // Hide the Unfriend button
    //       setShowUnfriend(false);
    //   } catch (error) {
    //     console.error('Error unfriending:', error);
    //   }
    // };
    if (loading) {
        return <Text>Loading...</Text>;
    }
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
                {/* {user.description && user.description.split("\\n").map((item, key) => {
                    return (
                        <Text key={key} style={styles.profileDescription}>
                            {item}
                        </Text>
                    );
                })} */}
                <TouchableOpacity
                    // onPress={toggleUnfriendButton}
                    style={styles.editProfileButton}
                >
                    <Text style={styles.editProfileButtonText}>Add Friend</Text>
                </TouchableOpacity>

                {showUnfriend && (
                    <TouchableOpacity
                        // onPress={() =>handleUnfriend(friendId)} 
                        style={[styles.editProfileButton, styles.unfriendButton]}
                    >
                        <Text style={styles.editProfileButtonText}>Unfriend</Text>
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
