import React, { useState, useEffect, useCallback } from "react";
import Main from "./Components/Main";
import { Provider } from "react-redux";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);
  onLayoutRootView();

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
