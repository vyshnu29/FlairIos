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
  StyleSheet,
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
      <Header style={styles.Header}> 
          <Left>
            <Button transparent>
              <Icon
              style={styles.HeaderIcons}
                name="chevron-back"
                style={styles.HeaderIcons}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.HeaderTitle}>EmployeesList</Title>
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
           ) : null}
        
        {visible ? (
          <Header style={styles.Header}>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="chevron-back" style={styles.HeaderIcons}/>
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
            <TabHeading style={{backgroundColor:'#3f51b5'}}>
             <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>ACTIVE </Text>
              </TabHeading>
          }>
         <EmployeeSort condition={1} searchTerm={searchTerm} {...props}/>
        </Tab>
        <Tab
        index={0}
          heading={
            <TabHeading style={{backgroundColor:'#3f51b5'}}> 
<Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>ALL  </Text>
            </TabHeading>
          }>
          <EmployeeSort condition={0} searchTerm={searchTerm} {...props}/>
        </Tab>
        <Tab
        index={2}
          heading={
          <TabHeading style={{backgroundColor:'#3f51b5'}}>
           <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>INACTIVE </Text>
          </TabHeading>
          }>
         <EmployeeSort condition={2} searchTerm={searchTerm} {...props} />
        </Tab>
        <Tab
        index={3}
          heading={
            <TabHeading style={{backgroundColor:'#3f51b5'}}> 
              <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>SUSPENDED </Text>
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

