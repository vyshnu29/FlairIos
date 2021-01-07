import validate from "../../../../../../../shared/validation"
import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import { Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';




function Presentation(props) {
  const { history, handleUpdate, handleTabChange } = props
  let data = []

  history &&
    history.forEach((record) => {
      data.push({
        ...record,
        OTbillingRate: validate.currencyFormatterUs(record.OTbillingRate),
        effectiveDate: validate.dateFormatter(record.effectiveDate),
        effectiveUntil: validate.dateFormatter(record.effectiveUntil),
        fixedPay: validate.currencyFormatterUs(record.fixedPay),
        employeePayRate: validate.currencyFormatterUs(record.employeePayRate),
        OTpayRate: validate.currencyFormatterUs(record.OTpayRate),
        billingRate: validate.currencyFormatterUs(record.billingRate),
      })
    })
  return (
   
      <FlatList
    data={data}
  //  keyExtractor={(item) => item.clientId}
    renderItem={({item}) => {
      return (
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Effective Date</Text>
          <Text style={{color:'#62B1F6'}}>Effective Until</Text>
          <Text style={{color:'#62B1F6'}}>Billing Type</Text>
          <Text style={{color:'#62B1F6'}}>Billing Rate</Text>
          <Text style={{color:'#62B1F6'}}>PO Number</Text>
          <Text style={{color:'#62B1F6'}}>Pay Type</Text>
          <Text style={{color:'#62B1F6'}}>Fixed Pay</Text>
          <Text style={{color:'#62B1F6'}}>Percentage</Text>
          <Text style={{color:'#62B1F6'}}>Emp. Pay Rate"</Text>
          <Text style={{color:'#62B1F6'}}>OT Pay Rate</Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{item.effectiveDate}</Text>
          <Text style={{left:15}}>{item.effectiveUntil}</Text>
      <Text style={{left:15}}>{item.billingType}</Text>
          <Text style={{left:15}} >{item.billingRate}</Text>
          <Text style={{left:15}}>{item.OTbillingRate}</Text>
          <Text style={{left:15}} >{item.purchaseOrderNumber}</Text>
          <Text style={{left:15}}>{item.payType}</Text>
      <Text style={{left:15}}>{item.fixedPay}</Text>
          <Text style={{left:15}} >{item.employeePayRate}</Text>
          <Text style={{left:15}}>{item.OTpayRate}</Text>
        </View>
    </View>
       
      );
    }}
  />
      
  )
}

export default Presentation

