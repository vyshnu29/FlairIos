import React, { useEffect, useState } from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';


function Presentation(props) {
  const {
    onChange,
    handleCheck,
    handleChange,
    handleSubmit,
    clients_list,
    reqClient,
    clients_locations_state,
  } = props
  const {
    clientId,
    workLocation,
    clientType,
    selectAddress,
    // subContracting,
    // contingencyinPayment,
    // prohibitionPeriod,
    // rightToHire,
    // liquidatedDamages,
    // identification,
    comments,
    isDraft,
  } = props.item
  const clientTypeList = ["End Client", "Prime-Contractor", "Sub-Contractor"]
  // const [address, setAddress] = useState([])
  // useEffect(() => {
  //   if (clients_locations_state.isLoaded)
  //     setAddress(
  //       clients_locations_state.client_locations.filter((item) => item.id === selectAddress)
  //     )
  // }, [selectAddress, clients_locations_state.client_locations, clients_locations_state.isLoaded])
 


      return (
        <ListItem>
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Client</Text>
          <Text style={{color:'#62B1F6'}}>Client type</Text>
          <Text style={{color:'#62B1F6'}}>Address</Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{reqClient.businessDisplayName}</Text>
          <Text style={{left:15}}>{clientType}</Text>
          <Text style={{left:15}}>{selectAddress}</Text>
          
        </View>
    </View>
    </ListItem>
    
    
  )
}

export default Presentation