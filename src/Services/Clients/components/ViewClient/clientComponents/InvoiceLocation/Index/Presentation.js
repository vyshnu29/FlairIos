
import React from "react"
import {View,Text} from "react-native"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';

function Presentation(props) {
  const { line1, line2, city, state, zipCode, country } = props.invoiceLocation
  return (
    <View>
      
    <Text style={{color:'black',marginBottom:5,marginTop:7,fontSize:16,fontWeight:'bold'}}>Invoice Location</Text>
      <Paragraph style={{maxWidth:330}}> {[line1, line2, city, country, state, zipCode]
            .filter((item) => item !== "")
            .join(", ")}</Paragraph>
    </View>
  )
}

export default Presentation
