import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import MainScreen from "./src/screens/MainScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MessageScreen from "./src/screens/MessageScreen";

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
      <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
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
  )
}


export default App; 