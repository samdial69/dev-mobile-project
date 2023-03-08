import React, {useEffect, useRef, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Entypo, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import Colors from "../definitions/Colors";
import {Camera, CameraType} from "expo-camera";
import Assets from "../definitions/Assets";
import getImages from "../api/http";

const ActionPage = ({ navigation }) => {

  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const flipCamera = () => {
    setType(
        type === CameraType.back
            ? CameraType.front
            : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        return await cameraRef.current.takePictureAsync({
          quality: 1,
          allowsEditing: true,
          aspect: [4, 3],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const sendPicture = async (image) => {
    console.log(image);
    const data = await getImages(image);
    navigation.navigate('ViewResult', { imageUri: image });
    // console.log(data);
  }

  return (
    <View style={styles.container}>
      { showCamera ?
        (
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>

              {/*Flip Camera Button*/}
              <TouchableOpacity style={styles.button}
                                onPress={flipCamera}
              >
                <MaterialCommunityIcons name="camera-flip-outline" size={30} color="white"/>
              </TouchableOpacity>

              {/*Take Picture Button*/}
              <TouchableOpacity style={styles.button}
                                onPress={
                                  async() =>{
                                    const photo = await takePicture();
                                    if (!photo.cancelled) {
                                      setImage(photo.uri);
                                    }

                                    setShowCamera(false);

                                  }
                                }
              >
                <Entypo name="camera" size={30} color="white" />
              </TouchableOpacity>

              {/*Flash Button*/}
              <TouchableOpacity style={styles.cancel}
                                onPress={() => setShowCamera(false)}
              >
                <MaterialIcons name="cancel" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
      ) :
        (
          <View style={styles.container}>
            <View style={styles.showCamera}>
              <View style={styles.imageContainer}>
                {image && (
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                ) ? (
                    <View>
                      <Image
                          source={{uri: image}}
                          style={styles.image}
                      />
                      <TouchableOpacity style={styles.btnShowCamera}
                                        onPress={() => sendPicture(image)}
                      >
                        <Text style={styles.textShowCamera}>Envoyer la photo</Text>
                      </TouchableOpacity>
                    </View>
                ) : (
                  <Image
                  style={styles.illustration}
                  source={Assets.images.illustrationCam}
                  />
                )
                }
              </View>
              {/*<Image*/}
              {/*    style={styles.illustration}*/}
              {/*    source={Assets.images.illustrationCam}*/}
              {/*/>*/}

              <View style={styles.actionBottom}>
                <TouchableOpacity
                    style={styles.btnShowCamera}
                    onPress={() => setShowCamera(true)}
                >
                  <Text
                      style={styles.textShowCamera}
                  >
                    Prendre une photo
                  </Text>
                </TouchableOpacity>
                {/*<Button*/}
                {/*  title="Prendre une photo"*/}
                {/*  color={Colors.babyBlue}*/}
                {/*  Style={styles.btnPrPhoto}*/}
                {/*  onPress={() => setShowCamera(true)}*/}
                {/*/>*/}
              </View>
            </View>
          </View>
        )
      }
    </View>
  );
};

export default ActionPage;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    // paddingHorizontal: 12,
    // alignItems: "center",
    // alignContent: "stretch",
    // width: "100%",
    // paddingLeft: 0,
    // paddingRight: 0,
  },
  actionBottom: {
    alignContent: "stretch",
    width: "100%",
    position: "absolute",
    bottom: 15,
  },
  btnPrPhoto: {
    flex: 1,
    backgroundColor: Colors.babyBlue,
  },
  btnChPhoto: {
    flex: 1,
    backgroundColor: Colors.grayBlue,
  },
  illustration: {
    marginTop: -150,
    width: 150,
    height: 200,
    marginLeft: 35,
  },

  btnShowCamera: {
    // backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  textShowCamera: {
    fontSize: 20,
    color: Colors.babyBlue,
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  showCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 20,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  icons: {
    color: 'white',
    fontSize: 200,
  },
  imageContainer: {
    marginTop: 0,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width:350,
    height: 500,
    backgroundColor: 'lightgray',
  }
});