import React from "react"
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Button,Icon } from 'native-base';

function Presentation(props) {
  const { locations, deleteLocation, client } = props
  let data = []
  locations &&
    locations.forEach((location) => {
      data.push({
        ...location,
      })
    })
  return (  
    <FlatList
    data={data}
    renderItem={({item}) => {
      return (
      
          <List>
            <ListItem avatar>
              <Body>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                     <Text style={{color:'#62B1F6'}}>Line1</Text>
                     <Text style={{color:'#62B1F6'}}>Line2</Text>
                     <Text style={{color:'#62B1F6'}}>City</Text>
                     <Text style={{color:'#62B1F6'}}>State</Text>
                     <Text style={{color:'#62B1F6'}}>Country</Text>
                     <Text style={{color:'#62B1F6'}}>Zip</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{left:15}}>{item.locationsline1 ? item.locationsline1 : '-----'}</Text>
                    <Text style={{left:15}}>{item.locationsline2 ? item.locationsline2 : '-----'}</Text>
                    <Text style={{left:15}}>{item.locationscity ? item.locationscity : '-----'}</Text>
                    <Text style={{left:15}}>{item.locationsstate_name ? item.locationsstate_name : '-----'}</Text>
                    <Text style={{left:15}}>{item.locationscountry ? item.locationscountry : '-----'}</Text>
                    <Text style={{left:15}}>{item.locationszip ? item.locationszip : '-----'}</Text>
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
