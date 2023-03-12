import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ListView, FlatList} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {getColorName, getImages} from "./api/http";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ColoredCircle = ({ color, label }) => (
    <View style={styles.circleContainer}>
      <View style={{ ...styles.circle, backgroundColor: `#`+color }} />
      <Text style={styles.label}>{label}</Text>
    </View>
);

const ResultPage = ({navigation}) => {
    const route = useRoute();
    const image = route.params.imageUri;
    const paramData = route.params.dataParam;
    const colorsList = route.params.colorsList;


    const [colorsName, setColorsName] = useState([]);
    const [arrayOfColors, setArrayOfColors] = useState([]);

    useEffect(() => {
        (async () => {
            setColorsName([]);
            const promises = [];
            if (colorsList) {
                for (const color of colorsList) {
                    promises.push(getColorName(color));
                }
                const results = await Promise.all(promises);
                for (const result of results) {
                    colorsName.push(result.name.value);
                }
            }
            const arr = getArrayOfColors(colorsList, colorsName);
            setArrayOfColors(arr);
            saveColors(arr);
            try {
                await AsyncStorage.setItem('images', JSON.stringify(image));
                console.log(await AsyncStorage.getItem('images'));
            } catch (error) {
                console.log('Error saving images: ', error);
            }
            console.log(arrayOfColors);
        })();
    }, []);

    const getArrayOfColors = (colorsList, colorsName) => {
        const arr = [];
        for (let i = 0; i < colorsList.length; i++) {
          arr.push({color: colorsList[i], name: colorsName[i]});
        }
        setArrayOfColors(arr);
        return arr;
    }

    const saveColors = async (colors) => {
        try {
          await AsyncStorage.setItem('colors', JSON.stringify(colors));
          console.log('Colors saved successfully');
        } catch (error) {
          console.log('Error saving colors: ', error);
        }
    };
      
    const saveImages = async (image) => {
        try {
          await AsyncStorage.setItem('images', JSON.stringify(image));
          console.log('Images saved successfully');
        } catch (error) {
          console.log('Error saving images: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: image}} style={styles.image} resizeMode={'contain'}/>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>Couleurs :</Text>
                <View style={styles.circles}>
                    <FlatList 
                        data={arrayOfColors}
                        horizontal={true}
                        renderItem={({item}) => (
                            <View style={styles.colorsCircle}>
                                <ColoredCircle color={item.color} label={item.name}/> 
                            </View>
                        )}
                        keyExtractor={item => item.color}
                    />
                </View>
                <View style={styles.otherInfoContainer}>
                    <Text style={styles.title}>Autres informations :</Text>
                    <View style={styles.otherInfoTextContainer}>
                        <Text style={styles.otherInfoText}>Info ici</Text>
                        <Text style={styles.otherInfoText}>Info ici</Text>
                        <Text style={styles.otherInfoText}>Info ici</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  bottom: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#cccccc',
  },
  label: {
    marginTop: 10,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  colorsCircle: {
    marginRight: 10,
  },
  otherInfoContainer: {
    marginTop: 20,

  },
  otherInfoTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  otherInfoText: {
    backgroundColor: "#E8E8E8",
    marginRight: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 35,
    fontWeight: "bold",
  }
});

export default ResultPage;
