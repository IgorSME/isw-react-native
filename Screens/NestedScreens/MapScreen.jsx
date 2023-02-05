import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: route.params.location.latitude,
          longitude: route.params.location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.location.latitude,
            longitude: route.params.location.longitude,
          }}
          title="Photo location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
