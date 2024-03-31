import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { fetchPostPublic } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Carousel from "react-native-snap-carousel";

const Post = () => {
  const { userInfo } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const windowWidth = Dimensions.get("window").width;

  const onClosePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };
  useEffect(() => {
    const getAllPost = async () => {
      try {
        const data = await fetchPostPublic(userInfo.accessToken);
        setPosts(data.content);
      } catch (error) {
        console.error("Error getAllPost:", error);
      }
    };
    getAllPost();
  }, []);

  const ImageSlider = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item }}
        style={[styles.postImg, { width: windowWidth }]}
      />
    </View>
  );

  return (
    <View style={styles.postContainer}>
      {posts.map((item) => (
        <View key={item.id}>
          <PostHeader data={item} onClose={() => onClosePost(item.id)} />
          <Carousel
            data={item.imageUrls}
            renderItem={ImageSlider}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />

          <PostFooter data={item} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  postImg: {
    height: 250, // Chiều cao có thể điều chỉnh theo nhu cầu
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
