import React from "react"
import DiscountDetails from "../DiscountDetails"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {View,Text} from 'react-native'

function Presentation(props) {
  const accounts = props.accounts[0]
  console.log(accounts)

  let rows = []
  let max = [
    accounts.to.length,
    accounts.cc.length,
    accounts.bcc.length,
  ].reduce((a, b) => Math.max(a, b))

  for (let index = 0; index < max; index++) {
    rows.push({
      to: accounts.to[index] ? accounts.to[index] : "",
      cc: accounts.cc[index] ? accounts.cc[index] : "",
      bcc: accounts.bcc[index] ? accounts.bcc[index] : "",
    })
  }

 

  return (
    <View>
      <Text style={{color:'black',marginTop:7,marginBottom:5,fontSize:16,fontWeight:'bold'}}>Notifiers</Text>
      <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{color:'#62B1F6'}}>To</Text>
                      <Text style={{color:'#62B1F6'}}>CC</Text>
                      <Text style={{color:'#62B1F6'}}>BCC</Text>
                    </View>
                    {rows.map((row) => (
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{left:15}}>{row.to ? row.to : '----'}</Text>
                      <Text style={{left:15}}>{row.cc ? row.cc : '----'}</Text>
                      <Text style={{left:15}}>{row.bcc ? row.bcc : '----'}</Text>
                    </View>
                       ))}
                  </View>
      <Text style={{color:'black',marginBottom:5,marginTop:7,fontSize:16,fontWeight:'bold'}}>More Details</Text>
      <View style={{flexDirection: 'row'}}>
      
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{color:'#62B1F6'}}>Services</Text>
                      <Text style={{color:'#62B1F6'}}>Name</Text>
                      <Text style={{color:'#62B1F6'}}>Mobile Number</Text>
                      <Text style={{color:'#62B1F6'}}>Email</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{left:15}}>{accounts.services ? accounts.services : '-----'}</Text>
                      <Text style={{left:15}}>{accounts.firstName + "" + accounts.middleName + "" + accounts.lastName ? accounts.firstName + "" + accounts.middleName + "" + accounts.lastName : '-----'}</Text>
                      <Text style={{left:15}}>{accounts.mobileNumber ? accounts.mobileNumber : '-----'}</Text>
                      <Text style={{left:15}}>{accounts.email ? accounts.email : '-----'}</Text>
                    </View>  
                  </View>
  <DiscountDetails accounts={accounts} client={props.client} />
  </View>
  )
}

export default Presentation
