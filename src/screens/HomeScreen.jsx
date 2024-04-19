import { StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SubHeader from "../components/SubHeader";
import { Colors } from "../utils/Colors";
import Post from "../components/Post";
import { AuthContext } from "../context/AuthContext";
import { fetchUserInfo } from "../context/ProfileContext";

const HomeScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(userInfo.accessToken);
        setImage(data.imageUrl);
        setUser(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <SubHeader data={image} />
      <Post user={user} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
