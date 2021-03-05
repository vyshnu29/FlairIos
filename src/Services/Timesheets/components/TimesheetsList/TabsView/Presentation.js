import React from "react"
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
  Text,
  ScrollableTab,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import TimesheetTable from "../TimesheetTable"

export default function TabsView(props) {
  const { handleTabChange, tabValue, isLoaded, pendingRanges, approvedRanges, defaulterRanges, rejectedRanges } = props
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
                name="arrow-back"
                style={styles.HeaderIcons}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.HeaderTitle}>Timesheets</Title>
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
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>Submitted  </Text>
                {/* <Badge style={{bottom:15}}>{pendingRanges}</Badge> */}
                </TabHeading>
            }>
           <TimesheetTable condition={"submittedTimesheets"} searchTerm={searchTerm} />
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}><Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>Approved  </Text>
              {/* <Badge style={{bottom:15}}>{approvedRanges}</Badge> */}
              </TabHeading>
            }>
            <TimesheetTable condition={"approvedTimesheets"} searchTerm={searchTerm}/>
          </Tab>
          <Tab
          index={2}
            heading={
            <TabHeading style={{backgroundColor:'#3f51b5'}}><Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>Defaulters </Text>
            {/* <Badge style={{bottom:15}}>{defaulterRanges}</Badge> */}
            </TabHeading>
            }>
           <TimesheetTable condition={"defaulterTimesheets"} searchTerm={searchTerm}/>
          </Tab>
          <Tab
          index={3}
            heading={
              <TabHeading style={{backgroundColor:'#3f51b5'}}>
                <Text style={{color:'#fff',backgroundColor:'#3f51b5', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>Rejected </Text>
                {/* <Badge style={{bottom:15}}>{rejectedRanges}</Badge> */}
              </TabHeading>
            }>
            <TimesheetTable condition={"rejectedTimesheets"} searchTerm={searchTerm}/>
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