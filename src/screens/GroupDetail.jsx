import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import GroupData from '../data/GroupData';
import { useNavigation } from "@react-navigation/native";
import Post from "../components/Post";
export default function GroupDetail({ route }) {
    const navigation = useNavigation();
    const { groupId } = route.params;
    const group = GroupData.find((g) => g.id === groupId);
    const handlePress = (groupId) => {
        navigation.navigate('NewPostInGroup', { groupId });
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <View>
                <Image
                    source={{
                        uri: "https://plainbackground.com/download.php?imagename=39569c.png",
                    }}
                    style={{
                        height: 180,
                        width: "100%",
                    }}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 99,
                        position: "absolute",
                        left: 0,
                        top: 10,
                    }}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "500",
                        position: "absolute",
                        top: 10,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                    }}
                >
                    Group
                </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={group.image}
                    resizeMode="contain"
                    style={{
                        height: 170,
                        width: 170,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: "#242760",
                        overflow: "hidden",
                        marginTop: -90,
                    }}
                />
                <Text
                    style={{
                        fontSize: 18,
                        lineHeight: 22,
                        color: "black",
                        marginVertical: 8,
                    }}
                >
                    {group.name}
                </Text>
                <TouchableOpacity
                    onPress={() => handlePress(group.id)}
                    style={{
                        backgroundColor: "black",
                        height: 40,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 250,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                        }}
                    >
                        Create new Post
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        paddingVertical: 8,
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
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
                            }}
                        >
                            Posts
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#242760",
                            }}
                        >
                            0
                        </Text>
                    </View>
                    <TouchableOpacity
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
                            }}
                        >
                            Member
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#242760",
                            }}
                        >
                            {group.members.length}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ width: "100%" }}>
                    <Post />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
