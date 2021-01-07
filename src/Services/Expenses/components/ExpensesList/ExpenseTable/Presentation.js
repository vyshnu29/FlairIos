import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  ScrollView,
  Text ,
  Linking,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
import validate from "../../../../../shared/validation"
import MetaInfo from "../../../../../shared/getMetaInfo"
import {createFilter} from 'react-native-search-filter';

function Presentation(props) {
  const { state, condition, tabPair, loggedInEmployee,searchTerm } = props
  const metaInfo = new MetaInfo()
  const data = Object.values(state[tabPair[condition]].data).map((item) => {
    const clientName = "client"
    return {
      empCode: item.employeeID,
      name: metaInfo.emailToName(item.employeeID),
      imageURL: metaInfo.getImage(item.employeeID),
      spentDate: validate.dateFormatter(item.spentDate),
      expenseType: item.expenseType,
      amount: "$" + item.amount,
      expenseDoc: item.expenseDoc,
      vendor: item.vendor,
      receipt: item.receipt,
      departureDate:
        item.hasOwnProperty("departureDate") &&
        !isNaN(Date.parse(new Date(item.departureDate)))
          ? validate.dateFormatter(item.departureDate)
          : "---",
      returnDate:
        item.hasOwnProperty("returnDate") &&
        !isNaN(Date.parse(new Date(item.returnDate)))
          ? validate.dateFormatter(item.returnDate)
          : "---",
      additionalDetails: item.additionalDetails.length
        ? item.additionalDetails
        : "---",
      id: item.id,
      placementID: item.placementID,
      isApproved: item.isApproved,
      isRejected: item.isRejected,
      comment: item.hasOwnProperty("rejectedDetails")
        ? item.rejectedDetails.reason
        : "---",
      attachmentDetails: item.attachmentDetails,
      attachmentName: `${metaInfo.emailToName(item.employeeID)}_${clientName}_${
        item.placementID
      }`.replace(/\s/g, ""),
    }
  })
  
 let isLoading =  state[tabPair[condition]].noOfLoadings === 0
 ? state[tabPair[condition]].isLoading
 : false
 const KEYS_TO_FILTERS = [
  'name',
  'empCode',
  'spentDate',
  'expenseType',
  'amount',
];
const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
if(!isLoading)
  return (
    <Container>
      {
        data.length ?  <FlatList
        data={filteredInfo}
        renderItem={({item}) => {
          return (
              <List>
                <ListItem avatar>
                  <Left>
                  <Thumbnail
                    small
                    source={{uri: item.imageURL}}
                  />
                  </Left>
                  <Body>
                    <TouchableOpacity>
                      <Title
                        style={{color: '#3F51B5', fontSize: 14}}
                        mode="text">
                        {item.name.toUpperCase()}
                      </Title>
                    </TouchableOpacity>
  
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text>Employee Id</Text>
                        <Text>Spent date</Text>
                        <Text>Expense Type</Text>
                        <Text>Amount</Text>
                        <Text>Vendor</Text>
                        <Text>Receipt</Text>
                        <Text>Departure Date</Text>
                        <Text>Return Date</Text>
                        <Text>Expense Doc</Text>
                      </View>
                    
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{left:10 ,color: '#62B1F6'}}>{item.empCode}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.spentDate}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.expenseType}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.amount}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.vendor}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.receipt}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.departureDate}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.returnDate}</Text>
                        <TouchableOpacity   onPress={() => Linking.openURL(item.attachmentDetails.publicURL) }>
                        <Text style={{left:10 ,color: '#62B1F6',textDecorationLine:'underline'}}>{item.attachmentName.trim(0,15).substring(0,15)}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Body>
                </ListItem>
              </List>
           
          );
        }}
      /> : 
      <View>
        <Text style={{alignSelf: 'center',marginTop:'50%'}}>No data</Text>
      </View>
      }
   
  </Container> 
  )
  return (<Spinner visible={true} />)
}

export default Presentation
