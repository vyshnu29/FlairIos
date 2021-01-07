import React,{useState, useEffect} from "react"
import { connect } from "react-redux"
import {
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { configuration } from '../config/companyConfig'
import Main from '../Main'
import { attachTokenListener } from '../Services/Authentication/middleware/index'
import LinearGradient from 'react-native-linear-gradient';

function SplashScreen(props) {
  const [animating, setAnimating] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height; 

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  },[])

  useEffect(() => {
    attachTokenListener()
  }, [])

  if(animating)
	return  (
    <LinearGradient 
    useAngle={true}
    angle={80}
   angleCenter={
     {x : 0.9, y:1.0}
   }
     colors={['#280071','#c42053']} style={styles.container} >
       <StatusBar hidden />
    <View >
     
    <Image
      source={{ uri: `${configuration.flair_logo}` }}
      style={{width: windowWidth - 220,height: windowHeight - 220, resizeMode: 'contain'}}
    />
    <ActivityIndicator
      animating={animating}
      color="#FFFFFF"
      size="large"
      style={styles.activityIndicator}
    />
  </View>
  </LinearGradient>
  ) 
  return (<Main/>)
}

const windowHeight = Dimensions.get('window').height; 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    activityIndicator: {
      alignItems: 'center',
      height: windowHeight/10,
    },
  });
  
  export default SplashScreen