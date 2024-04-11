import { View, StyleSheet, Dimensions, Image } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { fetchPostPublic } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import Carousel from "react-native-snap-carousel";

const Post = () => {
  const { userInfo } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const onClosePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const fetchNewPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPostPublic(userInfo.accessToken);
      const sorted = data.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (error) {
      console.error("Error fetching new posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo.accessToken]);

  useEffect(() => {
    fetchNewPosts();
  }, [fetchNewPosts]);

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
      <Spinner visible={isLoading} />
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
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
