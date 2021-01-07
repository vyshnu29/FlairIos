import React from 'react';
import {Avatar, Title, ActivityIndicator} from 'react-native-paper';
import {
  View,
  Dimensions,
  Linking,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Badge,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Input,
  Button,
  Icon,
} from 'native-base';
import validate from '../../../../../shared/validation';
import MetaInfo from '../../../../../shared/getMetaInfo';
import SearchInput, {createFilter} from 'react-native-search-filter';
function Presentation(props) {
  const {
    clientView,
    listAll,
    employeeId,
    clientId,
    placementsList,
    placementsDocuments,
    placementsPayments,
    deletePlacement,
  } = props;
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const metaInfo = new MetaInfo();

  let sortedData = [];
  if (listAll) {
    sortedData = placementsList;
  } else if (clientView) {
    sortedData = placementsList.filter((item) => item.clientId === clientId);
  } else {
    sortedData = placementsList.filter(
      (item) => item.employeeID === employeeId,
    );
  }
  const statusList = ['Active', 'Inactive'];
  const categoryList = ['--', 'W2', 'C2C'];
  let data = sortedData.map((placement) => {
    let documents;
    if (Array.isArray(placementsDocuments)) {
      let temp = placementsDocuments.filter(
        (doc) => doc.placementID === placement.placementID,
      );
      if (temp.length) {
        documents = temp[0].documents;
      }
    }
    let paymentsData;
    if (Array.isArray(placementsPayments)) {
      let temp = placementsPayments.filter(
        (doc) => doc.placementID === placement.placementID,
      );
      if (temp.length) {
        paymentsData = temp[0].data[temp[0].data.length - 1];
      }
    }
    return {
      empCode: placement.employeeID,
      imageURL: metaInfo.getImage(placement.employeeID),
      placementID: placement.placementID,
      clientId: placement.clientId,
      clientName: metaInfo.clientIdToName(placement.clientId),
      startDate: validate.dateFormatter(placement.startDate),
      endDate: validate.dateFormatter(placement.endDate),
      projectEndDate: validate.dateFormatter(placement.projectEndDate),
      createdAt: validate.dateFormatter(placement.createdAt),
      createdBy: metaInfo.emailToName(placement.createdBy),
      createdByEmail: placement.createdBy,
      status:
        new Date(placement.projectEndDate) < new Date()
          ? statusList.indexOf('Inactive')
          : statusList.indexOf('Active'),
      draft: placement.draft,
      id: placement.id,
      description: placement.description,
      fillableSections: placement.hasOwnProperty('fillableSections')
        ? placement.fillableSections
        : [],
      name: metaInfo.emailToName(placement.employeeID),
      poDoc: documents
        ? documents.filter((doc) => doc.documentType === 'PO')
          ? documents.filter((doc) => doc.documentType === 'PO')
          : []
        : [],
      jobTitle: placement.jobTitle,
      poNumber: paymentsData ? paymentsData.purchaseOrderNumber : '--',
      category:
        categoryList.indexOf(metaInfo.getCategory(placement.employeeID)) !== -1
          ? categoryList.indexOf(metaInfo.getCategory(placement.employeeID))
          : 0,
    };
  });

  const ConsultType = (type) => {
    switch (type) {
      case 0:
        return '--';
      case 1:
        return 'Employee';
      case 2:
        return 'Contracts';
      default:
        return type;
    }
  };
 

  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  const windowWidth = Dimensions.get('window').width;
  const KEYS_TO_FILTERS = [
    'category',
    'jobTitle',
    'clientName',
    'empCode',
    'clientId',
    'placementID',
    'startDate',
    'endDate',
    'projectEndDate',
    'createdAt',
    'createdBy',
    'createdByEmail',
    'status',
    'name'
    
  ];
  const filteredEmails = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  
  
    return (
      <Container>
        {!clientView && !visible ? (
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
              <Title style={{color: 'white'}}>Placements</Title>
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
        { visible ? (
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
          data={filteredEmails}
          keyExtractor={(item) => item.clientId}
          renderItem={({item}) => {
            console.log('aa', item.clientId);
            return (
              <List>
                <ListItem>
                  <Body>
                    <TouchableOpacity>
                      <Title
                        style={{color: '#3F51B5', fontSize: 14}}
                        mode="text">
                        {item.name.toUpperCase()}
                      </Title>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text>Consultant type</Text>
                        <Text>Job Title</Text>
                        <Text>Placement code</Text>
                        {!clientView ? <Text>Client</Text> : null}
                        <Text>Start Date</Text>
                        <Text>End Date</Text>
                        <Text>Status</Text>
                        <Text>PO Number</Text>
                        <Text>PO Document</Text>
                      </View>
                     
                      <View style={{flexDirection: 'column'}}>
                       <Text style={{left:10 , color:'#7d7d7d'}}>{ConsultType(item.category)}</Text>
                       <Text style={{left:10 , color:'#7d7d7d'}}>{item.jobTitle}</Text>
                        <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('PlacementsView', {
                                id: item.empCode, docId:item.id
                              });
                            }}>
                        <Text style={{color: '#21BA45',left:10}}>
                          {item.placementID.toString()}
                        </Text>
                        </TouchableOpacity>
                        {!clientView ? (
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('ViewClient', {
                                clientId: item.clientId,
                              });
                            }}>
                            <Text style={{color: '#62B1F6',left:10}}>
                              {item.clientName}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.startDate}</Text>
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.endDate}</Text>
                        {item.status === 0 ? (
                          <Text style={{color: '#21BA45',left:10}}>Active</Text>
                        ) : (
                          <Text style={{color: '#f0ad4e',left:10}}>Inactive</Text>
                        )}
                        <Text style={{left:10 , color:'#7d7d7d'}}>{item.poNumber}</Text>
                        {item.poDoc.map((obj) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                Linking.openURL(obj.work_doc.url);
                              }}>
                              <Text style={{color: '#62B1F6',left:10}}>
                                {obj.work_doc.name.substr(0, 20)}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </Body>
                </ListItem>
              </List>
            );
          }}
        />
      </Container>
    );
  return <Spinner visible={true} />;
}

export default Presentation;
