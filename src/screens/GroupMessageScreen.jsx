import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Avatar from '../assets/images/avatarChat.png'
import img1 from '../assets/images/img1.jpeg';
import img2 from '../assets/images/img2.jpeg';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '../utils/Colors';

const GroupMessageScreen = () => {
    return (
        <View style={style.container}>

            <View style={{ borderBottomWidth: 2, marginTop: 50 }}>
                <AntDesign style={{}} name="arrowleft" size={24} color="black" />
            </View>
            <View style={style.header}>
                <Image source={Avatar} style={style.imgHeader}
                />
                <Text style={style.chatsText}>Chats</Text>
                <AntDesign name="camera" size={26} color="black" style={style.imgCamera} />
                <AntDesign name="pluscircle" size={24} color="black" style={style.plusIcon} />
            </View >
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={style.searchView}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput>Search</TextInput>
                </TouchableOpacity>
                <View style={style.unread}>
                    <Text>Unread</Text>
                </View>
            </View>
            <View style={style.chatView}>
                <Image style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    marginRight: 10
                }}
                    source={img2}
                />
                <View>
                    <Text>Phạm Thanh Phúc</Text>
                    <Text>You:OK.Thanks</Text>
                </View>
                <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline" size={20} color="black" style={style.checkBox} />
            </View>

        </View >
    )
}
const style = StyleSheet.create({
    checkBox: {
        marginLeft: "40%",
    },
    chatView: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        margin: 10,
        borderWidth: 2,
        borderColor: Colors.borderGrey
    },
    unread: {
        marginTop: 16,
        backgroundColor: Colors.borderGrey,
        borderRadius: 15,
        padding: 6,
        marginLeft: 5
    },
    searchView: {
        alignItems: 'center',
        width: 260,
        flexDirection: 'row',
        backgroundColor: Colors.borderGrey,
        borderRadius: 15,
        marginLeft: 20,
        marginTop: 16,

    },
    imgCamera: {
        marginTop: 25,
        marginLeft: 120
    },
    plusIcon: {
        marginTop: 25,
        marginLeft: 10
    },
    chatsText: {
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft: 15,
        marginTop: 20
    },
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    header: {

        marginTop: 20,
        width: '100%',
        height: 60,
        flexDirection: 'row'
    },
    imgHeader: {
        marginTop: 10,
        borderRadius: 16,
        width: '16%',
        height: '100%',
        marginLeft: 20
    }

})

export default GroupMessageScreen;
