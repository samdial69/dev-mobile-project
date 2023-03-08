import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";


import Colors from "../definitions/Colors";

const HistoryPage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.historyPageContainer}>
        
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
  historyPageContainer: {
    marginBottom: 16,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
});