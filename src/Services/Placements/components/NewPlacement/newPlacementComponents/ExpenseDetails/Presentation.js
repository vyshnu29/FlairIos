import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
function Presentation(props) {
  const [data,setData] = React.useState(null)
  const {
    handleEmployees,
    approvalBy,
    approvalManagers,
    handleSubmit,
    fillableSections,
  } = props

  React.useEffect(() => {
    
    approvalManagers.filter((employee) => {
      console.log(employee)
      if(employee.companyID = approvalBy){
        setData(employee.name)
      }else{
        setData("")
      }
    })
  })
  
  return (
    <ListItem>
    <View style={{flexDirection:"row"}}>
    <View style={{marginTop:5}}>
      <Text style={{color:'#62B1F6'}}>Employee</Text>
    
    </View>
    <View style={{marginTop:5}}>
  <Text style={{left:15}} >{data}</Text>
   
    </View>
</View>
</ListItem>
  )
}

export default Presentation


