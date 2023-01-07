import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
} from "react-native";


import Colors from "../definitions/Colors";
import Assets from "../definitions/Assets";

const ActionPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.illustration}
        source={Assets.images.illustrationCam}
      />
      
      <View style={styles.actionBottom}>
        <Button
          title="Prendre une photo"
          color={Colors.babyBlue}
          Style={styles.btnPrPhoto}
          onPress={() => Alert.alert('Prendre une photo')}
        />
        <Button
          title="Choisir une photo"
          style={styles.btnChPhoto}
          color={Colors.grayBlue}
          onPress={() => Alert.alert('Choisir une photo')}
        />
      </View>
      
    </View>
  );
};

export default ActionPage;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: "center",
    alignContent: "stretch",
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
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
    marginTop: 150,
    width: 150,
    height: 200,
    marginLeft: 35,
  },
});