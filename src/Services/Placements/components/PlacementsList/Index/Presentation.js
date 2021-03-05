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
import styles from '../../../styles/PlacementTableStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Card,
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
              <Title style={styles.HeaderTitle}>Placements</Title>
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
        { visible ? (
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
      <FlatList
      bounces={false}
        data={filteredEmails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          console.log("sS",item.startDate)
          return (
            <Card style={styles.container} noShadow>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PlacementsView', {
                  id: item.empCode,
                  docId: item.id,
                });
              }}
              activeOpacity={0.95}> 
              <View style={styles.labelContainer}>
              <View style={styles.mainTextContainer}>
                  <Text  style={{
                            color: '#62B1F6',
                            fontSize: 17,
                            fontWeight: '400',
                            bottom: 5,
                          }}>{item.name}</Text>
                </View>
                <>
                {item.status === 0 ? (
                  <View style={{borderRadius: 16, backgroundColor: '#21ba45'}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PlacementsView', {
                          id: item.empCode,
                          docId: item.id,
                        });
                      }}>
                      <Text style={styles.labelText1}>
                        {item.placementID.toString()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{borderRadius: 16, backgroundColor: '#f0ad4e'}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PlacementsView', {
                          id: item.empCode,
                          docId: item.id,
                        });
                      }}>
                      <Text style={styles.labelText1}>
                        {item.placementID.toString()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                </>
                
              </View>
              <View style={styles.authorWrapper}>
                <TouchableOpacity
                  style={styles.authorContainer}
                  onPress={() => {
                    props.navigation.navigate('PlacementsView', {
                      id: item.empCode,
                      docId: item.id,
                    });
                  }}>
                  <View style={styles.footerContainer}>
                  <Text style={styles.authorName1}>
                  {item.jobTitle}
                    </Text>
                    <Text style={styles.authorName}>
                      {item.startDate + '   |   ' + item.projectEndDate}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.authorBlankContainer} />
              </View>
            </TouchableOpacity>
</Card>
     
          );
        }}
      />
      </Container>
    );
  return <Spinner visible={true} />;
}

export default Presentation;
