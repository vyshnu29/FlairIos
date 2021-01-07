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
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List,Input, ListItem, Left, Body, Right, Thumbnail,Button,Icon } from 'native-base';
import SearchInput, {createFilter} from 'react-native-search-filter';
import { JSutils } from "../../../../shared/JSutils"
import validation from "../../../../shared/validation"
import MetaInfo from '../../../../shared/getMetaInfo'


function Presentation(props) {
  const { state, modules, calcDate, getDateDifference } = props
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  const metaObj = new MetaInfo()
  const data = !state.payrolls.isLoading ? Object.values(state.payrolls.data).map(item => {
    const { payrollDetails, netPayDetails, deductionDetails, bonusDetails, employeeID, DPH, FPH, dealPeriodDetails } = item
    const dealPending = getDateDifference(new Date(payrollDetails.endDate), new Date(dealPeriodDetails.endDate))
    return {
      payrollDuration: validation.dateFormatter(payrollDetails.startDate) + "-" + validation.dateFormatter(payrollDetails.endDate),
      fixedPay: item.netPayDetails.fixedPay.toFixed(2),
      totalWorkingHours: JSutils._sum(Object.values(item.payrollDetails.totalWorkHours)),
      grossSalary: netPayDetails.grossSalary.toFixed(2),
      deductionAmount: deductionDetails.totalDeducted.toFixed(2),
      payBonus: bonusDetails.payBonusAmount.toFixed(2),
      cumulativeBonus: bonusDetails.remainingCumulativeBonusAmount.toFixed(2),
      bonusObtained: bonusDetails.bonusObtained.toFixed(2),
      insurance: netPayDetails.insuranceAmount.toFixed(2),
      remainingTotalDeductionAmount: deductionDetails.remainingTotalDeductionAmount.toFixed(2),
      expenseAmount: netPayDetails.expenseAmount.toFixed(2),
      netPay: netPayDetails.netPay.toFixed(2),
      employeeID: employeeID,
      employeeName: metaObj.emailToName(employeeID),
      payRate: DPH > 0 ? DPH.toFixed(2) : JSutils._sum(Object.values(FPH)).toFixed(2),
      dealPending: dealPeriodDetails.endDate ? dealPending >= 0 ? dealPending : "Completed" : "Not started"
    }
  }) : []
  const KEYS_TO_FILTERS = [
    'payrollDuration',
    'fixedPay',
    'totalWorkingHours',
    'grossSalary',
    'deductionAmount',
    'payBonus',
    'cumulativeBonus',
    'bonusObtained',
    'netPay',
    'employeeName',
  ];
  const filtered = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
if(!state.payrolls.isLoading)
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
            <Title style={{color: 'white'}}>Payrolls</Title>
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
    <FlatList
      data={filtered}
      renderItem={({item}) => {
        return (
        
            <List>
              <ListItem avatar>
               
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
                      <Text>Duration</Text>
                      <Text>Hrs</Text>
                      <Text>Pay Rate</Text>
                      <Text>Gross</Text>
                      <Text>Fixed Pay</Text>
                      <Text>Bonus</Text>
                      <Text>Cummulative Bonus</Text>
                      <Text>Pay Bonus</Text>
                      <Text>Expenses</Text>
                    </View>
                 
                    <View style={{flexDirection: 'column'}}>
          
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.payrollDuration}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.totalWorkingHours}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.payRate}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.grossSalary}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.fixedPay}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.bonusObtained}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.cumulativeBonus}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.payBonus}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.expenseAmount}</Text>

                    </View>
                  </View>
                </Body>
              </ListItem>
            </List>
         
        );
      }}
    />
  </Container> 
  )
  return (<Spinner visible={true} />)
}

export default Presentation
