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
  TouchableOpacity, Text
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import validation from "../../../../../shared/validation"
import MetaInfo from "../../../../../shared/getMetaInfo"
import { TimesheetsUTILS } from "../../../../../shared/JSutils";
import {createFilter} from 'react-native-search-filter';

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
            <List>
              <ListItem avatar>
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
                      <Text>Client Name</Text>
                      <Text>Duration</Text>
                      <Text>Status</Text>
                      <Text>Submitted on</Text>
                      <Text>Hrs</Text>
                      <Text>Total Billable Hrs</Text>
                      {/* <Text>Attached File</Text> */}
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.clientName}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.duration}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.status}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.submittedOn}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.hours}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.totalBillableHours}</Text>
                      {/* <Text>{item.customFileName}</Text> */}
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
  return (<ActivityIndicator style={{marginTop:'50%'}}/>)
}

export default Presentation
