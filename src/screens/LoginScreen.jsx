import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import Logo from "../assets/images/logo.png";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {
    if (email && password) {
      axios.post('https://dummyjson.com/auth/login', {
        username: email,
        password: password,
      })
        .then((response) => {
          const data = response.data;
          if (data.token && data.id) {
            console.log('User logged in!');
            console.log('Token:', data.token);
            console.log('User ID:', data.id); 
            console.log('User email:', data.email); 
            navigation.navigate("MainScreen");
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          Alert.alert('Login failed. Please check your email and password.');
        });
    } else {
      Alert.alert('Please fill in details!');
    }
  };


  

  return (
    <View style={styles.container}>
      <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.navigate("SplashScreen")}
      />
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
        <Text style={styles.textLogo}>PaceBook</Text>
        <TextInput
          placeholder="Mobile number or email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputBox}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputBox}
        />
        <TouchableOpacity
          style={styles.loginButton}
           onPress={onLogin}
        >
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPass}>OR</Text>
        <TouchableOpacity
          style={styles.newAccount}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.newAccountText}>Create new account</Text>
        </TouchableOpacity>
        {/* <Image source={MetaLogo} style={styles.metaLogoStyle} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLogo: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: -50
  },
  logoStyle: {
    height: 125,
    width: 95,
    marginVertical: "15%",
  },
  container: {
    padding: 16,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: "95%",
    marginTop: 12,
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 20,
    width: "95%",
    alignItems: "center",
    marginTop: 12,
  },
  login: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
  forgotPass: {
    color: Colors.grey,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 25,
  },
  newAccount: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
    width: "95%",
    alignItems: "center",
    marginTop: "10%",
  },
  newAccountText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: "400",
  },
  metaLogoStyle: {
    height: 15,
    width: 70,
    marginTop: 15,
  },
});

export default LoginScreen;
