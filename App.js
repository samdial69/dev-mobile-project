import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-root-siblings";

import Navigation from "./src/components/Navigation"

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Navigation />
          <StatusBar style="auto" />
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
