import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  FlatList,
  RefreshControl,
  Linking,
  TouchableOpacity, Text
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Card,Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import validation from "../../../../../shared/validation"
import MetaInfo from "../../../../../shared/getMetaInfo"
import { TimesheetsUTILS } from "../../../../../shared/JSutils";
import {createFilter} from 'react-native-search-filter';
import Clock from 'react-native-vector-icons/Feather';
import Date from 'react-native-vector-icons/Fontisto';
import styles from '../../../styles/entryTable';

function Presentation(props) {
  const { timesheets, loggedInEmployee, state, condition ,isLoaded ,searchTerm } = props;
  const metaInfo = new MetaInfo();
  const data =
    !state.isFetchingTimesheets && !state.isSettingsLoading
      ? state[condition].reduce((init, item) => {
        const {
          employeeID,
          clientId,
          placementID,
          id,
          isApproved,
          isDefaulter,
          isRejected,
          startDate,
          endDate,
          createdAt,
          workdetails,
          attachmentDetails,
          rejectedDetails,
          invoiceDetails
        } = item;
        const duration =
          validation.dateFormatter(startDate) +
          "-" +
          validation.dateFormatter(endDate);
        const name = metaInfo.getEmployeeKey(employeeID, "name");
        if (placementID in state.timesheetSettings)
          init.push({
            employeeID: employeeID,
            clientName: metaInfo.clientIdToName(clientId),
            clientId: clientId,
            placementID: placementID,
            timesheetID: id,
            isApproved: isApproved,
            isRejected: isRejected,
            isDefaulter: isDefaulter,
            isInvoiced: invoiceDetails.isInvoiced,
            duration,
            submittedOn: validation.dateFormatter(createdAt),
            hours: TimesheetsUTILS.calc_hours([
              ...workdetails.OTtime,
              ...workdetails.standardTime,
            ]),
            totalBillableHours: TimesheetsUTILS.getBillableHours(
              startDate,
              endDate
            ),
            attachedFile: attachmentDetails.publicURL,
            comment:
              "rejectedDetails" in item && "reason" in rejectedDetails
                ? rejectedDetails.reason
                : "",
            name,
            email: metaInfo.getEmployeeKey(employeeID, "email"),
            customFileName: `${name.replace(
              /\s/g,
              ""
            )}_${placementID}_${duration}`,
            timesheetManager: state.timesheetSettings[placementID].approvalBy,
            status: isDefaulter
              ? "--"
              : !isApproved && !isRejected
                ? "pending"
                : isApproved && !isRejected
                  ? "success"
                  : "rejected",
          });
        return init;
      }, [])
      : [];

  //console.log("Aao",data.length)
  const KEYS_TO_FILTERS = [
    'clientName',
    'name',
    'duration',
    'status',
    'hours',
    'totalBillableHours',
  ];
  const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
if(!state.isFetchingTimesheets || !state.isSettingsLoading)
  return (
    <Container>
    <FlatList
      data={filteredInfo}
      keyExtractor={(item, index) => {
        return item.timesheetID;
      }}
      renderItem={({item}) => {
        return (
          <View>
          <Card style={styles.container} noShadow>
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
                    {metaInfo.toNameCase(item.name)}
                  </Title>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 16,
                  top: 10,
                  backgroundColor:
                    item.status === 'success'
                      ? '#21ba45'
                      : item.status === 'pending'
                      ? '#f0ad4e'
                      : item.status === 'rejected'
                      ? '#d9534f'
                      : 'grey',
                }}>
                <View>
                  <Text style={[styles.labelText1]}>{item.clientId}</Text>
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
                      <Date name="date" color="#62B1F6" size={15}/>{' '} {item.duration}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{paddingTop: 5}}>
                    <Text style={styles.authorName}>
                      <Clock name="clock" color="#62B1F6" size={15} />{' '} {item.hours}{' '}
                      / {item.totalBillableHours} hrs
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{paddingTop: 5}}>
                    <Text style={styles.authorName}>
                      Submitted on : {item.submittedOn}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{top:35,right:6}} onPress={() => {Linking.openURL(item.attachedFile)}}>
                <Clock name='file-text' size={20} color="#62B1F6"  />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
         
        );
      }}
    />
  </Container> 
  )
  return (<ActivityIndicator style={{marginTop:'50%'}}/>)
}

export default Presentation
