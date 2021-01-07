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
            <Title style={{color: 'white'}}>Timesheets</Title>
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
                <Text>Submitted  </Text>
                {/* <Badge style={{bottom:15}}>{pendingRanges}</Badge> */}
                </TabHeading>
            }>
           <TimesheetTable condition={"submittedTimesheets"} searchTerm={searchTerm} />
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading><Text>Approved  </Text>
              {/* <Badge style={{bottom:15}}>{approvedRanges}</Badge> */}
              </TabHeading>
            }>
            <TimesheetTable condition={"approvedTimesheets"} searchTerm={searchTerm}/>
          </Tab>
          <Tab
          index={2}
            heading={
            <TabHeading><Text>Defaulters </Text>
            {/* <Badge style={{bottom:15}}>{defaulterRanges}</Badge> */}
            </TabHeading>
            }>
           <TimesheetTable condition={"defaulterTimesheets"} searchTerm={searchTerm}/>
          </Tab>
          <Tab
          index={3}
            heading={
              <TabHeading>
                <Text>Rejected </Text>
                {/* <Badge style={{bottom:15}}>{rejectedRanges}</Badge> */}
              </TabHeading>
            }>
            <TimesheetTable condition={"rejectedTimesheets"} searchTerm={searchTerm}/>
          </Tab>
        </Tabs>
        
    </Container>
  )
}
