import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const ImageCarousel = ({ data, windowWidth }) => {
  const ImageSlider = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item }}
        style={[styles.postImg, { width: windowWidth }]}
      />
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={({ item }) => <ImageSlider item={item} />}
      sliderWidth={windowWidth}
      itemWidth={windowWidth}
    />
  );
};

const styles = StyleSheet.create({
  postImg: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageCarousel;
