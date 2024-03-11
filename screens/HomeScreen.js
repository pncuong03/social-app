import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    // <View className="">
    //   <View className="flex pt-12 pl-5">
    //     <TouchableOpacity  onPress={() => navigation.push('Home')}>
    //       <Text className="text-2xl font-bold text-blue-500">Pacebook</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
