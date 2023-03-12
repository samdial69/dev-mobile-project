import React, { useState, useEffect } from "react";
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
  randomColor,
} from "react-native";
import PrintImage from "./flatListSlider/PrintImage";
import {FlatListSlider} from 'react-native-flatlist-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getColorName, getImages} from "../api/http";

import Colors from "../definitions/Colors";

const Home = ({ navigation }) => { 
  const [savedColors, setSavedColors] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
 
  useEffect(() => {  
    (async () => { 
      try {
        const savedColorsData = await AsyncStorage.getItem('colors');
        
        const parsedSavedColors = JSON.parse(savedColorsData);
        setSavedColors(parsedSavedColors);
        const promises = parsedSavedColors.map(colorObj => getColorName(colorObj.color));
        const results = await Promise.all(promises);
        const namedColors = results.map(result => result.name.value);
        const updatedSavedColors = parsedSavedColors.map((colorObj, index) => ({
          ...colorObj,
          color: namedColors[index],
          namedColor: namedColors[index]
        }));
        setSavedColors(updatedSavedColors.filter((_, index) => index < 5));
        
        const savedImagesData = await AsyncStorage.getItem('images');
        if (savedImagesData) {  

          const parsedSavedImages = JSON.parse(savedImagesData);
          setSavedImages([{parsedSavedImages}]);
          console.log(savedImages);
        }
      } catch (error) {
        console.log('Error retrieving saved colors:', error);
      }
    })();
  }, []); 

  if (savedColors === null) {
    return <Text style={styles.emptyText}>Aucune recherche effectué pour l'instant</Text>;
  }
  
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
 
  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <Text style={styles.headTitle}>
          Dernières recherches
        </Text>
        <FlatList
          data={savedImages}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune recherche effectué pour l'instant</Text>}
          renderItem={({ item }) => (
            <View style={styles.imageContainer} key={item.id}>
              <Image style={styles.image} source={{ uri: item.parsedSavedImages }} />
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />


        <Text style={styles.headTitle2}>
          Dernires couleurs recherchées
        </Text>
        <FlatList
          data={savedColors}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune recherche effectué pour l'instant</Text>}
          renderItem={({ item }) => (
            <View style={styles.ColorItem} key={item.id}>
              <View  style={[styles.ColorRound,{backgroundColor: "#" + item.color}]}/>
              <Text style={styles.ColorTitle}>{item.namedColor}</Text>
            </View>
          )}
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
    borderRadius: 65,
  },
  ColorTitle: {
    textAlignVertical: "center",
    marginLeft: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 10,
    marginRight: -10,
  },
  image: {
    width: 275,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  emptyText: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});