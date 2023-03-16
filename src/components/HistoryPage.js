import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button, 
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import {getColorName, getImages} from "../api/http";
import { getColorsList } from '../helpers/getColorsList';

const HistoryPage = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  const fetchImages = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission not granted!');
        return;
      }

      const result = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
      });

      setImages(result.assets);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  const viewImage = async (image) => {
    try {
      setImage(image);
      const dataResponse = await getImages(image);
      let colorsList = getColorsList(dataResponse.data.colors);
      console.log(`Navigating to image: ${image}`);
      navigation.navigate('ViewResult', { imageUri: image, dataParam: dataResponse.data, colorsList: colorsList });
    } catch (error) {
      console.log('Error navigating to view image:', error);
    }
  };
  
  useEffect(() => {
    fetchImages();
  }, []);

  

  return (
    <View style={styles.container}>
      <View style={styles.historyImgContainer}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => viewImage(item.uri)}>
              <Image source={{ uri: item.uri }} style={styles.historyPageImg} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.historyActionsContainer}>
        <Button title="Rafraîchir" onPress={() => fetchImages()} />
      </View>
    </View>
  );
};

export default HistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  historyImgContainer: {
    flex: 1,
    marginBottom: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  historyActionsContainer: {
    marginBottom: 20,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
  historyPageImg: {
    width: 100, 
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
});