import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Grid } from "react-feather";

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import PostsScreen from "../Screens/MainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/MainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/MainScreens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Grid size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen name="Create" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
}
