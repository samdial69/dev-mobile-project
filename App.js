import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-root-siblings";

import Navigation from "./src/components/Navigation"
import Splash from './src/components/splashScreen/splashScreen';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set the time for which you want to display the splash screen.
  }, []);

  return (
    <RootSiblingParent>
      {isLoading ? (
        <View style={styles.container}>
          <Splash />
        </View>
      ) : (
        <NavigationContainer>
          <Navigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      )}
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
