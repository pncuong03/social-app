import {View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Like from '../assets/images/like.jpeg';
import Shock from '../assets/images/shock.jpeg';
import Heart from '../assets/images/heart.jpeg';
import {Colors} from '../utils/Colors';
import VectorIcon from '../utils/VectorIcon';

const PostFooter = ({data}) => {

  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentPress = () => {
    // Xử lý khi nút comment được nhấn
  };

  const handleSharePress = () => {
    // Xử lý khi nút share được nhấn
  };

  return (
    <View style={styles.postFooterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleLikePress}>
            <Image source={Like} style={styles.reactionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentPress}>
            <Image source={Shock} style={styles.reactionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSharePress}>
            <Image source={Heart} style={styles.reactionIcon} />
          </TouchableOpacity>
          <Text style={styles.reactionCount}>{data.reactionCount}</Text>
        </View>
        <Text style={styles.reactionCount}>{data.comments} comments</Text>
      </View>
      <View style={styles.userActionSec}>
        <TouchableOpacity onPress={handleLikePress}>
          <View style={styles.row} >
            <VectorIcon
              name={isLiked ? "like1" : "like2"}
              type="AntDesign"
              size={25}
              color={isLiked ? '#384CFF' : Colors.grey}
            />
            <Text style={styles.reactionCount}>Like</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCommentPress}>
          <View style={styles.row}>
            <VectorIcon
              name="chatbox-outline"
              type="Ionicons"
              size={25}
              color={Colors.grey}
            />
            <Text style={styles.reactionCount}>Comment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSharePress}>
          <View style={styles.row}>
            <VectorIcon
              name="arrow-redo-outline"
              type="Ionicons"
              size={25}
              color={Colors.grey}
            />
            <Text style={styles.reactionCount}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postFotterContainer: {
    padding: 16,
  },
  reactionCount: {
    color: Colors.grey,
    fontSize: 14,
    paddingLeft: 5,
  },
  footerReactionSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    padding: 15,
  },
  userActionSec: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PostFooter;
