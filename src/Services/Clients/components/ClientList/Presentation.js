import React from "react"
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createFilter} from 'react-native-search-filter';
import { Container, Header, Badge, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
function Presentation(props) {
  const { info, onDelete,searchTerm } = props
  const KEYS_TO_FILTERS = [
    'clientId',
    'businessDisplayName',
    'jobTerminationNotice',
    'netTerms',
    'activeConsultants',
  ];
  const filteredInfo = info.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  console.log("aa",info)
  return (
   <Container>
    <FlatList
      data={filteredInfo}
      keyExtractor={(item) => item.clientId}
      renderItem={({item}) => {
        return (
        
            <List>
              <ListItem avatar>
                <Body>
                  <TouchableOpacity 
                   onPress={() => {
               props.navigation.navigate('ViewClient',{clientId : item.clientId})}}
              >
                    <Title
                      style={{color: '#3F51B5', fontSize: 14}}
                      mode="text">
                      {item.businessDisplayName.toUpperCase()}
                    </Title>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text>Client Id</Text>
                      <Text>Status</Text>
                      <Text>Termination Note</Text>
                      <Text>Net Terms</Text>
                      <Text>Active Consultants</Text>
                    </View>
                   
                    <View style={{flexDirection: 'column'}}>
                    {
                        item.status === 0 ?
                        <Text style={{color:'#21BA45',left:10}}>{item.clientId}</Text> :
                        <Text style={{color:'red',left:10}}>{item.clientId}</Text>
                      }
                      
                      {
                        item.status === 0 ?
                        <Text style={{color:'#21BA45',left:10}}>Active</Text> :
                        <Text style={{color:'#f0ad4e',left:10}}>Inactive</Text>
                      }
                      
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.jobTerminationNotice}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.netTerms ? item.netTerms.trim().length > 10 ? item.netTerms.trim().substring(0, 10) + "...": item.netTerms : '-----' }</Text>
                      <Text style={{color:'#62B1F6',left:10}}>{item.activeConsultants}</Text>
                    </View>
                  </View>
                </Body>
              </ListItem>
            </List>
         
        );
      }}
    />
</Container>
  )
}

export default Presentation
