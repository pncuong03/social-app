import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import member from "../assets/images/img1.jpeg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { fetchUserInfo } from '../context/ProfileContext';
import { fetchListFriend } from '../context/FriendContext';

export default function FriendList() {
    const { userInfo } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const navigation = useNavigation();
    const handlePress = (friendId) => {
        navigation.navigate('FriendProfile', { friendId });
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchFriends = async () => {
                try {
                    const friendsData = await fetchListFriend(userInfo.accessToken);
                   
                    console.log(friendsData.content);
                    setFriends(friendsData.content);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchFriends();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.push("ProfileScreen")}
                    style={styles.backButton}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
                </TouchableOpacity>
                <Text style={styles.title}>FriendList</Text>
            </View>
            <ScrollView>
                {friends.map((friend) => (
                    <TouchableOpacity
                        onPress={() => handlePress(friend.id)}
                        key={friend.id}>
                        <View style={styles.item}>
                            <Image source={{ uri: friend.imageUrl }} style={styles.image} />
                            <Text style={styles.name}>{friend.fullName}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        zIndex: 99,
        position: "absolute",
        left: 0,
        top: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
    },
});