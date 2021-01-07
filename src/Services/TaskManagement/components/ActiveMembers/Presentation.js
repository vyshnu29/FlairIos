import React, {useContext, useState} from 'react';
import {
  View,FlatList,
  TouchableOpacity,
  Text,
  ScrollView,

  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import {BottomSheet} from 'react-native-btr';
import {
  Title,
  Header,
  List,
  ListItem,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';


export default function Presentation(props) {
  const {  handleEmployees, data, isAdded,employees ,addedNames} = props
  const [collapsed, setcollapsed] = React.useState(false);
console.log("Sss",data)
  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };
  return (
    <View
    style={{
      height: 49,
      width: '93%',
      borderWidth: 1,
      borderColor: '#e6e6e6',
      alignSelf: 'center',
      paddingBottom: 15,
      margin:10
    }}>
      <TouchableOpacity onPress={toggleExpanded}>
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
        {
          
          addedNames.length ?
          <Text style={{fontSize: 16, marginLeft:10,top:15, color: 'grey'}}>Added {addedNames.length} {addedNames.length === 1 ? 'employee' : 'employees' }</Text>
          :  <Text style={{fontSize: 16,marginLeft:10,top:15,color: '#4f4f4f'}}>Add Employees *</Text>
        }
        {
          addedNames.length ?
          <Icon name='checkmark-circle' size={15} style={{top:7,color:'#3F51B5'}} /> : <Icon name='add' style={{top:7,color:'#3F51B5'}}/>
        }
        
        </View>
      </TouchableOpacity>
    <BottomSheet
      visible={collapsed}
      onBackButtonPress={toggleExpanded}
      onBackdropPress={() => {
        setcollapsed(!collapsed);
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: 350,
        }}>
       <Header style={{backgroundColor:'#3f51b5'}}>
   <Body>  
  <Title style={{color: 'white',alignSelf: 'center',fontSize:15}}>Add Employees</Title>
</Body>
   </Header>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <List>
                <ListItem avatar>
                  
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                  <Right style={{bottom:6}}>
                    <CheckBox
                    tintColors={{ true: '#3F51B5', false: 'black' }}
                      value={employees.includes(item.uid)}
                      onValueChange={(value) =>
                        handleEmployees(value, item.uid,item.name)
                      }
                    />
                  </Right>
                </ListItem>
              </List>
            );
          }}
        />
      </View>
    </BottomSheet>
  </View>
  )
}
