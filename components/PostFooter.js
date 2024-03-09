import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Like from '../assets/img/like.jpeg';
import Shock from '../assets/img/shock.jpeg';
import Heart from '../assets/img/heart.jpeg';
import { Colors } from '../utils/Colors'; // Add this line
import VectorIcon from '../utils/VectorIcon'; // Remove this line

const PostFooter = ({ data }) => {
    return (
        <View style={styles.postFotterContainer}>
            <View style={styles.footerReactionSec}>
                <View style={styles.row}>
                    <Image source={Like} style={styles.reactionIcon} />
                    <Image source={Shock} style={styles.reactionIcon} />
                    <Image source={Heart} style={styles.reactionIcon} />
                    <Text style={styles.reactionCount}>{data.reactionCount}</Text>
                </View>
                <Text style={styles.reactionCount}>{data.comments} comments</Text>
            </View>
            <View style={styles.userActionSec}>
                <View style={styles.row}>
                    <VectorIcon
                        name="like2"
                        type="AntDesign"
                        size={25}
                        color={Colors.grey}
                    />
                    <Text style={styles.reactionCount}>Like</Text>
                </View>
                <View style={styles.row}>
                    <VectorIcon
                        name="chatbox-outline"
                        type="Ionicons"
                        size={25}
                        color={Colors.grey}
                    />
                    <Text style={styles.reactionCount}>Comment</Text>
                </View>

                <View style={styles.row}>
                    <VectorIcon
                        name="arrow-redo-outline"
                        type="Ionicons"
                        size={25}
                        color={Colors.grey}
                    />
                    <Text style={styles.reactionCount}>Share</Text>
                </View>
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
        paddingBottom: 15,
    },
    userActionSec: {
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default PostFooter;