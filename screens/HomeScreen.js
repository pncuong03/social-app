import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation ();

  return (
    <View className="">
      <View className="flex pt-12 pl-5">
        <TouchableOpacity  onPress={() => navigation.push('Home')}>
          <Text className="text-2xl font-bold text-blue-500">Pacebook</Text>
        </TouchableOpacity>
        <View>
            <Image source={require("../assets/svg/home.svg")}/>
            <Image source={require("../assets/svg/invitation.svg")}/>
            <Image source={require("../assets/svg/person.svg")}/>
            <Image source={require("../assets/svg/notification.svg")}/>
            <Image source={require("../assets/svg/menu.svg")}/>
        </View>
      </View>
    </View>
  );
}
