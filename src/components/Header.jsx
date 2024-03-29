import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FacebookLogo from "../assets/images/fblogo.png";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleLogo = () => {
    navigation.navigate("Home");
  };

  // const handleLogoPress = useCallback(() => {
  //   navigation.navigate("Home");
  //   reloadData();
  // }, [navigation, reloadData]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogo} >
        <Image source={FacebookLogo} style={styles.fbLogoStyle} />
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        <View style={styles.searchBg}>
          <TouchableOpacity onPress={() => navigation.push("MessageScreen")}>
            <VectorIcon
              name="messenger"
              type="Fontisto"
              size={22}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fbLogoStyle: {
    marginTop: 30,
    height: 25,
    width: 130,
  },

  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Header;
