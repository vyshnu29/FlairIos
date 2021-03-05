import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import styles from '../../styles/table'
import {
  View,
 Dimensions,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Card, List,Input, ListItem, Left, Body, Right, Thumbnail,Button,Icon } from 'native-base';
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
            <Title style={styles.HeaderTitle}>Payrolls</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" style={styles.HeaderIcons}/>
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
                <Icon name="arrow-back" style={styles.HeaderIcons} />
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
                    {metaObj.toNameCase(item.employeeName)}
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
                  <Text style={[styles.labelText1]}>{item.totalWorkingHours} Hrs</Text>
                </View>
              </View>
            </View>
           
              <View>
                  <View style={{paddingTop:10}}>
                    <Text style={styles.authorName}>
                    {item.payrollDuration}
                    </Text>
                  </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5}}>
                  <View>
                    <Text style={styles.authorName}>
                      Pay Rate : {item.payRate}
                    </Text>
                  </View>
                  <View style={{paddingRight:25}}>
                    <Text style={styles.authorName}>
                      Gross Salary : {item.grossSalary}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5}}>
                  <View>
                    <Text style={styles.authorName}>
                    Fixed Pay : {item.fixedPay}
                    </Text>
                  </View>
                  <View style={{paddingRight:25}}>
                    <Text style={styles.authorName}>
                      Expenses : {item.expenseAmount}
                    </Text>
                  </View>
                </View>

              </View>
           
            
            <ListItem/>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15}}>
           <View>
           <Text style={{fontSize:14,color:'#62b1f6'}}>{item.bonusObtained}</Text>
           <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>Bonus</Text>
           </View>
           <View>
           <Text style={{fontSize:14,color:'#62b1f6'}}>{item.cumulativeBonus}</Text>
           <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>Cummulative Bonus</Text>
           </View>
           <View>
           <Text style={{fontSize:14,color:'#62b1f6'}}>{item.payBonus}</Text>
           <Text style={{fontSize:10,fontWeight:'300',color:'grey',alignSelf:'center'}}>Pay Bonus</Text>
           </View>
         </View>
          </Card>
        </View>
         
        );
      }}
    />
  </Container> 
  )
  return (<Spinner visible={true} />)
}

export default Presentation
