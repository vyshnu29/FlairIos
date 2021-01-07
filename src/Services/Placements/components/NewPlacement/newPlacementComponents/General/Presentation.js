import React, { useEffect, useState } from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
import validate from "../../../../../../shared/validation"

function Presentation(props) {
  const {
    placement,
    clients,
  } = props
 

 
  let billableClient = placement.map((item) => item.clientId)
  const [reqClient, setReqClient] = useState(null)
  useEffect(() => {
    setReqClient(clients.filter((client) => client.id === billableClient)[0])
  }, [billableClient])
 
 
 
 

  return (
    <FlatList
    data={placement}
    keyExtractor={(item) => item.clientId}
    renderItem={({item}) => {
      return (
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Billable Client</Text>
          <Text style={{color:'#62B1F6'}}>Job Title</Text>
          <Text style={{color:'#62B1F6'}}>Net terms</Text>
          <Text style={{color:'#62B1F6'}}>Start date</Text>
          <Text style={{color:'#62B1F6'}}>End date</Text>
          <Text style={{color:'#62B1F6'}}>Project End date</Text>
          <Text style={{color:'#62B1F6'}}>Comment</Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{reqClient}</Text>
          <Text style={{left:15}}>{item.jobTitle}</Text>
          <Text style={{left:15}}>{item.netTerms}</Text>
          <Text style={{left:15}} >{validate.dateFormatter(item.startDate)}</Text>
          <Text style={{left:15}}>{validate.dateFormatter(item.endDate)}</Text>
          <Text style={{left:15}}>{validate.dateFormatter(item.projectEndDate)}</Text>
          <Text style={{left:15}}>{item.description}</Text>
        </View>
    </View>
       
      );
    }}
  />
    
  )
}

export default Presentation
