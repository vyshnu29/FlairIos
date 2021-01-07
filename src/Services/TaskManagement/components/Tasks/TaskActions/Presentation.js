import React from "react"
import EditTask from "../taskHandleComponents/EditTask/index"
import { TextInput, Appbar, Colors} from 'react-native-paper';
import {
  Container,
  Title,
  Header,
  Left,
  Button,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';
export default function Presentation(props) {
 

  return (
    <Container>
   <Header style={{backgroundColor: '#3F51B5'}} androidStatusBarColor="#000">
      <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name= "chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white',fontSize:18}}>
           Edit Task
          </Title>
        </Body>
        <Right></Right>
      </Header>
       <EditTask task={props.task} project={props.project} />
    </Container>
         
  )
}
