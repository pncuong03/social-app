import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
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

  const handleLogin = () => {
    // Kiểm tra xem tài khoản và mật khẩu có được nhập không
    if (!username || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tài khoản và mật khẩu");
    } else {
      // Nếu có giá trị, gọi hàm login
      login(username, password);
    }
  };
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.fullName}</Text>
        {user.birthday && <Text style={styles.profileBirthday}>
          {new Date(user.birthday).toLocaleDateString()}
        </Text>}
        <TouchableOpacity
          onPress={() => navigation.push("EditProfile")}
          style={styles.editProfileButton}
        >
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Posts</Text>
            <Text style={styles.profileStatsValue}>{posts.length}</Text>
          </View>
          <View style={styles.profileStatsItem}>
            <Text style={styles.profileStatsLabel}>Followers</Text>
            <Text style={styles.profileStatsValue}>{followers}</Text>
          </View>
        </View>
      </View>

      <View style={styles.postContainer}>
        {PostData.map(item => (
          <View key={item.id}>
            <PostHeader data={item} />
            <Image source={item.postImg} style={styles.postImg} />
            <PostFooter data={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    height: 180,
    width: "100%",
  },
  backButton: {
    zIndex: 99,
    position: "absolute",
    left: 0,
    top: 10,
  },
  profileText: {
    fontSize: 30,
    fontWeight: "500",
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  profileBirthday: {
    fontSize: 16,
    lineHeight: 20,
    color: "black",
    marginVertical: 4,
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#242760",
    overflow: "hidden",
    marginTop: -90,
  },
  profileName: {
    fontSize: 18,
    lineHeight: 22,
    color: "black",
    marginVertical: 8,
  },
  editProfileButton: {
    backgroundColor: "black",
    height: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  editProfileButtonText: {
    color: "white",
    fontSize: 16,
  },
  profileStatsContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  profileStatsItem: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  profileStatsLabel: {
    fontSize: 16,
    color: "#242760",
  },
  profileStatsValue: {
    fontSize: 20,
    color: "#242760",
  },
  postsContainer: {
    flex: 1,
    marginTop: 20,
  },
  postItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  postImg: {
    width: '100%',
    height: 250,
  },
});

export default LoginScreen;