import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LogOut, ArrowLeft } from "react-native-feather";

import DefaultPostScreen from "../NestedScreens/DefaultPostScreen";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";

const NestedStack = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="DefaultPostScreen"
        component={DefaultPostScreen}
        options={{
          title: "Posts",
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
      <NestedStack.Screen
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
      <NestedStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Map",
          headerBackTitleVisible: false,
          headerBackImage: () => <ArrowLeft style={styles.arrowLeft} />,
        }}
      />
    </NestedStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
