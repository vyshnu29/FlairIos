import React, {useEffect, useContext} from 'react';
import { Container, Header, Content, Text, Body } from "native-base";
import { Card, Title, Paragraph,Caption } from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from "react-redux"
import Headere from '../shared/HeaderBar/index'
import modules from "../modules"

const numColumns = 3

function AllServices(props) {

  const data = modules.filter((ele) => props.accessModules.includes(ele.moduleName) || props.accessModules.includes("console-customization") ||ele.moduleName === "common-module")
 
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };
  return (
    <View style={{flex:1,backgroundColor:'#fcfcfc'}}>
       <Headere {...props}/>
    <FlatList
     data={formatData(data, numColumns)}
    keyExtractor={(item) => item.text}
    renderItem={({item}) => {
      if (item.empty === true) 
      {
        return <View style={[styles.item, styles.itemInvisible]} />;
      }
      return (

        <View style={{justifyContent:'center',alignItems:'center',flex:1,margin:1,height:Dimensions.get('window').width / numColumns,backgroundColor:'#fff'}}>
      <TouchableOpacity onPress={() => {props.navigation.navigate(item.link)}}>
     {item.img}
      </TouchableOpacity>
   <Caption style={{fontSize:12}}>{item.text}</Caption>
 </View>
)
    }}
    numColumns={numColumns}
    />

</View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    accessModules: state.employee.employeeModules.accessModules,
    profile: state.firebase.profile,
  }
}

export default  connect(mapStateToProps, null)(AllServices);

const styles = StyleSheet.create({
  Text1: {
    fontSize: 23,
    margin: 18,
  },
  container: {
    flex: 1,
   
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});


{/* <Container>
       <Headere {...props}/>
        <Content padder>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => {props.navigation.navigate('TaskManagement')}}>
        <Image
          source={TaskManagement}
          style={{
            width: 50,
            height: 50,
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Task</Caption>
     <Caption style={{fontSize:12,bottom:8}}>Management</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
             onPress={() => {props.navigation.navigate('EmployeesList')}}
              >
        <Image
          source={EmployeeList}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Employees</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
             onPress={() => {props.navigation.navigate('Wiki')}}
              >
        <Image
          source={Wiki}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Wiki</Caption>
    </Card.Content>
          </Card>
          </View>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly',marginTop:10}}>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('ClientList')}}
              >
        <Image
          source={Clients}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Clients</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('Placements')}}
              >
        <Image
          source={Placements}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Placements</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('TimeSheets')}}
              >
        <Image
          source={TimeSheets}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>TimeSheets</Caption>
    </Card.Content>
          </Card>
          </View>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly',marginTop:10}}>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('Expenses')}}
              >
        <Image
          source={Expenses}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Expenses</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('Invoices')}}
              >
        <Image
          source={Invoices}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Invoices</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('Deductions')}}
              >
        <Image
          source={Deductions}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Deductions</Caption>
    </Card.Content>
          </Card>
          </View>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly',marginTop:10}}>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('History')}}
              >
        <Image
          source={History}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>History</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('PayRolls')}}
              >
        <Image
          source={PayRolls}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>PayRolls</Caption>
    </Card.Content>
          </Card>
          <Card style={{height: 120, width: 110, elevation: 3}}>
          <Card.Content style={{alignSelf:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate('EssRequest')}}
              >
        <Image
          source={EssRequest}
          style={{
            width: 50,
            height: 50,
 
          }}
        />
        </TouchableOpacity>
     <Caption style={{fontSize:12}}>Ess Request</Caption>
    </Card.Content>
          </Card>
          
          </View>
        </Content>
      </Container> */}