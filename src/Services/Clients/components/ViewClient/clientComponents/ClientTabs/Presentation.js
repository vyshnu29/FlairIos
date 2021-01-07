import React from 'react';
import {Badge, Title, Divider, Avatar} from 'react-native-paper';
import { Text,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Icon, Accordion,  View,Button } from "native-base";
import ClientDetails from '../ClientDetails';
import ClientContacts from '../Contacts/Index/index'
import ClientsAccounts from '../Accounts/Index/index'
import Locations from "../Locations/Index"
import PlacementsList from "../../../../../Placements/components/PlacementsList/Index"
import Documents from "../Documents"
import Expenses from "../Expenses"


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
  const {client} = props;
  const [value, setValue] = React.useState(0);
  const dataArray = [
    { title: "Details", content: <ClientDetails client={client}/> },
    { title: "Contacts", content: <ClientContacts client={client}/> },
    { title: "Accounts", content: <ClientsAccounts client={client}/> },
    { title: "Locations", content: <Locations client={client}/> },
    { title: "Placements", content: <PlacementsList listAll={false} employeeId={null} {...props} clientView={true} clientId = {client.clientId}/> },
    { title: "Documents", content: <Documents clientId={client.clientId}/> },
    // { title: "Expenses", content: <Expenses clientId={client.clientId}  listAll={false} clientView={true}/> }
  ];

  return (
    <Container style={{marginTop:40}}>
        <Content padder>
          <Accordion dataArray={dataArray}  contentStyle={{ backgroundColor: "white" }} renderHeader={_renderHeader} animation={true} expanded={0}/>
          <Button toLowerCase full style={{backgroundColor:'#62B1F6'}} onPress={() => {props.navigation.navigate('ClientExpenses',{clientId : client.clientId})}}>
          <Text style={{color:"#fff",marginRight:'75%'}}>Expenses</Text>
          </Button>
        </Content>
      </Container>
  );
}

export default Presentation;
{/* <View style={{flex: 1}}>
      <Card style={{width: '95%', alignSelf: 'center'}}>
      <TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientDetails',{client: client})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row'}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Details</Text>
            </View>  
          </View>
        </CardItem>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientContacts',{client: client})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Contacts</Text>
            </View>
          </View>
        </CardItem>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientAccounts',{client: client})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Accounts</Text>
            </View>
          </View>
        </CardItem>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientLocations',{client: client})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Locations</Text>
            </View>
          </View>
        </CardItem>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => {props.navigation.navigate('Placements',{listAll: false,employeeId:null,clientView:true,clientId:client.clientId})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Placements</Text>
            </View>
          </View>
        </CardItem>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientDocuments',{clientId:client.clientId})}}>
        <CardItem header bordered>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#62B1F6'}}>Documents</Text>
            </View>
          </View>
        </CardItem>
        </TouchableOpacity>
      </Card>
    </View> */}


{
  /* <View style={{flex: 1}}>
<TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientDetails',{client: client})}}>
<Text>Details</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => {props.navigation.navigate('ViewClientContacts',{client: client})}}>
<Text>Contacts</Text>
</TouchableOpacity>
</View> */
}
