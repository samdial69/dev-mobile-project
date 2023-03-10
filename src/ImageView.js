// Import libraries
import React, { useState } from "react";
import { View, Button } from "react-native";
import ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs";
import Gallery from "react-native-image-gallery";
import Lightbox from "react-native-lightbox";
import ColorGrabber from "react-native-color-grabber";

// Define constants
const IMAGE_DIR = RNFS.DocumentDirectoryPath + "/images/";

// Define a custom component that displays an image with color information
const ImageWithColor = ({ source }) => {
  const [colors, setColors] = useState([]);

  // Use react-native-color-grabber to extract colors from the image
  ColorGrabber.getColors(source.uri, (err, res) => {
    if (!err) {
      setColors(res);
    }
  });

  // Return a lightbox component that displays the image and its colors
  return (
    <Lightbox>
      <View>
        <Image source={source} />
        <View style={{ flexDirection: "row" }}>
          {colors.map((color) => (
            <View
              key={color}
              style={{ width: 50, height: 50, backgroundColor: color }}
            />
          ))}
        </View>
      </View>
    </Lightbox>
  );
};

export default ImageWithColor;