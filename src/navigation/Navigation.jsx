import { StatusBar } from "react-native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainScreen from "../screens/MainScreen";
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    // <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splashLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : userInfo.access_token ? (
          <Stack.Screen name="MainScreen" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
      {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="ChatPrivate" component={ChatPrivateScreen} />
            <Stack.Screen
              name="SearchMessageScreen"
              component={SearchMessageScreen}
            />
            <Stack.Screen
              name="SearchGroupMessageScreen"
              component={SearchGroupMessageScreen}
            />
            <Stack.Screen
              name="GroupMessageScreen"
              component={GroupMessageScreen}
            />
            <Stack.Screen name="NewPost" component={NewPost} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen name="Group for you" component={GroupLists} />
            <Stack.Screen name="New Group" component={NewGroup} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            <Stack.Screen name="NewPostInGroup" component={NewPostInGroup} />
            <Stack.Screen
              name="GroupMemberListScreen"
              component={GroupMemberListScreen}
            />
            <Stack.Screen name="MessageDetail" component={MessageDetail} />
            <Stack.Screen name="ManageMember" component={ManageMember} />
            <Stack.Screen name="AddMemberGroup" component={AddMemberGroup} />
          </>
        </Stack.Navigator> */}
    </NavigationContainer>
    // </AuthProvider>
  );
};

export default Navigation;
