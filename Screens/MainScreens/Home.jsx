import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../MainScreens/PostsScreen";
import CreatePostsScreen from "../MainScreens/CreatePostsScreen";
import ProfileScreen from "../MainScreens/ProfileScreen";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Grid, User, Plus, LogOut } from "react-native-feather";

const MainTab = createBottomTabNavigator();

export default function Home() {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Grid size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("This is a button!")}
              activeOpacity={0.6}
            >
              <LogOut style={styles.logout} />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ImageBackground style={styles.createPostsNab}>
              <Plus size={size} color={"#FFFFFF"} />
            </ImageBackground>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 10,
    color: "#BDBDBD",
  },
  createPostsNab: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    // marginTop: 9,
  },
});
