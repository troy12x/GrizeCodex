// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './src/components/MyTabBar';
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import AddMoney from './src/screens/AddMoney/AddMoney';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import CartScreen from './src/screens/CartScreen/CartScreen';
import Preview from './src/screens/PreviewScreen/Preview';
import CartSection from './src/screens/CartSection/CartSection';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{tabBarIcon: 'home'}}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{tabBarIcon: 'cart'}}
      />
      {/* <Tab.Screen name="AddMoney" component={AddMoney} options={{tabBarIcon: "plus"}} /> */}
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{tabBarIcon: 'setting'}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{tabBarIcon: 'user'}}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AddMoney"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="AddMoney" component={AddMoney} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Preview" component={Preview} />
          <Stack.Screen name="CartSection" component={CartSection} />

          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeStack" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
