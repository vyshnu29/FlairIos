import React from 'react';
import {
  Avatar,
  Title,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
  Text,
  RefreshControl,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {createFilter} from 'react-native-search-filter';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Card,
} from 'native-base';
import MetaInfo from '../../../../shared/getMetaInfo';

function Presentation(props) {
  const {employeelist, searchTerm, isLoading} = props;
  const metaInfo = new MetaInfo();

  const makeCall = (res) => {
    console.log('gd', res);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + `${res}`;
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  const DepartmentType = (type) => {
    switch (type) {
      case 0:
        return 'Java';
      case 1:
        return 'DevOps/Cloud';
      case 2:
        return 'Networking/Security';
      case 3:
        return 'Python';
      case 4:
        return 'QA';
      case 5:
        return '.Net';
      case 6:
        return 'Data Science';
      case 7:
        return 'Big Data';
      case 8:
        return 'CRM';
      case 9:
        return 'Legal';
      case 10:
        return 'HR';
      case 11:
        return 'Accounts';
      case 12:
        return 'Bench sales';
      default:
        return type;
    }
  };

  const BranchType = (type) => {
    switch (type) {
      case 0:
        return 'ATL';
      case 1:
        return 'NJ';
      case 2:
        return 'NC';
      case 3:
        return 'FL';
      case 4:
        return 'DAL';
      case 5:
        return 'AUS';
      case 6:
        return 'SA';
      case 7:
        return 'VA';
      case 8:
        return 'STL';
      case 9:
        return 'MN';
      case 10:
        return 'CA-N';
      case 11:
        return 'CA';
      case 12:
        return 'SFO';
      case 13:
        return 'OH';
      case 14:
        return 'GVRM-IND';
      default:
        return type;
    }
  };
  const StatusType = (type) => {
    switch (type) {
      case 0:
        return 'Bench';
      case 1:
        return 'Working';
      case 2:
        return 'Training';
      default:
        return type;
    }
  };
  const statusType = (type) => {
    switch (type) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
      case 2:
        return 'Suspended';
      default:
        return type;
    }
  };

  let data = [];
  employeelist.length &&
    employeelist.forEach((employee) => {
      if (employee.status !== 'inactive')
        data.push({
          name: employee.personal.firstname + ' ' + employee.personal.lastname,
          email: employee.email,
          phone: employee.personal.phonenumber,
          branch: branchList.indexOf(employee.personal.branch),
          employeeid: employee.uid,
          reportingmanager: metaInfo.emailToName(
            employee.personal.reportingmanager,
          ),
          employeestatus: employeeStatusList.indexOf(
            employee.personal.employeestatus,
          ),
          usertype: employee.Role,
          jobtitle: employee.personal.jobtitle,
          department: departmentList.indexOf(employee.personal.department),
          status: statusList.indexOf(employee.status),
          image: employee.imageURL,
        });
      else
        data.push({
          name: employee.personal.firstname + ' ' + employee.personal.lastname,
          email: employee.email,
          phone: employee.personal.phonenumber,
          branch: branchList.indexOf(employee.personal.branch),
          status: statusList.indexOf(employee.status),
        });
    });

  const KEYS_TO_FILTERS = ['name', 'email', 'phone', 'branch', 'status'];
  const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const Item_SIZE = AVATAR_SIZE + SPACING * 3;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  if (!isLoading)
    return (
      <View style={{backgroundColor: '#e7e7e7', flex: 1}}>
        {data.length ? (
          <Animated.FlatList
            contentContainerStyle={{
              padding: SPACING,
             // paddingTop:  33,
            }}
            data={filteredInfo}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={(item) => item.employeeid}
            renderItem={({item, index}) => {
              const inputRange = [
                -1, 
                0, 
                Item_SIZE * index, 
                Item_SIZE * (index + 2)];
                const opacityRange = [
                  -1, 
                  0, 
                  Item_SIZE * index, 
                  Item_SIZE * (index + .5)];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange : opacityRange,
                outputRange: [1, 1, 1, 0],
              });
              return (
                <Animated.View style={{
                  elevation:.9,
                  // elevationRadius:20,
                  opacity,
                  padding:SPACING,marginBottom:SPACING,backgroundColor:'rgba(255, 255, 255,1)',borderRadius:12, flexDirection:'row',transform: [{scale}]}}>
                  {item.image ? (
                    <Image
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight : SPACING/2
                      }}
                      source={{uri: item.image}}
                    />
                  ) : (
                    <View style={{paddingRight:5}}>
                    <Avatar.Text
                      size={63}
                      
                      label={item.name[0]}
                      style={{backgroundColor: '#2970ff'}}
                    />
                    </View>
                  )}

                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('EmployeeProfileMenu', {
                          ID: item.employeeid,
                        });
                      }}>
                      <Text
                        style={{
                          color: '#62B1F6',
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        makeCall(item.phone);
                      }}>
                      <Text
                        style={{fontSize:14,opacity:.7}}>
                        {item.phone}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Linking.openURL('mailto:' + item.email)}>
                      <Text
                        style={{fontSize:14,opacity:.8}}>
                        {item.email.trim()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            }}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: '50%'}}>
            <Text>No Data</Text>
          </View>
        )}
      </View>
    );
  return <Spinner visible={true} />;
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
    letterSpacing: -0.2,
    paddingTop: 8,
  },
  mainTextContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    bottom: 15,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius: 50,
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: 'grey',
    marginLeft: 55,
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

export default Presentation;

export const branchList = [
  'ATL',
  'NJ',
  'NC',
  'FL',
  'DAL',
  'AUS',
  'SA',
  'VA',
  'STL',
  'MN',
  'CA-N',
  'CA',
  'SFO',
  'OH',
  'GVRM-IND',
];

export const departmentList = [
  'Java',
  'DevOps/Cloud',
  'Networking/Security',
  'Python',
  'QA',
  '.Net',
  'Data Science',
  'Big Data',
  'CRM',
  'Legal',
  'HR',
  'Accounts',
  'Bench sales',
];

export const employeeStatusList = ['Bench', 'Working', 'Training'];

export const statusList = ['inactive', 'active', 'suspended'];