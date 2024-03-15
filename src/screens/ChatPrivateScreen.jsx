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
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerChat}>
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
              width: 50,
              height: 50,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}
            source={img1} />
          <Text style={{ fontWeight: 'bold' }}>Phạm Thanh Phúc </Text>
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
            <Text style={{ alignSelf: 'center', fontSize: 10, fontStyle: 'italic' }}>16:30</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 5,
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

        <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', borderWidth: 1, borderColor: Colors.borderGrey, height: 50, alignItems: 'center' }}>
          <Image source={action} />
          <Image source={photo} />
          <Image source={gallery} />
          <Image source={audio} />
          <View style={{ borderRadius: 6, flexDirection: 'row', backgroundColor: Colors.borderGrey }}>
            <TextInput style={{ width: 150, marginLeft: 10 }}>Hello</TextInput>

          </View>
          <Image style={{ backgroundColor: Colors.borderGrey }} source={emoji} />
          <Image source={like} />

        </View>
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
    marginTop: 20,
    alignItems: 'center',

  },
  detail: {
    flexDirection: 'column',
  },
  chatContent: {
    margin: 10,
  }
});

export default ChatPrivateScreen;
