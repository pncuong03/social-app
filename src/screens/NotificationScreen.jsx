import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import { AuthContext } from "../context/AuthContext";
import { fetchNotifications } from "../context/NotificationContext";
import { formatNoti } from "../utils/Fomart";
import TimeComparison from "../utils/Time";

const NotificationScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications(userInfo.accessToken);
        setNoti(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Notifications</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        {noti.map((notify) => (
          <TouchableOpacity
            key={notify.id}
            // onPress={() => onNotificationPress(notify.postId)}
          >
            <View style={[styles.inforNotify]}>
              <Image
                style={styles.imgNotify}
                source={{ uri: notify.interact.imageUrl }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 26,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ marginRight: 8, fontWeight: "bold", fontSize: 20 }}
                >
                  {notify.interact.fullName}
                </Text>
                <Text style={{ fontSize: 16, maxWidth: "auto" }}>
                  {formatNoti(notify.interactType)}
                </Text>
              </View>
              <View
                style={{ position: "absolute", marginLeft: 60, paddingTop: 20 }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>
                  <TimeComparison time={notify.createdAt} />
                </Text>
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
