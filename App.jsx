import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import { Colors } from "./src/utils/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./src/screens/RegisterScreen";
import MainScreen from "./src/screens/MainScreen";
import MessageScreen from "./src/screens/MessageScreen";
import GroupMessageScreen from "./src/screens/GroupMessageScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfile from "./src/screens/EditProfile";
import NewPost from "./src/screens/NewPost";
import SearchGroupMessageScreen from "./src/screens/SearchGroupMeassageScreen";
import SearchMessageScreen from "./src/screens/SearchMessage";
import SplashScreen from "./src/screens/SplashScreen";
import MenuScreen from "./src/screens/MenuSreen";
import GroupScreen from "./src/screens/GroupScreen";
import ChatPrivateScreen from "./src/screens/ChatPrivateScreen";
import GroupLists from "./src/screens/GroupListsSreen";
import NewGroup from "./src/screens/NewGroup";
import GroupDetail from "./src/screens/GroupDetail";
import NewPostInGroup from "./src/screens/NewPostInGroup";
import GroupMemberListScreen from "./src/screens/GroupMemberListScreen";
import MessageDetail from "./src/screens/MessageDetail";
import ManageMember from "./src/screens/ManageMember";
import AddMemberGroup from "./src/screens/AddMemberGroup";

// import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  // const [user, setUser] = useState();

  // const onAuthStateChanged = (user) => setUser(user);

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {user ? */}
        {/* <Stack.Screen name="MainScreen" component={MainScreen} /> */}
        {/* : */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
