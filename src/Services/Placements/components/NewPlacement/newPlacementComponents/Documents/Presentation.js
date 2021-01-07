import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList,TouchableOpacity,Linking } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
import validate from "../../../../../../shared/validation"



function Presentation(props) {
  const {
  
    documents,
  
  } = props
  const [value, setValue] = React.useState(0)
 console.log("ll",documents)
 
  // let data = []
  // documents &&
  //   documents.forEach((doc, index) => {
  //     data.push({
  //       documentType: doc.documentType,
  //       status: doc.status,
  //       work_doc: doc.work_doc,
  //       effectiveDate: validate.dateFormatter(doc.effectiveDate),
  //       effectiveUntilDate: validate.dateFormatter(doc.effectiveUntilDate),
  //       index: index,
  //     })
  //   })
  const documentTypes = [
    "Incorporation",
    "PO",
    "MSA",
    "COI",
    "W9",
    "MSA &PO",
    "Others",
  ]
  //console.log("aa",data)

  const statusList = ["Active", "Inactive"]
  return (
   
      <FlatList
    data={documents}
    keyExtractor={(item) => item.clientId}
    renderItem={({item}) => {
      return (
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Document type</Text>
          <Text style={{color:'#62B1F6'}}>Status</Text>
          <Text style={{color:'#62B1F6'}}>Effective Date</Text>
          <Text style={{color:'#62B1F6'}}>Effective Until</Text>
          <Text style={{color:'#62B1F6'}}>Document</Text>
          
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{item.documentType}</Text>
          <Text style={{left:15}}>{item.status}</Text>
      <Text style={{left:15}}>{validate.dateFormatter(item.effectiveDate)}</Text>
          <Text style={{left:15}} >{validate.dateFormatter(item.effectiveUntilDate)}</Text>
          <TouchableOpacity style={{left:15}} onPress={() => Linking.openURL(item.work_doc.url) }>
          <Text style={{textDecorationLine:'underline',color:'#3F51B5'}} >{item.work_doc.name.trim().substring(0,15)}</Text>
       </TouchableOpacity>
        </View>
    </View>
       
      );
    }}
  />
      
  )
}

export default Presentation
