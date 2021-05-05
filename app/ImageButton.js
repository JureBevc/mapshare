import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default function ImageButton({
  imageSource,
  width,
  height,
  customStyle,
  handlePress,
}) {
  return (
    <View
      style={{
        alignSelf: "baseline",
      }}
    >
      <TouchableHighlight
        pointerEvents="auto"
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={handlePress}
        style={customStyle}
      >
        <Image
          style={{
            width: width,
            height: height,
          }}
          source={imageSource}
        />
      </TouchableHighlight>
    </View>
  );
}

ImageButton.defaultProps = {
  customStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
  },
};

const styles = StyleSheet.create({});
