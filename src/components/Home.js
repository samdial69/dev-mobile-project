import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Keyboard,
} from "react-native";


import Colors from "../definitions/Colors";

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Terme à chercher"
          style={styles.inputSearchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={Home}
        />
        <Button
          title="Rechercher"
          color={Colors.primary_blue}
          onPress={Home}
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
  searchContainer: {
    marginBottom: 16,
  },
  inputSearchTerm: {
    marginBottom: 16,
  },
});