import React from "react"
import {BottomSheet} from 'react-native-btr';
import {
  Container,
  Label,
  Button,
  Header,
  Content,
  List,
  ListItem,
  Form,
  Item,
  Picker,
  Left,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';
import {
  View,FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  CheckBox,
} from 'react-native';
import {TextInput, Checkbox, Colors, Appbar, Title,Chip} from 'react-native-paper';
import PaymentsList from "../List/Index"

function Presentation(props) {
  const [collapsed, setcollapsed] = React.useState(false);
  const { clients, handleChange, state, handleFile, clearState,clientID } = props
  const options = clients.map((option) => {
    const firstLetter = option.businessDisplayName.toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    }
  })

  console.log("Aa",options)
  
  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };
  return (
    <View
    style={{
      height: 40,
      width: '93%',
      borderWidth: 0.9,
      borderColor: 'grey',
      alignSelf: 'center',
      marginTop: 35,
    }}>
   
      <TouchableOpacity onPress={toggleExpanded}>
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:16,margin:10}}>Select Client</Text>
        <Icon name='add' style={{margin:5}}/>
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
       <Header>
   <Body>
  <Title style={{color: 'white',alignSelf: 'center'}}>Select Client</Title>
</Body>
   </Header>
        <FlatList
          data={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            console.log("aa",item.id ,clientID)
            return (
              <List>
                <ListItem avatar>
                  
                  <Body>
                    <Text>{item.businessDisplayName}</Text>
                  </Body>
                  <Right style={{bottom:6}}>
                    {
                      item.id ?    <CheckBox
                      value={clientID.includes(item.id)}
                      onValueChange={(value) =>
                        handleChange("clientId", item.id)
                      }
                    /> : null
                    }
                  
                  </Right>
                </ListItem>
              </List>
            );
          }}
        />
      </View>
    </BottomSheet>
    <View>
    <PaymentsList clearState={clearState} clientID={clientID} handleChange={handleChange} />
    </View>
  </View>   
  )
}

export default Presentation
