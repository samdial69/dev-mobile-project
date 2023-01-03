import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";


import Colors from "../definitions/Colors";

const ActionPage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.actionPageContainer}>
        
      </View>
    </View>
  );
};

export default ActionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  actionPageContainer: {
    marginBottom: 16,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
});