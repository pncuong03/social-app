import { View, Text, TouchableOpacity, Image,ScrollView } from "react-native";
import React from "react";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View className="">
      <View className="flex pt-12 pl-5">
        <TouchableOpacity>
          <Text className="text-2xl font-bold text-blue-500">Pacebook</Text>
        </TouchableOpacity>
        <View>
          <Image source={require("../assets/svg/home.svg")} />
          <Image source={require("../assets/svg/invitation.svg")} />
          <Image source={require("../assets/svg/person.svg")} />
          <Image source={require("../assets/svg/notification.svg")} />
          <Image source={require("../assets/svg/menu.svg")} />
        </View>
        <TouchableOpacity className="w-full bg-blue-400 p-3 rounded-2xl mb-3" onPress={() => navigation.push('Profile')}>
                  <Text className="text-xl font-bold text-white text-center">Profile</Text>
              </TouchableOpacity>
       {/* <ScrollView>
          <Post />
        </ScrollView> */}
      </View>
    </View>
  );
}
