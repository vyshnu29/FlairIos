import React from 'react';
import {Avatar, Title, ActivityIndicator} from 'react-native-paper';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
 
} from 'native-base';
import validate from '../../../../../shared/validation';
import MetaInfo from '../../../../../shared/getMetaInfo';

function Presentation(props) {
  const {clientInvoices, handlePayment, isLoading, state} = props;

  const data = [];

  clientInvoices &&
    clientInvoices.forEach((item) => {
      data.push({
        id: item.id,
        placementID: item.placementID,
        clientID: item.clientID,
        employeeID: item.employeeID,
        employeeName: new MetaInfo().emailToName(item.employeeID),
        invoiceDate: validate.dateFormatter(item.invoiceDate),
        invoiceDueDate: validate.dateFormatter(item.invoiceDueDate),
        paymentAmount: item.paymentAmount,
        discountDetails: item.discountDetails,
        paymentDiscountDetails: item.paymentDiscountDetails,
        totalAmount: validate.currencyFormatterUs(item.totalAmount),
        receivedAmount: validate.currencyFormatterUs(item.receivedAmount),
        latestPaymentDate:
          item.latestPaymentDate !== ''
            ? validate.dateFormatter(item.latestPaymentDate)
            : '--',
        openBalance: validate.currencyFormatterUs(item.openBalance),
        unformattedTotalAmount: item.totalAmount,
      });
    });
  console.log('s', data);
  if (!isLoading)
    return (
      <View>
        {
          data.length ?  (
            <View>
            {
              data.map((item) => {
                return (
                 <List>
                   
                   <ListItem avatar>
                     <Body>
                       <TouchableOpacity>
                         <Title
                           style={{color: '#d9534f', fontSize: 14, right: 5}}
                           mode="text">
                           {' '}
                           {item.id.toUpperCase()}{' '}
                         </Title>
                       </TouchableOpacity>
   
                       <View style={{flexDirection: 'row'}}>
                         <View style={{flexDirection: 'column'}}>
                           <Text>Employee</Text>
                           <Text>Invoiced Date</Text>
                           <Text>Due Date</Text>
                           <Text>Invoiced Amount</Text>
                           <Text>Received Amount</Text>
                           <Text>Latest Payment Date</Text>
                           <Text>Open Balance</Text>
                         </View>
                      
                         <View style={{flexDirection: 'column'}}>
                           <Text style={{left:10 ,color: '#62B1F6'}}>
                             {item.employeeName}
                           </Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.invoiceDate}</Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.invoiceDueDate}</Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.totalAmount}</Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.receivedAmount}</Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.latestPaymentDate}</Text>
                           <Text style={{left:10 , color:'#7d7d7d'}}>{item.openBalance}</Text>
                         </View>
                       </View>
                     </Body>
                   </ListItem>
                 </List>
               );
         })
            }
            </View>
            ) : <View style={{alignSelf: 'center',marginTop:50}}>
              <Text >No data</Text>
              </View>
        }
        
      </View>
        // <FlatList
        //   data={data}
        //   renderItem={({item}) => {
       
        //   }}
        // />
    
    );
  return (
    <View style={{alignSelf: 'center',marginTop:50}}>
  <ActivityIndicator />
  </View>)
}

export default Presentation;
