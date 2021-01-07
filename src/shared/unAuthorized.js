import React from 'react'
import {
    Container,
    Header,
    Icon,
    Text,
    ScrollableTab,
    Left,
    Button,
    Body,
    Right,
  } from 'native-base';
  import Warning from 'react-native-vector-icons/AntDesign'
import {View} from 'react-native'
function unAuthorized(props) {
    return (
        <Container>
         <Header transparent>
         <Left>
                <Button transparent>
                  <Icon
                  style={{color:'black'}}
                  color='black'
                    name="arrow-back"
                    onPress={() => {
                      props.navigation.goBack();
                    }}
                  />
                </Button>
              </Left>
              <Body/>
              <Right/>
          </Header>
          <View style={{alignItems: 'center',marginTop:'50%'}}>
              <Warning name="warning" size={80} color={props.colorProp}/>
              <View style={{marginTop:20}}>
              <Text style={{color:props.colorProp}}>{props.text}</Text>
              </View>
          </View>
        </Container>
    )
}

export default unAuthorized
