import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="w-full absolute"
        source={require("../assets/img/bg-login.png")}
      />

      <View className="h-full w-full flex justify-around pt-30">
        <View className="flex items-center mt-40">
          <Text className="text-blue-700 font-bold tracking-wide text-5xl">
            Pacebook
          </Text>
        </View>

        <View className="flex items-center mx-4 space-y-4">
            <View className="bg-black/5 p-2 rounded-2xl w-full">
                <TextInput placeholder='Username' placeholderTextColor={'gray'} />
            </View>
            <View className="bg-black/5 p-2 rounded-2xl w-full mb-3">
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry/>
            </View>
            <View className="w-full">
              <TouchableOpacity className="w-full bg-blue-400 p-1 rounded-2xl mb-3" onPress={() => navigation.push('Home')}>
                  <Text className="text-xl font-bold text-white text-center">Login</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text className="font-bold text-gray-500">OR</Text> 
            </View>
            <View className="w-full">
              <TouchableOpacity className="w-full p-1 rounded-2xl mb-3 border border-blue-600" onPress={() => navigation.push('SignUp')}>
                  <Text className="text-xl font-medium text-black text-center">Create new Pacebook account</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
}
