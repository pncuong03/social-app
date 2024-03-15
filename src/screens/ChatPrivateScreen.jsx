import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../utils/Colors";
import { friendRequests } from "../data/FriendData";

const ChatPrivateScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Private chat</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatPrivateScreen;
