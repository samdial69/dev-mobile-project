import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Home from "./Home"

import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";
import HistoryPage from "./HistoryPage";
import ActionPage from "./ActionPage";
import ResultPage from "../ResultPage";

const HomeNavigation = createStackNavigator();
const CameraNavigation = createStackNavigator();
const HistoryNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function HomeStack() {
  return (
    <HomeNavigation.Navigator initialRouteName="ViewHome">
      <HomeNavigation.Screen
        name="ViewHome"
        component={Home}
        options={{ title: "Accueil" }}
      />
    </HomeNavigation.Navigator>
  );
}

function CameraStack() {
  return (
    <CameraNavigation.Navigator initialRouteName="ViewCamera">
      <CameraNavigation.Screen
        name="ViewActionCamera"
        component={ActionPage}
        options={{ title: "Camera" }}
      />
      <CameraNavigation.Screen
        name="ViewChoice"
        component={ActionPage}
        options={{ title: "Choix" }}
      />
      <CameraNavigation.Screen
        name="ViewResult"
        component={ResultPage}
        options={{ title: "Resultat" }}
      />
    </CameraNavigation.Navigator>
  );
}

function HistoryStack() {
    return (
      <HistoryNavigation.Navigator initialRouteName="ViewHistory">
        <HistoryNavigation.Screen
          name="ViewHistory"
          component={HistoryPage}
          options={{ title: "Historiques" }}
        />
        <HistoryNavigation.Screen
          name="ViewResult"
          component={ResultPage}
          options={{ title: "Resultat" }}
        />
      </HistoryNavigation.Navigator>
    );
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      style={{ display:"flex",justifyContent:"center"}}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary_blue,
        headerShown: false,
      }}>
      <TabNavigation.Screen
        name= "Home"
        component={HomeStack}
        options={() => ({
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={Assets.icons.homeIcon}
                style={{ tintColor: color, height: 30,width: 30 }}
              />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="Camera"
        component={CameraStack}
        options={() => ({
           tabBarLabel:() => {return null},
           tabBarIcon: ({ color }) => {
            return (
              <Image source={Assets.icons.cameraIcon} style={{ tintColor: color,height: 30,width: 30 }} />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="History"
        component={HistoryStack}
        options={() => ({
           tabBarLabel:() => {return null},
           tabBarIcon: ({ color }) => {
            return (
              <Image source={Assets.icons.galleryIcon} style={{ tintColor: color,height: 30,width: 30 }} />
            );
          },
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;