import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import Logo from "../assets/images/logo.png";
import MetaLogo from "../assets/images/meta-logo.png";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { isLoading, register } = useContext(AuthContext);

  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tài khoản và mật khẩu");
    } else {
      register(username, password);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Spinner visible={isLoading} /> */}
      {/* <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.navigate("LoginScreen")}
      /> */}
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
        {/* <TextInput
          placeholder="Full Name"
          value={fullname}
          onChangeText={(value) => setFullname(value)}
          style={styles.inputBox}
        /> */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.inputBox}
        />
        {/* <TextInput
          placeholder="Confirm Password"
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.inputBox}
        /> */}
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.login}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newAccount}
          onPress={() => navigation.navigate("LoginScreen")}
        >
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
    marginVertical: "20%",
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
    marginTop: 15,
  },
  newAccount: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
    width: "95%",
    alignItems: "center",
    marginTop: "35%",
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

export default RegisterScreen;