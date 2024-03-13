import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
export default function Splash() {
    const navigation = useNavigation();
    return (
        <View className="bg-white pt- flex flex-row w-full h-full justify-center items-center" >
            <StatusBar style="green" />
            <Image className=" w-full absolute top-0"
                source={require("../assets/img/bg-login.png")}
            />
            <Image className=" absolute w-[100] h-[130] top-[200] "
                source={require("../assets/img/logoPa.png")}
            />
            <Image className="absolute top-[320]"
                source={require("../assets/img/logo-pacebook.png")}
            />
            <View className=" top-[70]">
                <TouchableOpacity
                    className="justify-center items-center w-[250] h-[25] bg-blue-500 rounded-2xl " onPress={() => navigation.push('Login')}>
                    <Text className="text-xs font-bold text-white text-center">Do you have an Account? Login now!</Text>
                </TouchableOpacity>
                <TouchableOpacity className="justify-center items-center mt-3 w-[250] h-[25] bg-blue-500 rounded-2xl" onPress={() => navigation.push('SignUp')}>
                    <Text className="text-xs font-bold text-white text-center">Create Account!!</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}