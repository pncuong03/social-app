import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { getPostofMe } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Carousel from "react-native-snap-carousel";
import Spinner from "react-native-loading-spinner-overlay";

const PrivatePost = ({ accessToken }) => {
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
                if (!accessToken) {
                    console.error("Invalid accessToken or userId");
                    return;
                }
                const data = await getPostofMe(accessToken);
                if (!data || !data.content) {
                    console.error("Invalid response from API");
                    return;
                }
                const sortedPosts = data.content.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const filteredPosts = sortedPosts.filter(post => post.type !== 'GROUP');
                console.log(filteredPosts);
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
            {posts.map((item) => {
                const data = item.sharePost ? item.sharePost : item;
                return (
                    <View key={data.id}>
                        <PostHeader data={data} onClose={() => onClosePost(data.id)} />
                        <Carousel
                            data={data.imageUrls}
                            renderItem={ImageSlider}
                            sliderWidth={windowWidth}
                            itemWidth={windowWidth}
                        />
                        <PostFooter data={data} />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: Colors.white,
        marginTop: 8,
    },
    postImg: {
        height: 500,
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PrivatePost;