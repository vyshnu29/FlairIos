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
  Linking,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Button,Icon } from 'native-base';

function Presentation(props) {
  const { data, isLoading } = props
  if(!isLoading)
  return (
    <FlatList
    data={data}
    renderItem={({item}) => {
      return (
      
          <List>
            <ListItem>
              <Body>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                     <Text style={{color:'#62B1F6'}}>Document type</Text>
                     <Text style={{color:'#62B1F6'}}>Status</Text>
                     <Text style={{color:'#62B1F6'}}>Effective Date</Text>
                     <Text style={{color:'#62B1F6'}}>Effective Until</Text>
                     <Text style={{color:'#62B1F6'}}>Document</Text>

                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{left:15}}>{item.documentType ? item.documentType : '-----'}</Text>
                    {
                        item.status === 'Active' ?
                        <Text style={{color:'#21BA45',left:15}}>Active</Text> :
                        <Text style={{color:'#f0ad4e',left:15}}>Inactive</Text>
                      }
                    <Text style={{left:15}}>{item.effectiveDate ? item.effectiveDate : '-----'}</Text>
                    <Text style={{left:15}}>{item.effectiveUntilDate ? item.effectiveUntilDate : '-----'}</Text>
                            <TouchableOpacity  onPress={() => {Linking.openURL(item.work_doc.url)}}>
                              <Text style={{color:'#62B1F6',left:15}}>{item.work_doc.name.substr(0, item.work_doc.name.lastIndexOf("_"))}</Text> 
                            </TouchableOpacity>
                         
                  </View>
                </View>
              </Body>
            </ListItem>
          </List>
       
      );
    }}
  />
 
  )
  return (<ActivityIndicator />)
}

export default Presentation
