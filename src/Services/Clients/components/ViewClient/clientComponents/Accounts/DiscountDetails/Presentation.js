import React from 'react';
import {
  Card,
  DataTable,
  Paragraph,
  Divider,
  Avatar,
  Appbar,
  Menu,
} from 'react-native-paper';
import {View, Text} from 'react-native';
function Presentation(props) {
  const {status, discountDetails} = props.accounts;
  if (discountDetails.length)
    return (
      <View>
        <Text style={{color:'black',marginBottom:5,marginTop:7,fontSize:16,fontWeight:'bold'}}>Discount Details</Text>
          <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title >Type</DataTable.Title>
            <DataTable.Title style={{marginRight:10}}>Discount</DataTable.Title>
          </DataTable.Header>
          {discountDetails.map((row) => (
          <DataTable.Row>
            <DataTable.Cell>{row.name ? row.name : '----'}</DataTable.Cell>
            <DataTable.Cell>{row.type ? row.type : '----'}</DataTable.Cell>
            <DataTable.Cell>{row.value ? row.value : '----'}</DataTable.Cell>
          </DataTable.Row>
         ))}
         
        </DataTable>
             
          
     
      </View>
    );
  return (
    <View>
     <Text style={{color:'black',marginBottom:5,marginTop:7,fontSize:16,fontWeight:'bold'}}>Discount Details</Text>
      <Paragraph style={{alignSelf: 'center', marginTop: 30}}>
        No data
      </Paragraph>
    </View>
  );
}

export default Presentation;

// <View style={{flexDirection: 'row'}}>
// <View style={{flexDirection: 'column'}}>
//   <Text>Name</Text>
//   <Text>Type</Text>
//   <Text>Discount</Text>
// </View>
// <View style={{flexDirection: 'column'}}>
//   <Text> : </Text>
//   <Text> : </Text>
//   <Text> : </Text>
// </View>

// <View style={{flexDirection: 'column'}}>
//   <Text style={{color: 'grey'}}>
//     {row.name ? row.name : '----'}
//   </Text>
//   <Text style={{color: 'grey'}}>
//     {row.type ? row.type : '----'}
//   </Text>
//   <Text style={{color: 'grey'}}>
//     {row.value ? row.value : '----'}
//   </Text>
// </View>
// </View>