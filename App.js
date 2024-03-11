import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Navigation from './navigation/Navigation';

const Stack = createNativeStackNavigator();

function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName='Login'> 
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       <Stack.Screen name="SignUp" component={SignupScreen} />
  //       <Stack.Screen name="Home" component={HomeScreen} />
        
  //     </Stack.Navigator>
     
  //   </NavigationContainer>
  // );
  return <Navigation />
}

//screenOptions={{headerShown: false}}
export default App;