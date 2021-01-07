import React from 'react';
import {
  Content,
  Container,
 
  Header,
  List,
  ListItem,
  Thumbnail,
  Accordion,
  Icon,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import {Divider, Avatar, Caption, TouchableRipple} from 'react-native-paper';
import { Text,View, TouchableOpacity,Linking ,StatusBar} from 'react-native';
import General from "../newPlacementComponents/General"
import ClientDetails from "../newPlacementComponents/ClientDetails/Index"
import Payments from "../newPlacementComponents/Payments/Index"
import Invoices from "../newPlacementComponents/Invoices"
 import Documents from "../newPlacementComponents/Documents"
import RecruitmentDetails from "../newPlacementComponents/RecruitmentDetails"
 import WorkLocation from "../newPlacementComponents/WorkLocation"
import TimeSheetDetails from "../newPlacementComponents/Timesheets"
import ExpenseDetails from "../newPlacementComponents/ExpenseDetails"

import DetailsIcon from 'react-native-vector-icons/Ionicons'

function _renderHeader(item, expanded) {
  return (
    <View style={{
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between",
      alignItems: "center" ,
      backgroundColor: "#62B1F6" }}>
    <Text style={{ fontWeight: "600",color:'white' }}>
        {" "}{item.title}
      </Text>
      {expanded
        ? <Icon style={{ fontSize: 18 }} name="chevron-up" />
        : <Icon style={{ fontSize: 18 }} name="chevron-down" />}
    </View>
  );
}

function Presentation(props) {
  const { placement, profile } = props
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  const dataArray = [
    { title: "General", content:  <General placement={placement} profile={profile} /> },
    { title: "Documents", content: <Documents placement={placement[0]} profile={profile} /> },
    { title: "Work Location", content: <WorkLocation placement={placement[0]} profile={profile} /> },
    { title: "TimeSheet Details", content:<TimeSheetDetails placement={placement[0]} profile={profile} /> },
    { title: "Payments", content: <Payments placement={placement[0]} profile={profile} /> },
    { title: "Client Details", content:  <ClientDetails placement={placement[0]} profile={profile} /> },
    { title: "Invoices", content:  <Invoices placement={placement[0]} profile={profile} /> },
    { title: "Recruitment Details", content:  <RecruitmentDetails placement={placement[0]} profile={profile} /> },
    { title: "Expense Details", content:  <ExpenseDetails placement={placement[0]} profile={profile} /> },
  ];
  return (
    <Container>
              <Header style={{backgroundColor:'white'}}>
          <Left>
            <Button transparent onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" style={{color: '#62B1F6'}}  />
            </Button>
          </Left>
          <Body> 
          </Body>
          <Right>
          </Right>
        </Header>
    <View>
    <List>
        <ListItem avatar noBorder>
        <Left>
        <View>
            {
              profile.photoURL ?  <Avatar.Image   source={{uri: profile.photoURL}} size={60} /> : <Avatar.Text label={profile.name[0]}  size={65} />
            }
            </View>
        </Left>
          <Body>
            <View >
            <Text style={{fontSize:16,fontWeight:'700'}} >{Capitalize(profile.name)}</Text>
            <Caption style={{marginTop:3,fontSize:14,fontWeight:'400',color:'#5cb85c'}}>{Capitalize(profile.status)}</Caption>
            <Text style={{fontSize:14,marginTop:3,color:'#62B1F6'}}>{profile.companyID}</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:' + profile.email) }>
            <Text style={{fontSize:14,marginTop:3,color:'#62B1F6',textDecorationLine: 'underline'}}>{profile.email}</Text>
            </TouchableOpacity>
            </View>
          </Body>
        </ListItem>
      </List>
     
    </View>
    <Content padder style={{marginTop: 20}}>
          <Accordion dataArray={dataArray}  contentStyle={{ backgroundColor: "white" }} renderHeader={_renderHeader} animation={true} expanded={0}/>
          </Content>
  </Container>
  );
}

export default Presentation;