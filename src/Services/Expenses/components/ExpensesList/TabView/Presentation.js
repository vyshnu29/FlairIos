import React from "react"
import ExpenseList from "../ExpenseTable/index"
import {
  Badge,
  Title,
  FAB
} from 'react-native-paper';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Input,

  ScrollableTab,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default function TabsView(props) {
  const { modules, listAll, pendingRanges, approvedRanges, rejectedRanges, myCount } = props
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
            <Title style={styles.HeaderTitle}>Expenses</Title>
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
                <Icon name="arrow-back" style={styles.HeaderIcons}/>
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
          index={0}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}>
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>SUBMITTED</Text>
                {/* <Badge style={{bottom:15}}>{pendingRanges}</Badge> */}
                </TabHeading>
            }>
           <ExpenseList condition={0} searchTerm={searchTerm} {...props}/>
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}>
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>APPROVED</Text>
               {/* <Badge style={{bottom:15}}>{approvedRanges}</Badge> */}
              </TabHeading>
            }>
            <ExpenseList condition={1} searchTerm={searchTerm} {...props}/>
          </Tab>
          <Tab
          index={2}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}>
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>REJECTED</Text>
                {/* <Badge style={{bottom:15}}>{rejectedRanges}</Badge> */}
              </TabHeading>
            }>
           <ExpenseList condition={2} searchTerm={searchTerm} {...props}/>
          </Tab>
      
        {(modules.includes("timesheets-manager") && listAll) ||
          (modules.includes("console-customization") && listAll) ? (
            <Tab
            index={3}
              heading={
                <TabHeading style={{backgroundColor:'#3f51b5'}}>
                  <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>MY-EXPENSES</Text>
                  {/* <Badge style={{bottom:15}}>{myCount}</Badge> */}
                </TabHeading>
              }>
             <ExpenseList condition={3} searchTerm={searchTerm} {...props}/>
            </Tab>
          ) : null}
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