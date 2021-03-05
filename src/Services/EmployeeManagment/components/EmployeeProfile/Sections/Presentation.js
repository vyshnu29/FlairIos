import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import MetaInfo from '../../../../../shared/getMetaInfo'
import {View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Presentation(props) {
    const { state, section } = props
    const employeeProfile = state.employeeProfile
    console.log("Ss",section.entryType)
    const metaInfo = new MetaInfo()
    return (
      <View style={{flex:1}}>
        {
        section.entryType === "array" ?
        <Card style={{width:'97%',alignSelf:'center',elevation:0}} noShadow>
        <CardItem>
          <Text>{metaInfo.toNameCase(section.sectionName)}</Text>
         </CardItem>
         <CardItem footer bordered >
             <Right style={{left:50}}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('ProfileArrayTable',{data:props})}}>
             <Text style={{color:'#62B1F6'}}>View Info</Text>
             </TouchableOpacity>
             </Right>
        </CardItem>
       </Card> 
          :
          null
      }

      {
        section.entryType === "object" ?
        <Card style={{width:'97%',alignSelf:'center',elevation:0}}>
        <CardItem>
          <Text>{metaInfo.toNameCase(section.sectionName)}</Text>
         </CardItem>
         <CardItem footer bordered >
             <Right style={{left:50}}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('ProfileObjTable',{data:props})}}>
             <Text style={{color:'#62B1F6'}}>View Info</Text>
             </TouchableOpacity>
             </Right>
        </CardItem>
       </Card> 
          :
          null
      }

          {/**/}
      </View>
    );
  
}