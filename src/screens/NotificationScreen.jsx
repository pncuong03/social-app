import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../utils/Colors";
import { AuthContext } from "../context/AuthContext";
import { fetchNotifications } from "../context/NotificationContext";
import { formatNoti } from "../utils/Fomart";
import TimeComparison from "../utils/Time";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await fetchNotifications(page, size, userInfo.accessToken);
      if (data.content.length === 0) {
        setIsLoading(false);
      } else {
        setNotification([...notification, ...data.content]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderNotifications = () => {
    return notification.map((notify) => (
      <TouchableOpacity
        key={notify.id}
        onPress={() => {
          navigation.push("CommentDetail", {
            postId: notify.postId,
            notifyData: notify,
          });
        }}
      >
        <View
          style={[styles.inforNotify, !notify.hasSeen ? styles.unseen : null]}
        >
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
            <Text style={{ marginRight: 8, fontWeight: "bold", fontSize: 20 }}>
              {notify.interact.fullName}
            </Text>
            <Text style={{ fontSize: 16, maxWidth: "auto" }}>
              {formatNoti(notify.interactType)}
            </Text>
          </View>
          <View
            style={{ position: "absolute", marginLeft: 70, paddingTop: 20 }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>
              <TimeComparison time={notify.createdAt} />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <ScrollView
      style={styles.container}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchData();
        }
      }}
      scrollEventThrottle={400}
    >
      <View style={styles.subNav}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Notifications</Text>
      </View>
      <View style={{ flexDirection: "column" }}>{renderNotifications()}</View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : null}
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
    paddingLeft: 10,
    borderRadius: 5,
  },
  unseen: {
    backgroundColor: "lightgray",
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
