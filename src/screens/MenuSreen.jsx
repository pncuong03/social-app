import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../utils/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MenuScreen() {
    const navigation = useNavigation();
    const logout = () => {
        clearAuthToken();
    }
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("user");
        // console.log("Cleared auth token");
        navigation.replace("LoginScreen")
    }
    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                    gap: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: Colors.primaryColor,
                    }}
                >
                    Menu
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.push("GroupScreen")}
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require("../assets/icons/Group.png")}
                    ></Image>
                    <Text style={{ fontSize: 18 }}>Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logout}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 4,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}>
                    <Icon name="sign-out" size={24} color="#4B4F71" />
                    <Text style={{
                        marginLeft: 10,
                        color: '#4B4F71',
                        fontSize: 16,
                    }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 