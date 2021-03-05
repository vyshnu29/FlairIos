import React from "react"
import {
  View,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  
  Avatar
} from 'react-native-paper';
import styles from '../../styles/ClientListStyles'
import {createFilter} from 'react-native-search-filter';
import { Container, Header, Badge,Card, List, ListItem, Left, Body, Right, Thumbnail,Title } from 'native-base';
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
  return (
   <Container>
    <FlatList
      data={filteredInfo}
      keyExtractor={(item) => item.clientId}
      renderItem={({item}) => {
        return (
          <Card style={styles.container} noShadow>
          <TouchableOpacity
          
          activeOpacity={0.95}
          onPress={() => {
            props.navigation.navigate('ViewClient',{clientId : item.clientId})}}>
          <View style={styles.mainTextContainer}>
            {
              item.logo ?
              <Avatar.Image
              size={45}
              style={{top:10}}
                    source={{uri: item.logo}}
                  />: <Avatar.Text
                  size={45}
                  style={{top:10}}
                  label={item.businessDisplayName[0]}
                  style={{backgroundColor: "#2970ff"}}
                />
            } 
           
           <View style={{marginLeft:25}}>
             <View style={{flexDirection:'row'}}>
             <Text style={{
                            color: '#62B1F6',
                            fontSize: 17,
                            fontWeight: '400',
                            bottom: 5,
                          }}>{item.businessDisplayName}</Text>
             {
               
               item.status === 0 ?
               <View style={[styles.labelTextContainer,{marginLeft:8,backgroundColor:'#21ba45'}]}>
               <TouchableOpacity>
                 <Text style={styles.labelText}>{item.clientId}</Text>
               </TouchableOpacity>
             </View> :
              <View style={[styles.labelTextContainer,{marginLeft:8,backgroundColor:'#f0ad4e'}]}>
              <TouchableOpacity>
                <Text style={styles.labelText}>{item.clientId}</Text>
              </TouchableOpacity>
            </View>
             }
           
             </View>
            <View style={{marginTop:10}}>
          <TouchableOpacity  onPress={() => {makeCall(item.phone)}}>
          <Text style={{color:'grey',fontSize:13,paddingTop:7}}>{item.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => Linking.openURL('mailto:' + item.email) }>
          <Text style={{color:"grey",fontSize:12}}>{item.email.trim()}</Text>
          </TouchableOpacity>
          </View>

        </View>
    
          </View>
        </TouchableOpacity>
        </Card>
         
        );
      }}
    />
</Container>
  )
}

export default Presentation
