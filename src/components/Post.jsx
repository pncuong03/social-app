import { View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../utils/Colors';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import { PostData } from '../data/PostData';

const Post = () => {
  const [posts, setPosts] = useState([...PostData]); 

  const handleClosePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <View style={styles.postContainer}>
      {posts.map(item => (
        <View key={item.id}>
          <PostHeader data={item} onClose={() => handleClosePost(item.id)} />
          <Image source={item.postImg} style={styles.postImg} />
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
    width: '100%',
    height: 250,
  },
});

export default Post;
