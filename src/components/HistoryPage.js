import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button, 
  FlatList,
  Image
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Colors from "../definitions/Colors";

const HistoryPage = ({ navigation }) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();

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
            <Image
              source={{ uri: item.uri }}
              style={styles.historyPageImg}
            />
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