import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  Dimensions,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import { isLoaded } from "react-redux-firebase"
import { Container, Header, Input, List, ListItem, Left, Body, Right, Thumbnail ,Button,Icon} from 'native-base';
import validate from "../../../../shared/validation"
import MetaInfo from "../../../../shared/getMetaInfo"


function Presentation(props) {
  const { listAll, access_modules, employeeID, deductions, onPressEdit } = props
  const metaInfo = new MetaInfo()
  let advanceList = ["Advance", "Premium", "Miscellaneous"]
  let deductList = ["Per Paycheque", "Per Bi-Paycheque"]
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  let data = []

  deductions &&
    deductions.forEach((item) => {
      data.push({
        id: item.id,
        employeeID: item.employeeID,
        advanceType: advanceList.indexOf(item.advanceType),
        givendate: validate.dateFormatter(item.givendate),
        effectivefrom: validate.dateFormatter(item.effectivefrom),
        deductPer: deductList.indexOf(item.deductPer),
        chequeNumber: item.chequeNumber,
        remainingBalance: validate.currencyFormatterUs(item.remainingBalance),
        amountTobeDeducted: validate.currencyFormatterUs(
          item.amountTobeDeducted
        ),
        advance: validate.currencyFormatterUs(item.amount),
        notes: item.notes,
        imageURL: metaInfo.getImage(item.employeeID),
        employeeName: metaInfo.emailToName(item.employeeID),
      })
    })

  let sortedData = []

  const AdvanceType =(type) => {
    switch (type) {
      case 0: return "Advance"
      case 1: return "Premium"
      case 2: return "Miscellaneous"
        default:
          return type
      }
    } 
    const DedType =(type) => {
      switch (type) {
        case 0: return "Per Paycheque"
        case 1: return "Per Bi-Paycheque"
      
          default:
            return type
        }
      } 

  if (listAll) {
    sortedData = data.map((item) => item)
  } else {
    sortedData = data.filter((item) => item.employeeID === employeeID)
  }
  const KEYS_TO_FILTERS = [
    'employeeName',
    'advanceType',
    'givendate',
    'chequeNumber',
    'deductPer',
    'remainingBalance',
  ];
  const filteredData = sortedData.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  if(isLoaded(deductions))
  return (
    <Container>
       {!visible ? (
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Deductions</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
      ) : null}

      <View>
        {visible ? (
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <View>
                <Input
                  placeholder="Search..."
                  autoFocus
                  onChangeText={(term) => {
                    searchUpdated(term);
                  }}
                  placeholderTextColor="grey"
                  style={{width: windowWidth - 100}}
                />
              </View>
            </Body>
            <Right />
          </Header>
        ) : null}
      </View>
      {
        sortedData.length ?  
        <FlatList
        data={filteredData}
        renderItem={({item}) => {
          return (
              <List>
                <ListItem avatar>
                  <Left>
                  <Thumbnail
                    small
                    source={{uri: item.imageURL}}
                  />
                  </Left>
                  <Body>
                    <TouchableOpacity>
                      <Title
                        style={{color: '#3F51B5', fontSize: 14}}
                        mode="text">
                        {item.employeeName.toUpperCase()}
                      </Title>
                    </TouchableOpacity>
  
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text>Advance Type</Text>
                        <Text>Given Date</Text>
                        <Text>Deduction Effective from</Text>
                        <Text>Deduct Per</Text>
                        <Text>Cheque Number</Text>
                        <Text>Remaining Balance</Text>
                        <Text>Deduction Amount</Text>
                        <Text>Advance</Text>
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{AdvanceType(item.advanceType)}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.givendate}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.effectivefrom}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{DedType(item.deductPer)}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.chequeNumber}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.remainingBalance}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.amountTobeDeducted}</Text>
                         <Text style={{left:10 , color:'#7d7d7d'}}>{item.advance}</Text>
                      </View>
                    </View>
                  </Body>
                </ListItem>
              </List>
           
          );
        }}
      /> : 
      <View>
        <Text style={{alignSelf: 'center',marginTop:'50%'}}>No data</Text>
      </View>
      }
   
  </Container> 
  )
  return (<Spinner visible={true} />)
}

export default Presentation
