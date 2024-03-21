import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import VectorIcon from '../utils/VectorIcon';
import { Colors } from '../utils/Colors';
import Logo from '../assets/images/logo.png';
import MetaLogo from '../assets/images/meta-logo.png';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onRegister = () => {
    if (fullname && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match!');
        return;
      }
  
      axios.post('https://reqres.in/api/register', {
        email: email,
        password: password,
      })
        .then((response) => {
          const data = response.data;
          if (data.id && data.token) {
            Alert.alert('Registration sucess!');
            console.log('User account created & signed in!');
            console.log('User ID:', data.id);
            console.log('Token:', data.token);
            navigation.replace("LoginScreen");
          } else {
            console.log('Registration failed:', data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
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
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
        <TextInput
          placeholder="Full Name"
          value={fullname}
          onChangeText={value => setFullname(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Mobile number or email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Password"
          value={confirmPassword}
          onChangeText={value => setConfirmPassword(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Confirm Password"
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.inputBox}
        />
        <TouchableOpacity style={styles.loginButton} onPress={onRegister}>
          <Text style={styles.login}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newAccount} onPress={() => navigation.navigate('LoginScreen')} >
          <Text style={styles.newAccountText}>Already have an account?</Text>
        </TouchableOpacity>
        <Image source={MetaLogo} style={styles.metaLogoStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 68,
    width: 50,
    marginVertical: '20%',
  },
  container: {
    padding: 16,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: '95%',
    marginTop: 12,
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
    marginTop: 12,
  },
  login: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  forgotPass: {
    color: Colors.grey,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
  },
  newAccount: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
    width: '95%',
    alignItems: 'center',
    marginTop: '35%',
  },
  newAccountText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: '400',
  },
  metaLogoStyle: {
    height: 15,
    width: 70,
    marginTop: 15,
  },
});

export default RegisterScreen;