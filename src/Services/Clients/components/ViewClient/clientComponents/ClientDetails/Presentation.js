import React from "react"
import MetaInfo from "../../../../../../shared/getMetaInfo"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
import InvoiceLocation from "../InvoiceLocation/Index"
import DiscountDetails from "../Accounts/DiscountDetails"

function Presentation(props) {
  const { client, accounts, placements_list, names } = props

  const metaInfo = new MetaInfo()

  const activeConsultants = placements_list
    .filter((item) => item.clientId === client.clientId)
    .map((item) => item.employeeID)

  const detailsExpanded = activeConsultants.map(
    (employeeID) => names[employeeID]
  )
console.log("amaa", detailsExpanded)

  return (
    <View style={{padding: 10}} >
      <View style={{flexDirection:"row"}}>
          <View>
            <Text style={{color:'#62B1F6'}}>Net terms</Text>
            <Text style={{color:'#62B1F6'}}>Job termination notice</Text>
            <Text style={{color:'#62B1F6'}}>Client type</Text>
          </View>
          <View>
            <Text style={{left:15}} >{client.netTerms}</Text>
            <Text style={{left:15}}>{client.jobTerminationNotice}</Text>
            <Text style={{left:15}}>{client.category}</Text>
          </View>
      </View>
      <Text style={{color:'black',marginBottom:5,marginTop:7,fontSize:16,fontWeight:'bold'}}>Active consultants</Text>
      {detailsExpanded.map((item) => (
        <View style={{flexDirection: 'row'}} >
                   <Text style={{textDecorationLine: 'underline'}} >{item.name}</Text>
              </View>
            ))}
             <InvoiceLocation
            invoiceLocation={client.invoiceLocation}
            id={client.id}
          />
           <DiscountDetails accounts={accounts[0]} client={client} />
    </View>
  )
}

export default Presentation

{/* <View>
       <Card style={{marginTop:5}}>
    <Card.Content>
      <Title>Net terms</Title>
      <Paragraph>{client.netTerms}</Paragraph>
    </Card.Content>
  </Card>
  <Divider />
  <Card style={{marginTop:5}}>
    <Card.Content>
      <Title>Job termination notice</Title>
      <Paragraph>{client.jobTerminationNotice}</Paragraph>
    </Card.Content>
  </Card>
  <Divider />
  <Card style={{marginTop:5}}>
    <Card.Content>
      <Title>Client type</Title>
      <Paragraph>{client.category}</Paragraph>
    </Card.Content>
  </Card>
  <Divider />
  <Card style={{marginTop:5}}>
    <Card.Content>
      <Title>Active consultants ({detailsExpanded.length})</Title>
      {detailsExpanded.map((item) => (
        <List tyle={{flexDirection: 'column',flexWrap:'wrap' ,alignItems:'space-between'}} >
                  <Avatar.Image source={{uri : item.photoURL}} size={40}  />
              </List>
            ))}
    </Card.Content>
  </Card>
  <Divider />
  <InvoiceLocation
            invoiceLocation={client.invoiceLocation}
            id={client.id}
          />
           <Divider />
           <DiscountDetails accounts={accounts[0]} client={client} />
           </View>    */}