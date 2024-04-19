import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import MainScreen from "./src/screens/MainScreen";
import SplashScreen from "./src/screens/SplashScreen";
import MessageScreen from "./src/screens/MessageScreen";
import EditProfile from "./src/screens/EditProfile";
import ProfileScreen from "./src/screens/ProfileScreen";
import ChatPrivateScreen from "./src/screens/ChatPrivateScreen";
import SearchMessageScreen from "./src/screens/SearchMessage";
import SearchGroupMessageScreen from "./src/screens/SearchGroupMeassageScreen";
import GroupMessageScreen from "./src/screens/GroupMessageScreen";
import NewPost from "./src/screens/NewPost";
import MenuScreen from "./src/screens/MenuSreen";
import GroupScreen from "./src/screens/GroupScreen";
import GroupListsScreen from "./src/screens/GroupListsSreen";
import NewGroup from "./src/screens/NewGroup";
import GroupDetail from "./src/screens/GroupDetail";
import GroupMemberListScreen from "./src/screens/GroupMemberListScreen";
import MessageDetail from "./src/screens/MessageDetail";
import ManageMember from "./src/screens/ManageMember";
import AddMemberGroup from "./src/screens/AddMemberGroup";
import CommentDetail from "./src/components/CommentDetail";
import { Colors } from "./src/utils/Colors";
import FriendList from "./src/screens/FriendList";
import FriendProfile from "./src/screens/FriendProfile";
import AddMember from "./src/screens/AddMember";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  const isAuthenticated = userInfo && userInfo.accessToken;

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
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
            <Stack.Screen name="FriendList" component={FriendList} />
            <Stack.Screen name="FriendProfile" component={FriendProfile} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen name="Group for you" component={GroupListsScreen} />
            <Stack.Screen name="New Group" component={NewGroup} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            {/* <Stack.Screen name="NewPostInGroup" component={NewPostInGroup} /> */}
            <Stack.Screen
              name="GroupMemberListScreen"
              component={GroupMemberListScreen}
            />
            <Stack.Screen name="MessageDetail" component={MessageDetail} />
            <Stack.Screen name="ManageMember" component={ManageMember} />
            <Stack.Screen name="AddMemberGroup" component={AddMemberGroup} />
            <Stack.Screen name="CommentDetail" component={CommentDetail} />
            <Stack.Screen name="AddMember" component={AddMember} />
          </>
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
