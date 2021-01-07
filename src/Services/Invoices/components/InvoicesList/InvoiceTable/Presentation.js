import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
 Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import {createFilter} from 'react-native-search-filter';
import validate from "../../../../../shared/validation"
import MetaInfo from "../../../../../shared/getMetaInfo"


function Presentation(props) {
  const { state, condition, tabPair,searchTerm } = props

  const ConsultType = (item) => {
    if (item.isVoid) return <Title style={{color: '#d9534f', fontSize: 14,right:5 }}  mode="text"> {item.id.toUpperCase()} </Title>
    else if (item.isPaymentDone)
      return <Title style={{color: '#5cb85c', fontSize: 14  ,right:5 }}  mode="text" > {item.id.toUpperCase()} </Title>
    else if (item.isMailedToClient)
      return <Title style={{color: '#f0ad4e', fontSize: 14 ,right:5 }}  mode="text"> {item.id.toUpperCase()} </Title>
    return <Title style={{color: '#d9534f', fontSize: 14  ,right:5 }}  mode="text"> {item.id.toUpperCase()} </Title>
  };

  const data = Object.values(state[tabPair[condition]].data).map((item) => {
    return {
      id: item.id,
      createdAt: validate.dateFormatter(item.createdAt),
      createdBy: item.createdBy,
      startDate: validate.dateFormatter(item.startDate),
      endDate: validate.dateFormatter(item.endDate),
      invoiceDate: validate.dateFormatter(item.invoiceDate),
      invoiceDueDate: validate.dateFormatter(item.invoiceDueDate),
      clientID: item.invoiceBy !== "external" ? item.clientID : "--",
      clientName:
        item.invoiceBy !== "external" ? new MetaInfo().clientIdToName(item.clientID) : "--",
      invoiceBy: item.invoiceBy,
      placementID: item.invoiceBy !== "external" ? item.placementID : "--",
      employeeID: item.invoiceBy !== "external" ? item.employeeID : "--",
      employeeName: item.invoiceBy !== "external" ? new MetaInfo().emailToName(item.employeeID) : "--",
      isMailedToClient: item.isMailedToClient,
      isVoid: item.isVoid,
      isPaymentDone: item.isPaymentDone,
      invoiceDetails: item.invoiceDetails,
      timesheetAttachment: item.timesheetAttachment,
      expenseAttachment: item.expenseAttachment,
      timesheets: item.timesheets,
      expenses: item.expenses,
      paymentDetails: item.paymentDetails,
      discountDetails: item.discountDetails,
      totalAmount: item.totalAmount,
      invoicedAmount: item.totalAmount,
      receivedAmount: item.receivedAmount,
      latestPaymentDate: item.latestPaymentDate
        ? validate.dateFormatter(item.latestPaymentDate)
        : "--",
      moreInformation: item.moreInformation,
      openBalance: item.totalAmount - item.receivedAmount - item.paymentDiscountAmount,
      mailReceivers: item.mailReceivers,
      unformattedTotalAmount: item.totalAmount,
    }
  })

 let isLoading = state[tabPair[condition]].noOfLoadings === 0 ? state[tabPair[condition]].isLoading : false
 const KEYS_TO_FILTERS = [
  'clientID',
  'placementID',
  'employeeName',
  'clientName',
  'invoicedAmount',
  'receivedAmount',
  'invoiceDueDate',
  'latestPaymentDate',
  'openBalance',
  'createdAt',
  'id'
];
const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
if(!isLoading)
  return (
    <Container>
    <FlatList
      data={filteredInfo}
      renderItem={({item}) => {
        return (
        
            <List>
              <ListItem avatar>
                {/* <Left>
                  <Avatar.Text
                    size={55}
                    label={item.clientname[0].toUpperCase()}
                    style={{backgroundColor: '#c42053'}}
                  />
                </Left> */}
                <Body>
                <TouchableOpacity>
                  {
                    
                  ConsultType(item , item.isVoid)
                  
                  }
                      
                    </TouchableOpacity>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text>PC</Text>
                      <Text>Client Name</Text>
                      <Text>Employee</Text>
                      <Text>Invoiced Date</Text>
                      <Text>Due Date</Text>
                      <Text>Invoiced Amount</Text>
                      <Text>Received Amount</Text>
                      <Text>Latest Payment Date</Text>
                      <Text>Open Balance</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('PlacementsView', {
                                id: item.employeeID, docId:item.placementID
                              });
                            }}>
                      <Text style={{left:10 ,color: '#62B1F6'}}>{item.placementID}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                   onPress={() => {
               props.navigation.navigate('ViewClient',{clientId : item.clientID})}}
              >
                      <Text style={{left:10 ,color: '#62B1F6'}}>{item.clientName}</Text>
                      </TouchableOpacity>
                      <Text style={{left:10 ,color: '#62B1F6'}}>{item.employeeName}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.createdAt}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.invoiceDueDate}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.invoicedAmount}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.receivedAmount}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.latestPaymentDate}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.openBalance}</Text>

                    </View>
                  </View>
                </Body>
              </ListItem>
            </List>
         
        );
      }}
    />
  </Container> 
  )
  return (<Spinner visible={true} />)
}

export default Presentation
