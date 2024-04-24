import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { getPostofMe } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Carousel from "react-native-snap-carousel";
import Spinner from "react-native-loading-spinner-overlay";

const PrivatePost = () => {
  const { userInfo } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const onClosePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    const getAllPost = async () => {
      setIsLoading(true);
      try {
        const data = await getPostofMe(userInfo.accessToken);
        if (!data || !data.content) {
          console.error("Invalid response from API");
          return;
        }
        const sortedPosts = data.content.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const filteredPosts = sortedPosts.filter(
          (post) => post.type !== "GROUP"
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error getAllPost:", error);
      } finally {
        setIsLoading(false);
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
      <Spinner visible={isLoading} />
      {posts.map((item) => (
        <View key={item.id}>
          {item.sharePost ? (
            <View>
              <PostHeader
                data={item}
                onClose={() => onClosePost(item.id)}
                showCloseButton={true}
              />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 8,
                  overflow: "hidden",
                  marginRight: 10,
                  marginLeft: 10,
                }}
              >
                <PostHeader data={item.sharePost} showCloseButton={false} />

                <Carousel
                  data={item.sharePost.imageUrls}
                  renderItem={ImageSlider}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth}
                />
              </View>

              <PostFooter data={item} />
            </View>
          ) : (
            <View>
              <PostHeader
                data={item}
                onClose={() => onClosePost(item.id)}
                showCloseButton={true}
              />

              <Carousel
                data={item.imageUrls}
                renderItem={ImageSlider}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
              />

              <PostFooter data={item} />
            </View>
          )}
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

export default PrivatePost;
