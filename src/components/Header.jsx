import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useState, useEffect, useContext } from "react";
import FacebookLogo from "../assets/images/fblogo.png";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push("MainScreen");
        }}
      >
        <Image source={FacebookLogo} style={styles.fbLogoStyle} />
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        <View style={styles.searchBg}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("MessageScreen");
            }}
          >
            <View style={styles.messageContainer}>
              <VectorIcon
                name="messenger"
                type="Fontisto"
                size={22}
                color={Colors.grey}
              />
              {data.messageCount > 0 && (
                <View style={styles.messageCountContainer}>
                  <Text style={styles.messageCountText}>
                    {data.messageCount}
                  </Text>
                </View>
              )}
            </View>
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
  messageContainer: {
    position: "relative",
  },
  messageCountContainer: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  messageCountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Header;
