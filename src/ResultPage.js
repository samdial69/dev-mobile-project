import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {getColorName, getImages} from "./api/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

const ColoredCircle = ({ color, label }) => {
  const speakText = async () => {
    try {
      await Speech.speak("C'est la couleur :" + label);
      console.log('Coleye speak to say :', label);
    } catch (error) {
      console.log('Error in speech recognition:', error);
    }
  }  

  return (
    <View style={styles.circleContainer}>
      <TouchableOpacity onPress={speakText}>
        <View style={{ ...styles.circle, backgroundColor: `#`+color }} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
 }

const ResultPage = ({navigation}) => {
    const route = useRoute();
    const image = route.params.imageUri;
    const paramData = route.params.dataParam;
    const colorsList = route.params.colorsList;


    const [colorsName, setColorsName] = useState([]);
    const [arrayOfColors, setArrayOfColors] = useState([]);
    const [nudity, setNudity] = useState({
        erotica: '',
        suggestive: '',
        suggestive_classes: {
          bikini: '',
          cleavage: '',
          lingerie: '',
          male_chest: '',
          miniskirt: '',
        },
      });
      const [textInfos, setTextInfos] = useState({
        drug: [],
        extremism: [],
        ignored_text: false,
        link: [],
        medical: [],
        personal: [],
        profanity: [],
        social: [],
        weapon: [],
      });

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

            

            //Informations of image 
            const dataResponse = await getImages(image);
            console.log(dataResponse);
            if (dataResponse) {
                if (dataResponse.data.nudity) {
                    setNudity(dataResponse.data.nudity);
                }
                if(dataResponse.data.text) {
                    setTextInfos(dataResponse.data.text);
                }
            }
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
        <ScrollView>
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
                            <Text style={styles.subTitle}>Nudité :</Text>
                        {nudity !== '' && (
                            <View style={styles.otherInfoTextContainer}>
                                <Text style={styles.otherInfoText}>Nudité : {((nudity.erotica)*100).toFixed(1)} %</Text>
                                <Text style={styles.otherInfoText}>Suggestive: {((nudity.suggestive)*100).toFixed(1)} %</Text>
                                <Text style={styles.otherInfoText}>Décolleté: {((nudity.suggestive_classes.cleavage)*100).toFixed(1)} %</Text>
                                <Text style={styles.otherInfoText}>Poitrine homme: {((nudity.suggestive_classes.male_chest)*100).toFixed(1)} %</Text>
                            </View>
                        )}
                            <Text style={styles.subTitle}>Contenues textes :</Text>
                        {textInfos !== '' && (
                            <View style={styles.textInfosContainer}>
                                <Text style={styles.otherInfoText}>Extremisme: {textInfos.extremism.length > 0 ? "Oui" : "Non"}</Text>
                                <Text style={styles.otherInfoText}>Personel: {textInfos.personal.length > 0 ? "Oui" : "Non"}</Text>
                                <Text style={styles.otherInfoText}>Profanité: {textInfos.profanity.length > 0 ? "Oui" : "Non"}</Text>
                                <Text style={styles.otherInfoText}>Social: {textInfos.social.length > 0 ? "Oui" : "Non"}</Text>
                                <Text style={styles.otherInfoText}>Armes: {textInfos.weapon.length > 0 ? "Oui" : "Non"}</Text>
                            </View>
                        )}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
  colorStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "8px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
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
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
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
    flexGrow: 1,
  },
  textInfosContainer: {
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
    marginBottom: 5,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 35,
    fontWeight: "bold",
  },
  nudityInfos: {
    flexDirection: 'row',
    overflow: 'scroll',
    flexWrap: 'wrap',
  },
});

export default ResultPage;
