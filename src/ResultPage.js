import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ColoredCircle = ({ color, label }) => (
    <View style={styles.circleContainer}>
      <View style={{ ...styles.circle, backgroundColor: color }} />
      <Text style={styles.label}>{label}</Text>
    </View>
);

const ResultPage = ({ navigation }) => {
    const route = useRoute();
    const { image } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
        </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Couleurs :</Text>
        <View style={styles.circles}>
            <ColoredCircle color="#ff0000" label="Rouge" />
            <ColoredCircle color="#00ff00" label="Vert" />
            <ColoredCircle color="#0000ff" label="Bleu" />
            <ColoredCircle color="#ffff00" label="Jaune" />
            <ColoredCircle color="#00ffff" label="Cyan" />
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
    width:350,
    height: 500,
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
