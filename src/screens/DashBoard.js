import React, { Component } from 'react'
import { Text,SafeAreaView,ActivityIndicator ,StyleSheet} from 'react-native'
import Header from '../shared/HeaderBar/index'
export default class Wiki extends Component {
    render() {
        return (
            <>
             <Header {...this.props}/>
              <SafeAreaView style={{alignSelf:'center'}}>
                 
                <Text style={{fontWeight:'bold',top:255}}>Need to be Done!!!</Text>
            </SafeAreaView>
         </>
           
        )
    }
}
const styles=StyleSheet.create({
    cont:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    }
 })