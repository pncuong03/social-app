import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../utils/Colors";
import { friendRequests } from "../data/FriendData";
import { useNavigation } from "@react-navigation/native";
import action from '../assets/images/action_mess.jpg';
import audio from '../assets/images/audio_mess.jpg';
import emoji from '../assets/images/emoji_mess.jpg';
import gallery from '../assets/images/gallery_mess.jpg';
import like from '../assets/images/like_mess.png';
import photo from '../assets/images/photo_mess.jpg'
import VectorIcon from "../utils/VectorIcon";
import img1 from '../assets/images/img1.jpeg'
import { TextInput } from "react-native-gesture-handler";


const ChatPrivateScreen = () => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
        <View style={styles.headerChat}>
          <View style={styles.headerUser}>
          <TouchableOpacity onPress={() => navigation.push("MessageScreen")}>
            <VectorIcon
              name="arrowleft"
              type="AntDesign"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 20,
            }}
            source={img1} />
          <Text style={{ fontWeight: 'bold' }}>Phạm Thanh Phúc </Text>
          </View>
          <TouchableOpacity
            style={{ marginLeft: 100 }}
            onPress={() => navigation.push("SearchMessageScreen")}
          >
            <VectorIcon
              name="search1"
              type="AntDesign"
              size={24}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View >

        <View style={{ flex: 1 }}>
          <ScrollView style={styles.chatContent}>
            <Text style={{ alignSelf: 'center', fontSize: 15, fontStyle: 'italic' }}>16:30</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 26,
                  height: 26,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 20,
                }} source={img1} />
              <View style={{ flex: 1 }}>
                <View style={styles.detail}>
                  <Text style={{ color: Colors.textGrey }}>Phúc</Text>
                  <Text>Hello!</Text>
                  <Text>Nice Tooo meetttt yoouuuu</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', borderColor: Colors.borderGrey, height: 50, alignItems: 'center', padding:10, marginBottom:20}}>
          <Image source={action} />
          <Image source={photo} />
          <Image source={gallery} />
          <Image source={audio} />
          <View style={{ borderRadius: 20, flexDirection: 'row', backgroundColor: Colors.borderGrey }}>
            <TextInput style={{ width: 150, height:30, marginLeft: 10 }} placeholder="Aa"></TextInput>

          </View>
          <Image style={{ backgroundColor: Colors.borderGrey }} source={emoji} />
          <Image source={like} />

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerChat: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'column',
    paddingTop: 20,
  },
  chatContent: {
    margin: 10,
  }
});

export default ChatPrivateScreen;
