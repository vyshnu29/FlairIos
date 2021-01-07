import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {createFilter} from 'react-native-search-filter';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import Validation from "../../../../../shared/getMetaInfo"
import { configuration } from "../../../../../config/companyConfig"
import HTMLView from 'react-native-htmlview';


function Presentation(props) {
  const validate = new Validation()
 
  const {
    state,
    condition,
    tabPair,
    searchTerm,
    reqLettersList,
    authorizedSignatures,
  } = props
  const { myReq } = props
  
  // const [state] = useContext(DataContext)
  const formatter = (date) => {
    let final = ""
    try {
      final = Intl.DateTimeFormat(
        configuration["date-code"],
        configuration.dateformat
      ).format(new Date(date))
    } catch (error) {
      console.log(error)
      final = date
    }
    return final
  }
  const data = Object.values(state[tabPair[condition]].data)
  let requests = []
  let letters = []
  let signatures = []
  try {
    requests = myReq ? data : data
    letters = reqLettersList
    signatures = authorizedSignatures
  } catch (error) {
    requests = []
    letters = []
    signatures = []
  }

  const ConsultType = (item) => {
    if (item.status === "Rejected") return <Title style={{color: '#d9534f', fontSize: 14,right:5 }}  mode="text"> {item.id.toUpperCase()} </Title>
    else if (item.status === "Approved")
      return <Title style={{color: '#5cb85c', fontSize: 14  ,right:5 }}  mode="text" > {item.id.toUpperCase()} </Title>
      return <Title style={{color: '#f0ad4e', fontSize: 14 ,right:5 }}  mode="text"> {item.id.toUpperCase()} </Title>
  };
  const reqContent = requests.map((request) => {
    return {
      requestid: request.id,
      subject: configuration.letterTypes.filter(
        (letter) =>
          letter.replace(/ /g, "").toLowerCase() === request.letterType
      )[0],
      description: request.description,
      timestamp: formatter(request.createdAt),
      status: request.isApproved
        ? "Approved"
        : request.isRejected
        ? "Rejected"
        : "Pending",
      id: request.id,
      employeename: validate.emailToName(request.employeeID),
      uid: request.employeeID,
      approvedDetails: request.approvedDetails ? request.approvedDetails : {},
      additionalDetails: request.additionalInformation,
      issuedBy: request.approvedDetails
        ? validate.emailToName(request.approvedDetails.approvedBy)
        : "",
      comment: request.hasOwnProperty("approvedDetails")
        ? request.approvedDetails.description
        : "",
      req_doc: request.attachmentDetails.publicURL,
    }
  })
  
  const KEYS_TO_FILTERS = [
    'employeename',
    'status',
    'issuedBy',
    'approvedDetails',
    ' timestamp',
  ];
  const filteredInfo = reqContent.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  return (
    <Container>
    <FlatList
      data={filteredInfo}
      renderItem={({item}) => {
        console.log('ppo',item)
        return (
        
            <List>
              <ListItem avatar>
                {/* <Left>
                  <Avatar.Text
                    size={55}
                    label={item.clientname[0].toUpperCase()}
                    style={{backgroundColor: '#c42053'}}
                  />
                </Left> */}
                <Body>
                <TouchableOpacity>
                  {
                    
                  ConsultType(item)
                  
                  }
                      
                    </TouchableOpacity>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text>Employee</Text>
                      <Text>Subject</Text>
                      <Text>Description</Text>
                      <Text>Timestamp</Text>
                      <Text>Issued By/Rejected By</Text>
                      <Text>Status</Text>
                    
                    </View>
                   
                    <View style={{flexDirection: 'column'}}>
          
                      <Text style={{left:10 , color: '#62B1F6'}}>{item.employeename}</Text>
                      <Text style={{left:10 , color:'#7d7d7d'}}>{item.subject}</Text>
                      <HTMLView value={item.description} style={{left:10 , color:'#7d7d7d'}} />
                       <Text style={{left:10 , color:'#7d7d7d'}}>{item.timestamp}</Text>
                       <Text style={{left:10 , color:'#7d7d7d'}}>{item.issuedBy ? item.issuedBy : '---'}</Text>
                       <Text style={{left:10 , color:'#7d7d7d'}}>{item.status}</Text>
                     

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