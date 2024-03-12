import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import FacebookLogo from '../assets/images/fblogo.png';
import VectorIcon from '../utils/VectorIcon';
import { Colors } from '../utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={FacebookLogo} style={styles.fbLogoStyle} />
      <View style={styles.headerIcons}>
        <View style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color={Colors.grey}
          />
        </View>
        <View style={styles.searchBg} >
          <TouchableOpacity
            onPress={() => navigation.push('MessageScreen')}
          >
            <VectorIcon
              name="messenger"
              type="Fontisto"
              size={22}
              color={Colors.grey}

            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fbLogoStyle: {
    height: 25,
    width: 130,
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
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
  },
});

export default Header;
