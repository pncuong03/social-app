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
import { notifyResponses } from "../data/NotifycationData";
import { useNavigation } from "@react-navigation/native";


const NotificationScreen = () => {
  const navigation = useNavigation();

  const handleNotificationPress = (postId) => {
    navigation.navigate("PostDetail", { postId: postId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Notifications</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        {notifyResponses.map((notify) => (
          <TouchableOpacity
            key={notify.id}
            onPress={() => handleNotificationPress(notify.postId)}
          >
            <View style={[styles.inforNotify]}>
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
          </TouchableOpacity>
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
