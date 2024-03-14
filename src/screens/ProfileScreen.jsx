import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <StatusBar backgroundColor={"rgba(36, 39, 96, 0.05)"} /> */}

      <View>
        <Image
          source={{
            uri: "https://plainbackground.com/download.php?imagename=39569c.png",
          }}
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.push("MainScreen")}
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
          Profile
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/images/img1.jpeg")}
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
            // fontFamily: "bold",
            fontSize: 18,
            lineHeight: 22,
            color: "black",
            marginVertical: 8,
          }}
        >
          Ronaldo
        </Text>
        <TouchableOpacity
          onPress={() => navigation.push("EditProfile")}
          style={{
            backgroundColor: "black",
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            width: 250,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            EditProfile
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
                // fontFamily: "bold",
                fontSize: 16,
                color: "#242760",
              }}
            >
              Posts
            </Text>
            <Text
              style={{
                // fontFamily: "bold",
                fontSize: 20,
                color: "#242760",
              }}
            >
              0
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                // fontFamily: "bold",
                fontSize: 16,
                color: "#242760",
              }}
            >
              Followers
            </Text>
            <Text
              style={{
                // fontFamily: "bold",
                fontSize: 20,
                color: "#242760",
              }}
            >
              0
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
