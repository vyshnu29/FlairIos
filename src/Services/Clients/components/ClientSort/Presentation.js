import React from "react"
import {
  Badge,
  Title,
  FAB,
  Text,
} from 'react-native-paper';
import ClientList from "../ClientList"
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
 
  ScrollableTab,
  Left,
  Button,
  Body,
  Input,
  Right
} from 'native-base';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';

export default function TabsView(props) {
  const { data } = props
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  return (
   
  

  
    <Container>
       {!visible ? (
      <Header style={styles.Header}>
          <Left>
            <Button transparent>
              <Icon
              style={styles.HeaderIcons}
                name="arrow-back"
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.HeaderTitle}>Clients</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" style={styles.HeaderIcons}/>
            </Button>
            </Right>
          </Header>
           ) : 
           <Header style={styles.Header}>
           <Left>
             <Button
               transparent
               onPress={() => {
                 SetVisible(!visible);
               }}>
               <Icon name="arrow-back" style={styles.HeaderIcons} />
             </Button>
           </Left>
           <Body>
             <View>
               <Input
                 placeholder="Search..."
                 autoFocus
                 onChangeText={(term) => {
                   searchUpdated(term);
                 }}
                 placeholderTextColor="grey"
                 style={{width: windowWidth - 100}}
               />
             </View>
           </Body>
           <Right />
         </Header>
           }

     
          <Tabs renderTabBar={() => <ScrollableTab  style={{backgroundColor:'#3f51b5'}}/>} >
          <Tab
          index={0}
          
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}><Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>ACTIVE</Text>
                </TabHeading>
            }>
          <ClientList  searchTerm={searchTerm} {...props} info={data.filter((item) => item.activeConsultants !== 0)}/>
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}> 
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>IN-ACTIVE</Text>
               {/* <Badge style={{bottom:15}}>{approvedRanges}</Badge> */}
              </TabHeading>
            }>
            <ClientList  searchTerm={searchTerm} {...props} info={data.filter((item) => item.activeConsultants === 0)} />
          </Tab>
          <Tab
          index={2}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}> 
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>ALL</Text>
                {/* <Badge style={{bottom:15}}>{rejectedRanges}</Badge> */}
              </TabHeading>
            }>
            <ClientList  searchTerm={searchTerm} {...props} info={data} />
          </Tab>
          
            </Tabs>
           
    </Container>
  )
}
const styles = StyleSheet.create({
  HeaderTitle: {
    fontSize: 20,
    color: '#fff'
  },
  HeaderIcons: {
    color: '#fff'
  },
  Header: {
    backgroundColor: '#3f51b5'
  },
  CardStyles: {
    elevation: 0, borderRadius: 16, width: '96%', alignSelf: 'center'
  },
  CardTitle: {
    color: '#62B1F6', fontSize: 16, fontWeight: '400', paddingBottom: 5, paddingTop: 5, right: 66
  }

})