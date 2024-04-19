import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import GroupData from '../data/GroupData';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getGroupInfo, getGroupLists } from "../context/GroupContext";
import backGroundImg from "../assets/images/facebook-group-default-cover-photo.jpg";
import { fetchUserInfo } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import GroupPost from "../components/GroupPost";

export default function GroupDetail({ route }) {
    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const { groupId } = route.params;
    const [groupInfo, setGroupInfo] = useState([]);
    console.log(groupId);
    const [groupData, setGroupData] = useState([]);
    const [image, setImage] = useState(null);
    useFocusEffect(
        React.useCallback(() => {
          const fetchGroupInfo = async () => {
            try {
              const groupInfo = await getGroupInfo(
                groupId
              );
              console.log(groupInfo);
              setGroupInfo(groupInfo);
              setLoading(false);
            } catch (error) {
              console.error("Error:", error);
            }
          };
          fetchGroupInfo();
        }, [groupId])
      );
    useEffect(() => {
        const getGroup = async () => {
            try {
                const data = await getGroupLists();
                console.log(data.content);
                setGroupData(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        const getUserInfo = async () => {
            try {
                const data = await fetchUserInfo(userInfo.accessToken);
                setImage(data.imageUrl);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUserInfo();
        getGroup();
    }, []);

    console.log(groupInfo);
    const handlePress = (groupId) => {
        navigation.navigate('NewPostInGroup', { groupId });
    };
    const checkMember = (groupId) => {
        navigation.navigate('GroupMemberListScreen', { groupId });
    };
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#f0f2f5",
            }}
        >
            <View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 99,
                        position: "absolute",
                        left: 20,
                        top: 10,
                    }}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={35} color={"white"} />
                </TouchableOpacity>
                <Image
                    source={backGroundImg}
                    style={{
                        height: 150,
                        width: "100%",
                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                <Text
                    style={{
                        fontSize: 24,
                        lineHeight: 28,
                        color: "black",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    {groupInfo.name}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#1877f2",
                        height: 40,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 250,
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                        }}
                    >
                        Edit Group
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000',
                        paddingBottom: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#242760",
                                fontWeight: "bold",
                            }}
                        >
                            Posts
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#242760",
                                fontWeight: "bold",
                            }}
                        >
                            0
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => checkMember(groupInfo.idGroup)}
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#242760",
                                fontWeight: "bold",
                            }}
                        >
                            Members
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#242760",
                                fontWeight: "bold",
                            }}
                        >
                            {groupInfo.memberCount}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.push("ProfileScreen")}>
                        <Image source={{ uri: image }} style={styles.profileStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() =>handlePress(groupInfo.idGroup)}
                    >
                        <View>
                            <Text style={styles.inputStyle}>Write something here...</Text>
                            <Text style={styles.inputStyle}>Seven...</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 40 }}
                        onPress={() =>handlePress(groupInfo.idGroup)}
                    >
                        <MaterialIcons name="perm-media" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <GroupPost accessToken={userInfo.accessToken} groupId={groupId}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Lighter color for a softer look
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    profileStyle: {
        height: 40,
        width: 40,
        marginRight: 40,
        borderRadius: 50,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        borderRadius: 30,
        paddingHorizontal: 20,
        width: "70%",
        paddingVertical: 3,
    },
    inputStyle: {
        fontSize: 16,
        color: Colors.grey,
    },
});
