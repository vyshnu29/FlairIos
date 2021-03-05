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
  Linking,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import styles from '../../styles/table';
import Clock from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { isLoaded } from "react-redux-firebase"
import { Container, Header,Card, Input, List, ListItem, Left, Body, Right, Thumbnail ,Button,Icon} from 'native-base';
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
        <Header style={styles.Header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" style={styles.HeaderIcons}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.HeaderTitle}>Deductions</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" style={styles.HeaderIcons} />
            </Button>
          </Right>
        </Header>
      ) : null}

      <View>
        {visible ? (
          <Header style={styles.Header}>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="arrow-back" style={styles.HeaderIcons}/>
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
            <View>
            <Card style={styles.container}>
              <View style={styles.labelContainer}>
                <View style={styles.mainTextContainer}>
                  <View>
                    <Title
                      style={{
                        color: '#62B1F6',
                        fontSize: 17,
                        fontWeight: '400',
                        bottom: 5,
                      }}>
                      {metaInfo.toNameCase(item.employeeName)}
                    </Title>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    top: 10,
                    backgroundColor:'#f5f5f5',
                  }}>
                  <View>
                    <Text style={[styles.labelText1]}>{item.chequeNumber}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View>
                    <View>
                      <Text style={styles.authorName}>
                        Given Date : {item.givendate}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{paddingTop: 5}}>
                      <Text style={styles.authorName}>
                        Effective From : {item.effectivefrom}
                      </Text>
                    </View>
                  </View>
                  {/* <View>
                    <View style={{paddingTop: 5}}>
                      <Text style={styles.authorName}>
                      {AdvanceType(item.advanceType)}
                      </Text>
                    </View>
                  </View> */}
                </View>
                <TouchableOpacity style={{top:5,right:6}} onPress={() => {Linking.openURL(item.url)}}>
                  <Clock name='file-text' size={20} color="#62B1F6"  />
                </TouchableOpacity>
              </View>
              <ListItem/>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15}}>
             <View>
             <Text style={{fontSize:14,color:'#62b1f6'}}>{item.advance}</Text>
             <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>advance</Text>
             </View>
             <View>
             <Text style={{fontSize:14,color:'#62b1f6'}}>{item.remainingBalance}</Text>
             <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>remaining</Text>
             </View>
             <View>
             <Text style={{fontSize:14,color:'#62b1f6'}}>{item.amountTobeDeducted}</Text>
             <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>deduction</Text>
             </View>
           </View>
            </Card>
          </View>
           
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
