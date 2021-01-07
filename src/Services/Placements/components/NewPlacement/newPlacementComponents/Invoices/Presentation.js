import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
import validate from "../../../../../../shared/validation"


function Presentation(props) {
  const {
    value,
    frequency,
    OT,
    POnumber,
    pointOfContactMailId,
    attachFlairExpense,
    attachFlairTimesheets,
    bcc,
    billingAddress,
    cc,
    frequencyStartDate,
    pointOfContactName,
    pointOfContactPhoneNo,
    to,
    handleDelete,
    handleAdd,
    fillableSections,
    handleTab,
    handleChange,
    handleCheck,
    handleDateChange,
    helperText,
    index,
    handleSubmit,
  } = props

  const total = ["Weekly", "Biweekly", "Semi-Monthly", "Monthly"]
  let invoiceFrequencies = []
  if (index === 0 || index === 1) {
    invoiceFrequencies = total
  } else {
    invoiceFrequencies = total.slice(index - 1)
  }

  return (
    <ListItem>
    <View style={{flexDirection:"row"}}>
    <View style={{marginTop:5}}>
      <Text style={{color:'#62B1F6'}}>Contact Name</Text>
      <Text style={{color:'#62B1F6'}}>Contact Number</Text>
      <Text style={{color:'#62B1F6'}}>Contact mailId</Text>
      <Text style={{color:'#62B1F6'}}>TO</Text>
      <Text style={{color:'#62B1F6'}}>CC</Text>
      <Text style={{color:'#62B1F6'}}>BCC</Text>
    </View>
    <View style={{marginTop:5}}>
      <Text style={{left:15}} >{pointOfContactName}</Text>
      <Text style={{left:15}}>{pointOfContactPhoneNo}</Text>
      <Text style={{left:15}}>{pointOfContactMailId}</Text>
      <Text style={{left:15}} >{to}</Text>
      <Text style={{left:15}}>{cc}</Text>
      <Text style={{left:15}}>{bcc}</Text>
    </View>
</View>
</ListItem>
  )
}

export default Presentation
