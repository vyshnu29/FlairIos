import React from 'react';
import {View, Text,ScrollView} from 'react-native';
import {Badge,  Subheading, FAB} from 'react-native-paper';
import {
  Container,
  Header,
  Title,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  ScrollableTab,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import ClientCard from '../clientComponents/ClientCard';
import ClientTabs from '../clientComponents/ClientTabs';

function Presentation(props) {
  const {client} = props;
  console.log("ss",client);
  if (Object.keys(client).length)
    return (
      <Container>
       <Header style={{backgroundColor:'white'}}>
          <Left>
            <Button transparent onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" style={{color: '#62B1F6'}}  />
            </Button>
          </Left>
          <Body> 
          </Body>
          <Right>
          </Right>
        </Header>
        <ClientCard client={client} {...props}/>
        <ClientTabs client={client} {...props} />
      </Container>
    );
  return (
    <View style={{alignItems: 'center', margin: 50}}>
      <Text>No client found</Text>
    </View>
  );
}

export default Presentation;

{
  /* <ClientCard client={client} />
<View style={{margin:20}}>
<Subheading>Client Information</Subheading>
</View>
<ClientTabs client={client} {...props} /> */
}
