import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import bglogin from "../assets/images/bg-login.png";
import Logo from "../assets/images/logo.png";

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.headerLogo}>
        <Image source={bglogin} />
        <Image
          style={{
            position: "absolute",
            marginTop: 200,
          }}
          source={Logo}
        />
        <Text
          style={{
            position: "absolute",
            marginTop: 330,
            color: Colors.primaryColor,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Pacebook
        </Text>
      </View>
      <View style={style.chooseBox}>
        <TouchableOpacity
          style={style.choose}
          onPress={() => navigation.push("LoginScreen")}
        >
          <Text style={{ color: Colors.lightgrey, fontWeight: "500" }}>
            Do you have an account?Login now!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.choose}
          onPress={() => navigation.push("RegisterScreen")}
        >
          <Text style={{ color: Colors.lightgrey, fontWeight: "500" }}>
            Create new account!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  chooseBox: {},
  choose: {
    backgroundColor: Colors.primaryColor,
    margin: 5,
    padding: 8,
    borderRadius: 15,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerLogo: {
    alignItems: "center",
    position: "relative",
  },
});
export default SplashScreen;
