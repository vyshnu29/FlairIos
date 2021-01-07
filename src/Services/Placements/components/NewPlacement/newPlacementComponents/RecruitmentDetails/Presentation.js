import React from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem,  Icon, Left, Body, Right, Switch } from 'native-base';
function Presentation(props) {
  const [data,setData] = React.useState(null)
  const {
    handleEmployees,
    companyIDs,
    benchSalesList,
    handleSubmit,
    fillableSections,
  } = props
  React.useEffect(() => {
    benchSalesList.filter((employee) => {
      if(employee.companyID == companyIDs){
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
      <Text style={{color:'#62B1F6'}}>Employees</Text>
    
    </View>
    <View style={{marginTop:5}}>
      <Text style={{left:15}} >{data}</Text>
   
    </View>
</View>
</ListItem>
  )
}

export default Presentation
