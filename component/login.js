import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {

  useEffect(() => {
    getData();
}, []);

const getData = () => {
    try {
        AsyncStorage.getItem('UserData')
            .then(value => {
                if (value != null) {
                    navigation.replace('Home');
                }
            })
    } catch (error) {
        console.log(error);
    }
}
  
  GoogleSignin.configure({
    webClientId: '569337629198-l7huvmfr6e8d2ip8nj0c551eb1d6lqoa.apps.googleusercontent.com',
  });

const signInWithGoogle =async()=>{
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);
  user_sign_in
    .then((resp)=>
    {console.log('resp of email==',resp)
      var respVal=resp
       AsyncStorage.setItem('UserData', JSON.stringify(respVal));
      navigation.replace('Home')
    }
    )
    .catch((e)=>console.log(e))

}

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Button title='Sign in with Google' onPress={signInWithGoogle}/>
    </View>
  )
}

export default Login