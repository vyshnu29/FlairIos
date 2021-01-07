import React from 'react';
import {
  Content, 
  Header,
  List,
  ListItem,
  Thumbnail,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import {Divider, Avatar, Caption, TouchableRipple} from 'react-native-paper';
import {Text,View, TouchableOpacity,Linking} from 'react-native';

function Presentation(props) {
  const {client} = props;

  const makeCall = (res) => {
    console.log("gd",res);
    let phoneNumber = '';
  
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:' + `${res}`
      } else {
        phoneNumber = 'telprompt:${1234567890}';
      }
  
      Linking.openURL(phoneNumber);
    }
console.log("lp",props)
  return (
    <View>
      <List>
        <ListItem avatar noBorder>
        <Left>
        <View>
            {
              client.logo ?  <Avatar.Image  source={{uri: client.logo}} size={60} /> : <Avatar.Text label={client.businessDisplayName[0]}  size={65} />
            }
            </View>
        </Left>
          <Body>
            <View >
            <Text style={{fontSize:16,fontWeight:'700'}} >{client.businessDisplayName}</Text>
            <Caption style={{marginTop:5,fontSize:14,fontWeight:'400'}}>{client.category}</Caption>
            <Text style={{fontSize:14,marginTop:5,color:'#62B1F6',textDecorationLine: 'underline'}}>{client.federalId}</Text>
            <TouchableOpacity onPress={() => { client.website ? Linking.openURL(client.website) : null }}>
            <Text style={{fontSize:14,marginTop:5,color:'#62B1F6',textDecorationLine: 'underline'}}>{client.website}</Text>
            </TouchableOpacity>
            </View>
          </Body>
          <Right>
          <View>
          <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={() => {makeCall(client.contactNumber)}}>
            <Avatar.Icon style={{backgroundColor:'#62B1F6',marginTop:5}} icon="phone-outline" color='white' size={35} />
            </TouchableOpacity>
              <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={() => Linking.openURL('mailto:' + client.email) }>
            <Avatar.Icon style={{backgroundColor:'#62B1F6',marginTop:5}} icon="email-outline" color='white' size={35} />
            </TouchableOpacity>
            </View>
          </Right>
        </ListItem>
      </List>
      </View>
  );
}

export default Presentation;
