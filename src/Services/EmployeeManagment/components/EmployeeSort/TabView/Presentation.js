import React from "react"
import {
  Badge,
  Title,
  FAB
} from 'react-native-paper';
import {
  Input,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  ScrollableTab,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import EmployeeSort from "../EmployeeSort/index"
import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default function TabsView(props) {
  const { handleTabChange, tabValue, modules, listAll } = props
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  return (
    <>
   {!visible ? (
      <Header style={{backgroundColor:"#3f51b5"}}> 
          <Left>
            <Button transparent>
              <Icon
                name="chevron-back"
                style={{color:'#fff'}}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>EmployeesList</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" style={{color:'#fff'}}/>
            </Button>
            </Right>
          </Header>
           ) : null}
        
        {visible ? (
          <Header style={{backgroundColor:'#3f51b5'}}>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="chevron-back" style={{color:'#fff'}}/>
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
        ) : null}
     
        <Tabs renderTabBar={() => <ScrollableTab />} >
        <Tab
        index={1}
          heading={
            <TabHeading>
              <Text>Active </Text>
              </TabHeading>
          }>
         <EmployeeSort condition={1} searchTerm={searchTerm} {...props}/>
        </Tab>
        <Tab
        index={0}
          heading={
            <TabHeading > 
             <Text>All  </Text>
            </TabHeading>
          }>
          <EmployeeSort condition={0} searchTerm={searchTerm} {...props}/>
        </Tab>
        <Tab
        index={2}
          heading={
          <TabHeading >
            <Text>In Active </Text>
          </TabHeading>
          }>
         <EmployeeSort condition={2} searchTerm={searchTerm} {...props} />
        </Tab>
        <Tab
        index={3}
          heading={
            <TabHeading > 
              <Text>Suspended  </Text>
            </TabHeading>
          }>
         <EmployeeSort condition={3} searchTerm={searchTerm} {...props} />
        </Tab>
        {/* <Tab
        index={4}
          heading={
            <TabHeading>
              <Text>Selected </Text>
            </TabHeading>
          }>
         <EmployeeSort condition={4} {...props} />
        </Tab> */}
      </Tabs>
      
  </>
  )
}
