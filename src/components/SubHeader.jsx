import {View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Profile from '../assets/images/img1.jpeg';
import {Colors} from '../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import VectorIcon from '../utils/VectorIcon';

const SubHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.push('ProfileScreen')} >
      <Image source={Profile} style={styles.profileStyle} />
      </TouchableOpacity >
      <TouchableOpacity style={styles.inputBox} onPress={() => navigation.push('NewPost')} >
        <View >
          <Text style={styles.inputStyle}>Write something here...</Text>
          <Text style={styles.inputStyle}>Seven...</Text>
        </View>
      </TouchableOpacity >
      <View style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color={Colors.grey}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  searchBg: {
    backgroundColor: Colors.lightgrey,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: '70%',
    paddingVertical: 3,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SubHeader;
