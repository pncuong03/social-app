import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Post from "../components/Post";

export default function HomeScreen() {
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
       <ScrollView>
          <Post />
        </ScrollView>
      </View>
    </View>
  );
}
