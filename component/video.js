import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Button from './button';


const VideoRecorder = () => {
  const [isVideo, setIsVideo] = useState(false);
  const [imageSource, setImageSource] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019',
  );
  const [videosource, setVideoSource] = useState('');

  const ButtonArray = [
    {
      title: 'Record Video',
    },
    {
      title: 'Capture Photo',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E3E3E3'}}>
      <View style={styles.header}>
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'bold',
            fontSize: 25,
            padding: 10,
          }}>
         Capture Photo Or Video
        </Text>
      </View>
      <View style={styles.mainContainer}>
        {ButtonArray.map((button, index) => {
          return (
            <Button
              key={index}
              title={button.title}
              setvideo={setIsVideo}
              setImageSource={setImageSource}
              setVideoSource={setVideoSource}
            />
          );
        })}
      </View>
      <View style={styles.videoPhoto}>
        {isVideo ? (
          <Video
            controls={true}
            resizeMode="cover"
            style={{height: 400}}
            source={{
              uri: videosource,
            }}
            volume={10}
          />
        ) : (
          <View style={{paddingTop: 30}}>
            {imageSource == '' ? (
              <Text>No Image</Text>
            ) : (
              <Image
                style={{
                  height: 400,
                }}
                source={{uri: imageSource}}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default VideoRecorder;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#17499E',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  videoPhoto: {
    flex: 4,
  },
});
