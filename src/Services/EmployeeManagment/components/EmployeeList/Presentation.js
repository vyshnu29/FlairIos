import React from 'react'
import {
  Avatar,
  Title,
TouchableRipple,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  StyleSheet,
  FlatList,
  Text ,
  RefreshControl,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {createFilter} from 'react-native-search-filter';
import { Container, Header, Card, List, ListItem, Left, Body, Right, Thumbnail,Button} from 'native-base';
import MetaInfo from "../../../../shared/getMetaInfo"


function Presentation(props) {
  const {
    employeelist,
    searchTerm,
    isLoading,
  } = props
  const metaInfo = new MetaInfo()
  
  const makeCall = (res) => {
    console.log("gd",res);
    let phoneNumber = '';
  
      if (Platform.OS === 'ios') {
        phoneNumber = 'telprompt:' + `${res}`
      } else {
        phoneNumber = 'tel:' + `${res}`;
      }
  
      Linking.openURL(phoneNumber);
    }
  
  const DepartmentType =(type) => {
    switch (type) {
      case 0: return "Java"
      case 1: return "DevOps/Cloud"
      case 2: return "Networking/Security"
      case 3: return "Python"
      case 4: return "QA"
      case 5: return ".Net"
      case 6: return "Data Science"
      case 7: return "Big Data"
      case 8: return "CRM"
      case 9: return "Legal"
      case 10: return "HR"
      case 11: return "Accounts"
      case 12: return "Bench sales"
        default:
          return type
      }
    }  

    const BranchType =(type) => {
      switch (type) {
        case 0: return "ATL"
        case 1: return "NJ"
        case 2: return "NC"
        case 3: return "FL"
        case 4: return "DAL"
        case 5: return "AUS"
        case 6: return "SA"
        case 7: return "VA"
        case 8: return "STL"
        case 9: return "MN"
        case 10: return "CA-N"
        case 11: return "CA"
        case 12: return "SFO"
        case 13: return "OH"
        case 14: return "GVRM-IND"
          default:
            return type
        }
      }  
    const StatusType =(type) => {
      switch (type) {
        case 0: return "Bench"
        case 1: return "Working"
        case 2: return "Training"
          default:
            return type
        }
      } 
      const statusType =(type) => {
        switch (type) {
          case 0: return "Inactive"
          case 1: return "Active"
          case 2: return "Suspended"
            default:
              return type
          }
        } 

  let data = []
  employeelist.length &&
    employeelist.forEach((employee) => {
      if (employee.status !== "inactive")
        data.push({
          name: employee.personal.firstname + " " + employee.personal.lastname,
          email: employee.email,
          phone: employee.personal.phonenumber,
          branch: branchList.indexOf(employee.personal.branch),
          employeeid: employee.uid,
          reportingmanager: metaInfo.emailToName(employee.personal.reportingmanager),
          employeestatus: employeeStatusList.indexOf(employee.personal.employeestatus),
          usertype: employee.Role,
          jobtitle: employee.personal.jobtitle,
          department: departmentList.indexOf(employee.personal.department),
          status: statusList.indexOf(employee.status),
          image:employee.imageURL
        })
      else
        data.push({
          name: employee.personal.firstname + " " + employee.personal.lastname,
          email: employee.email,
          phone: employee.personal.phonenumber,
          branch: branchList.indexOf(employee.personal.branch),
          status: statusList.indexOf(employee.status),
        })
    })
    

    const KEYS_TO_FILTERS = [
      'name',
      'email',
      'phone',
      'branch',
      'status',
    ];
    const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
if(!isLoading)
  return (
    <Container>
      {
          data.length ? 
      <FlatList
      data={filteredInfo}
      keyExtractor={item => item.employeeid}
      renderItem={({item}) => {
        console.log("Ss",item.image)
        return (
          <Card   style={styles.container} noShadow>
          <TouchableOpacity
          activeOpacity={0.95}
        >
          <View style={styles.mainTextContainer}>
            {
              item.image ?
              <Avatar.Image
              size={45}
              style={{top:10}}
                    source={{uri: item.image}}
                  />: <Avatar.Text
                  size={45}
                  style={{top:10}}
                  label={item.name[0]}
                  style={{backgroundColor: "#2970ff"}}
                />
            } 
           
           <View style={{alignSelf:'center',marginLeft:25}}>
           <TouchableOpacity onPress={() => {props.navigation.navigate('EmployeeProfileMenu',{ID:item.employeeid})}}>
            <Text  style={{
                            color: '#62B1F6',
                            fontSize: 17,
                            fontWeight: '400',
                            bottom: 5,
                          }}>{item.name}</Text>
                          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {makeCall(item.phone)}}>
          <Text style={{color:'grey',fontSize:13,paddingTop:7}}>{item.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => Linking.openURL('mailto:' + item.email) }>
          <Text style={{color:"grey",fontSize:12}}>{item.email.trim()}</Text>
          </TouchableOpacity>
        </View>
          </View>
         
        </TouchableOpacity>
        </Card>
        );
      }}
    /> :
     <View style={{alignItems: 'center',marginTop:'50%'}}>
       <Text>No Data</Text>
    </View>
      }
    
  </Container> 
  )
  return (<Spinner visible={true} />)
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width:'98%',
   elevation:0,
    backgroundColor: 'white',
    borderRadius: 16,
    alignSelf:'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelTextContainer: {
    backgroundColor: 'rgb(246,245,248)',
    borderRadius: 16,
  },
  labelText: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgb(71,71,71)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    
  },
  labelText1: {
    fontSize: 12,
    lineHeight: 16,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4, 
  },
  labelContainer1: {
    flexDirection: 'row',
    marginBottom:10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    shadowColor: 'rgb(35,35,35)',
    shadowOffset: {
      width: 0,
      heght: 2,
    },
    shadowRadius: 32,
    shadowOpacity: 0.016,
    backgroundColor: 'rgb(246,245,248)',
   // width: 56,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  number: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 20,
    
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
    letterSpacing: -0.2,
    paddingTop: 8,
    
  },
  mainTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footerContainer: {
    flexDirection: 'row',
    bottom:15,
   // justifyContent: 'flex-start',
   // alignItems: 'center',
   // paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius:  50
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: "grey",
    marginLeft:55
  },
  authorWrapper: {
    flexDirection: 'row',
  },
  authorContainer: {
    paddingRight: 40,
  },
  authorBlankContainer: {
    width: '38%',
  },
  iconCardElement: {
    paddingLeft: 8,
  },
});

export default Presentation








export const branchList = [
  "ATL",
  "NJ",
  "NC",
  "FL",
  "DAL",
  "AUS",
  "SA",
  "VA",
  "STL",
  "MN",
  "CA-N",
  "CA",
  "SFO",
  "OH",
  "GVRM-IND",
];

export const departmentList = [
  "Java",
  "DevOps/Cloud",
  "Networking/Security",
  "Python",
  "QA",
  ".Net",
  "Data Science",
  "Big Data",
  "CRM",
  "Legal",
  "HR",
  "Accounts",
  "Bench sales",
];

export const employeeStatusList = ["Bench", "Working", "Training"];

export const statusList = ["inactive", "active", "suspended"];
