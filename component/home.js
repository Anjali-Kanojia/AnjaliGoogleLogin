import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const audioRecorderPlayer = new AudioRecorderPlayer();
function Home({navigation}) {

  useEffect(() => {
    getData();
}, []);

const getData = () => {
    try {
        AsyncStorage.getItem('UserData')
            .then(value => {
                if (value != null) {
                    let user = JSON.parse(value);
                   console.log("user details---->", user);
                   setname(user.additionalUserInfo.profile.given_name)
                }
            })
    } catch (error) {
        console.log(error);
    }
}

 
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setrecordTime] = useState('00:00:00');
  const [currentPositionSec, setcurrentPositionSec] = useState(0);
  const [currentDurationSec, setcurrentDurationSec] = useState(0);
  const [playTime, setplayTime] = useState('00:00:00');
  const [duration, setduration] = useState('00:00:00');
  const [name,setname]=useState('')
  
  audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

// /////////////////////////////////////////////////////////////////////////////
 
  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setrecordSecs(e.currentPosition);
      setrecordTime(audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          ))
    
      return;
    });
    console.log(result);
  };
  

  // ///////////////////////////////////////////////////////////////////
  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    console.log('line 71',result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setcurrentPositionSec(e.currentPosition);
          setcurrentDurationSec(e.duration);
          setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
          setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };
  
  // //////////////////////////////////////////////////////
  onPausePlay = async (e) => {
    await audioRecorderPlayer.pausePlayer();
   };

  //  ////////////////////////////////////////////////////////
  onStopPlay = async (e) => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    };
   

  // google signout
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('Signout Succesfully');
      try {
        await AsyncStorage.clear();
        navigation.replace('Login');
    } catch (error) {
        console.log(error);
    }
     
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text> WELCOME {name}</Text>
      <Text> </Text>
      <Text>AUDIO RECORDER</Text>
      <Text>{recordTime}</Text>
      <Text> </Text>
      <Button title="Record" onPress={() => onStartRecord()} />
      <Text> </Text>
      <Button title="Stop" onPress={() => onStopRecord()} />
      <Text> </Text>
      <Text>{playTime} / {duration}</Text>
      <Text> </Text>
      <Button title="Pause" onPress={() => onPausePlay()} />
      <Text> </Text>
      <Button title="Play" onPress={() => onStartPlay()} />
      <Text> </Text>
      <Button title="Stop" onPress={() => onStopPlay()} />
      <Text> </Text>
      <Button title="SignOut" onPress={signOut} />
      <Text> </Text>
      <Button title="Record Video" onPress={()=>navigation.navigate('VideoRecorder')} />
      
    </View>
  );
}

export default Home;
