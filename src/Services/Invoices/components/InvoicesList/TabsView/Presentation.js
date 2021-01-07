import React from "react"
import InvoiceTable from "../InvoiceTable"
import {
  Badge,
  Title,
  FAB
} from 'react-native-paper';
import Payments from "../../../../Payments/components/Index"
import {
  Container,
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
  Input
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
    isLoaded,
    dueRanges,
    voidInvoices,
    paidInvoices,
    openInvoices,
    trackInvoiceSubmissions = { open: 0, void: 0, paid: 0 },
  } = props
  const allBadge = Number(
    trackInvoiceSubmissions.open +
      trackInvoiceSubmissions.void +
      trackInvoiceSubmissions.paid
  )
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
            <Title style={{color: 'white'}}>Invoices</Title>
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
                <Text>Due  </Text>
                </TabHeading>
            }>
           <InvoiceTable condition={0} searchTerm={searchTerm} {...props}/>
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading><Text>Open  </Text>
              </TabHeading>
            }>
            <InvoiceTable condition={1} searchTerm={searchTerm} {...props}/>
          </Tab>
          <Tab
          index={2}
            heading={
              <TabHeading>
                <Text>Void </Text>
              </TabHeading>
            }>
           <InvoiceTable condition={2} searchTerm={searchTerm}  {...props}/>
          </Tab>
          <Tab
          index={3}
            heading={
              <TabHeading>
                <Text>Paid </Text>
              </TabHeading>
            }>
           <InvoiceTable condition={3} searchTerm={searchTerm} {...props}/>
          </Tab>
          <Tab
          index={4}
            heading={
              <TabHeading>
                <Text>All </Text>
              </TabHeading>
            }>
            <InvoiceTable condition={4} searchTerm={searchTerm} {...props} />
          </Tab>
          <Tab
          index={5}
            heading={
              <TabHeading>
                <Text>Payments </Text>
              </TabHeading>
            }>
            <Payments {...props}  /> 
          </Tab>
         
            </Tabs>
    </>
  )
}
