import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import img1 from "../assets/images/img1.jpeg";
import { notifyResponses } from "../data/NotifycationData";

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Notifications</Text>
        <TouchableOpacity>
          <VectorIcon
            name="search1"
            type="AntDesign"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "column", backgroundColor: Colors.borderGrey }}
      >
        <Text style={styles.new}>New</Text>
        {notifyResponses.map((notify) => (
          <View key={notify.id} style={styles.inforNotify}>
            <Image style={styles.imgNotify} source={notify.image} />
            <View style={{ flexDirection: "row", marginBottom: 26 }}>
              <Text style={{ marginRight: 4, fontWeight: "500" }}>
                {notify.name}
              </Text>
              <Text>{notify.notify}</Text>
            </View>
            <View
              style={{ position: "absolute", marginLeft: 60, paddingTop: 20 }}
            >
              <Text>{notify.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgNotify: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  inforNotify: {
    backgroundColor: Colors.borderGrey,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    height: 60,
    marginLeft: 15,
  },
  new: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
  },
  subNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: "500",
  },
});

export default NotificationScreen;
