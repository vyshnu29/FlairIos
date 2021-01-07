import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
import validate from "../../../../../../shared/validation"

function Presentation(props) {
  const {
    amendmentRequired,
    type,
    email,
    phonenumber,
    phoneExtension,
    line1,
    line2,
    city,
    state,
    country,
    zip,
    handleChecked,
    handleChange,
    handleSubmit,
    fillableSections,
  } = props

  const types = ["Onsite", "Remote"]
  console.log("s",amendmentRequired)
  
      return (
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Work Location Type</Text>
          <Text style={{color:'#62B1F6'}}>Work Email</Text>
          <Text style={{color:'#62B1F6'}}>Work Phone</Text>
          <Text style={{color:'#62B1F6'}}>Ext.</Text>
          <Text style={{color:'#62B1F6'}}>Address Line 1</Text>
          <Text style={{color:'#62B1F6'}}>Address Line 2</Text>
          <Text style={{color:'#62B1F6'}}>City</Text>
          <Text style={{color:'#62B1F6'}}>State</Text>
          <Text style={{color:'#62B1F6'}}>Country</Text>
          <Text style={{color:'#62B1F6'}}>Zip code</Text>
          <Text style={{color:'#62B1F6'}}>Ammendment Required</Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{type}</Text>
          <Text style={{left:15}}>{email}</Text>
          <Text style={{left:15}}>{phonenumber}</Text>
          <Text style={{left:15}} >{phoneExtension}</Text>
          <Text style={{left:15}}>{line1}</Text>
          <Text style={{left:15}}>{line2}</Text>
          <Text style={{left:15}}>{city}</Text>
          <Text style={{left:15}}>{state}</Text>
          <Text style={{left:15}}>{country}</Text>
          <Text style={{left:15}}>{zip}</Text>
          <Text style={{left:15}}>{amendmentRequired ? 'Yes' : 'No'}</Text>
        </View>
    </View>
       
      );
    
}

export default Presentation
