import React from "react"
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Button,Icon } from 'native-base';

function Presentation(props) {
  const { contacts, deleteContact } = props


  let data = []

  contacts &&
    contacts.forEach((contact) => {
      data.push({
        ...contact,
      })
    })

  return (
  
      
    <FlatList
    data={data}
    renderItem={({item}) => {
      return ( 
          <List>
            <ListItem >
              <Body>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color:'#62B1F6'}}>Name</Text>
                    <Text style={{color:'#62B1F6'}}>Job title</Text>
                    <Text style={{color:'#62B1F6'}}>Gender</Text>
                    <Text style={{color:'#62B1F6'}}>Mobile no</Text>
                    <Text style={{color:'#62B1F6'}}>Email</Text>
                    <Text style={{color:'#62B1F6'}}>Phone no</Text>
                    <Text style={{color:'#62B1F6'}}>Address</Text>
                    <Text style={{color:'#62B1F6'}}>City</Text>
                    <Text style={{color:'#62B1F6'}}>State</Text>
                    <Text style={{color:'#62B1F6'}}>Country</Text>
                    <Text style={{color:'#62B1F6'}}>Zip</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                  <Text style={{left:15}}>{item.representativeName ? item.representativeName : '-----'}</Text>
                    <Text style={{left:15}}>{item.jobTitle ? item.jobTitle : '-----'}</Text>
                    <Text style={{left:15}}>{item.gender ? item.gender : '-----'}</Text>
                    <Text style={{left:15}}>{item.mobile ? item.mobile : '-----'}</Text>
                    <Text style={{left:15}}>{item.email ? item.email : '-----'}</Text>
                    <Text style={{left:15}}>{item.workPhone ? item.workPhone : '-----'}</Text>
                    <Text style={{left:15}}>{item.line1 ? item.line1 : '-----'}</Text>
                    <Text style={{left:15}}>{item.city ? item.city : '-----'}</Text>
                    <Text style={{left:15}}>{item.state_name ? item.state_name : '-----'}</Text>
                    <Text style={{left:15}}>{item.country ? item.country : '-----'}</Text>
                    <Text style={{left:15}}>{item.zip ? item.zip : '-----'}</Text>
                  </View>
                </View>
              </Body>
            </ListItem>
          </List>
       
      );
    }}
  />
  
  )
}

export default Presentation
