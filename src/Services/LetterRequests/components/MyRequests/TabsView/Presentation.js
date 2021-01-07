import React from "react"
import LetterRequestTable from "../LetterRequestTable"
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
import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default function TabsView(props) {
  const {
    handleTabChange,
    tabValue,
    myReq,
    text,
    modules,
    listAll,
    trackLetterRequestsSubmissions = {
      all: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
  } = props
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  return (
    <View style={{flex:1}}>
       {!visible ? (
      <Header>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>{text}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" />
            </Button>
            </Right>
          </Header>
           ) : null}
        
        {visible ? (
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="arrow-back" />
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
              <TabHeading >
                <Text>ALL  </Text>
                {/* <Badge style={{bottom:15}}>{trackLetterRequestsSubmissions.all}</Badge> */}
                </TabHeading>
            }>
           <LetterRequestTable condition={0} searchTerm={searchTerm} myReq={myReq} />
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading><Text>PENDING  </Text>
              {/* <Badge style={{bottom:15}}>{trackLetterRequestsSubmissions.pending}</Badge> */}
              </TabHeading>
            }>
           <LetterRequestTable condition={1} searchTerm={searchTerm} myReq={myReq} />
          </Tab>
          <Tab
          index={2}
            heading={
            <TabHeading><Text>REJECTED </Text>
            {/* <Badge style={{bottom:15}}>{trackLetterRequestsSubmissions.pending}</Badge> */}
            </TabHeading>
            }>
           <LetterRequestTable condition={2} searchTerm={searchTerm} myReq={myReq} />
          </Tab>
          <Tab
          index={3}
            heading={
              <TabHeading>
                <Text>ISSUED  </Text>
                {/* <Badge style={{bottom:15}}>{trackLetterRequestsSubmissions.approved}</Badge> */}
              </TabHeading>
            }>
           <LetterRequestTable condition={3} searchTerm={searchTerm} myReq={myReq} />
          </Tab>
        </Tabs>
        
    </View>
  )
}