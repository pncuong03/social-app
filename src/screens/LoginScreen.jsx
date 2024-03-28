import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import Logo from "../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* <VectorIcon
        name="arrow-back"
        type="Ionicons"
        color={Colors.black}
        size={20}
        onPress={() => navigation.navigate("SplashScreen")}
      /> */}
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
        <Text style={styles.textLogo}>PaceBook</Text>
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
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            login(username, password);
          }}
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
