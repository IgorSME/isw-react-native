import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../MainScreens/PostsScreen";
import CreatePostsScreen from "../MainScreens/CreatePostsScreen";
import ProfileScreen from "../MainScreens/ProfileScreen";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Grid, User, Plus } from "react-native-feather";
import DefaultPostScreen from "../NestedScreens/DefaultPostScreen";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";
import AvatarScreen from "../MainScreens/AvatarScreen";
import { useDispatch } from "react-redux";
import { LogOut, ArrowLeft } from "react-native-feather";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { createStackNavigator } from "@react-navigation/stack";

const MainTab = createBottomTabNavigator();
// const MainStack = createNativeStackNavigator();
const MainStack = createStackNavigator();

export default function Home() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  // console.log("Home", "test");
  const HomeTabs = () => {
    return (
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <MainTab.Screen
          name="DefaultPostScreen"
          component={DefaultPostScreen}
          options={{
            title: "Posts",
            tabBarIcon: ({ focused, size, color }) => (
              <Grid size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={signOut} activeOpacity={0.6}>
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
            tabBarStyle: { display: "none" },
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <User size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </MainTab.Navigator>
    );
  };
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarVisible: false,
          title: "Comments",
          headerBackTitleVisible: false,
          headerBackImage: () => <ArrowLeft style={styles.arrowLeft} />,
        }}
      />
      <MainStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Map",
          headerBackTitleVisible: false,
          headerBackImage: () => <ArrowLeft style={styles.arrowLeft} />,
        }}
      />
      <MainStack.Screen
        options={{
          title: "Update avatar",
          headerShown: true,
        }}
        name="CreateAvatarScreen"
        component={AvatarScreen}
      />
    </MainStack.Navigator>
    // <MainTab.Navigator
    //   screenOptions={{
    //     tabBarShowLabel: false,
    //     tabBarStyle: {
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //     },
    //   }}
    // >
    //   <MainTab.Screen
    //     name="Posts"
    //     component={PostsScreen}
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <Grid size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Create"
    //     component={CreatePostsScreen}
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <ImageBackground style={styles.createPostsNab}>
    //           <Plus size={size} color={"#FFFFFF"} />
    //         </ImageBackground>
    //       ),
    //       tabBarStyle: { display: "none" },
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <User size={size} color={color} />
    //       ),
    //       headerShown: false,
    //     }}
    //   />
    // </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
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
  logout: {
    marginRight: 10,
    color: "#BDBDBD",
  },
  arrowLeft: {
    marginLeft: 16,
    color: "#212121",
  },
});
