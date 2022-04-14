import React from 'react';
import {Text,TouchableOpacity,StyleSheet,View} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const Button = ({
  title,
  setvideo,
  setImageSource,
  setVideoSource,
}) => {
  const opencamera = () => {
    try {
      title == 'Capture Photo'
        ? ImagePicker.openCamera({
            width: 300,
            height: 400,
          })
            .then(image => {
              setImageSource(image.path);
              setvideo(false);
              console.log('Image path',image.path);
            })
            .catch(err => {
              setImageSource(
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019',
              );
            })
        : ImagePicker.openCamera({
            mediaType: 'video',
          })
            .then(video => {
              setvideo(true);
              setVideoSource(video.path);
              console.log('Video path',video);
            })
            .catch(err => {
              setvideo(false);
              setImageSource(
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019',
              );
            });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
    onPress={() => {
      opencamera();
    }}
  >
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  </TouchableOpacity>
);
};
export default Button;

const styles = StyleSheet.create({
mainContainer: {
  backgroundColor: "#17338D",
  height: 60,
  width: 150,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 30,
},
textStyle: {
  color: "white",
},
});



