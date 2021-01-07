import React, { Component } from 'react'
import { Text, SafeAreaView,ActivityIndicator ,StyleSheet} from 'react-native'
import { Appbar} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
export default class TimeSheets extends Component {
    render() {
        return (
            <SafeAreaView>
             <LinearGradient 
    useAngle={true}
    angle={45}
   angleCenter={
     {x : 0.5, y:1.5}
   }
          colors={['#280071','#c42053']} style={styles.Gradient}>
                <Appbar.Header style={{backgroundColor:'transparent'}}>
        <Appbar.Content title="More" titleStyle={{fontSize:24}} color='white' />
        </Appbar.Header>
          <SafeAreaView style={{alignSelf:'center'}}>
                <Text style={{fontWeight:'bold',top:255}}>Need to be Done!!!</Text>
            </SafeAreaView>
            </LinearGradient>
            </SafeAreaView>
        )
    }
}
const styles=StyleSheet.create({
    cont:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    Gradient:{
        width:'100%',
        height:50,
        elevation:5
      }
})