import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Text,
  randomColor
} from "react-native";
import PrintImage from "./flatListSlider/PrintImage";
import {FlatListSlider} from 'react-native-flatlist-slider';


import Colors from "../definitions/Colors";

const Home = ({ navigation }) => {

  const images = [
    {
      image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
      desc:
       'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
  ]

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rouge',
      color: '#ff0000',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Bleu',
      color: '#1AA7EC',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      title: 'Vert',
      color: '#008000',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29i56',
      title: 'Jaune',
      color: '#FFF500',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29a32',
      title: 'Violet',
      color: '#7f00ff',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <Text style={styles.headTitle}>
          Dernières recherches
        </Text>
        <FlatListSlider
          data={images}
          width={275}
          timer={5000}
          component={<PrintImage />}
          onPress={item => alert(JSON.stringify(item))}
          indicatorActiveWidth={40}
          contentContainerStyle={{paddingHorizontal: 16}}
        />
        <Text style={styles.headTitle2}>
          Vos couleurs populaires
        </Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.ColorItem} >
              <View style={[styles.ColorRound,{backgroundColor: item.color}]}/>
              <Text style={styles.ColorTitle}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  homeContainer: {
    marginBottom: 16,
  },
  headTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  ColorItem: {
    flexDirection: "row",
    marginRight: 0,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  ColorRound: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
  },
  ColorTitle: {
    textAlignVertical: "center",
    marginLeft: 10,
    fontWeight: "bold",
  }
});