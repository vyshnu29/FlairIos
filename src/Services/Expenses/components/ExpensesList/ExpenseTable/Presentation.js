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
import Clock from 'react-native-vector-icons/FontAwesome';
import styles from '../../../styles/Table'
import { Container, Header, Card,Content, List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
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
            <TouchableOpacity onPress={() => {setv(!sv)}}>
            <Card style={styles.container} noShadow>
              <View style={styles.labelContainer}>
                <View style={styles.mainTextContainer}>
                  <View>
                    <Title
                      style={{
                        color: '#62B1F6',
                        fontSize: 17,
                        fontWeight: '400',
                        bottom: 5,
                      }}>
                      {metaInfo.toNameCase(item.name)}
                    </Title>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    top: 10,
                    backgroundColor:'#f5f5f5',
                  }}>
                  <View>
                    <Text style={[styles.labelText1]}>{item.expenseType}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View>
                    <View>
                      <Text style={styles.authorName}>
                      Spent Date : {item.spentDate}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{paddingTop: 5}}>
                      <Text style={styles.authorName}>
                      Departure Date : {item.departureDate}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{paddingTop: 5}}>
                      <Text style={styles.authorName}>
                        Return Date : {item.returnDate}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{top:26}} >
                 <Text style={{color:"#62B1F6",fontSize:18}}><Clock name='dollar' size={16} color="#62B1F6"  /> {item.amount.substring(1)} </Text> 
                </TouchableOpacity>
              </View>
       
            </Card>
          </TouchableOpacity>
         
           
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
