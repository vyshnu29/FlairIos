import React from "react"
import {
  Badge,
  Title,
  FAB,
  Text,
} from 'react-native-paper';
import ClientList from "../ClientList"
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
 
  ScrollableTab,
  Left,
  Button,
  Body,
  Input,
  Right
} from 'native-base';
import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default function TabsView(props) {
  const { data } = props
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  return (
    // <Container>
    //    {!visible ? (
    //   <Header>
    //       <Left>
    //         <Button transparent>
    //           <Icon
    //             name="arrow-back"
    //             onPress={() => {
    //               props.navigation.goBack();
    //             }}
    //           />
    //         </Button>
    //       </Left>
    //       <Body>
    //         <Title style={{color: 'white'}}>Client List</Title>
    //       </Body>
    //       <Right>
    //         <Button
    //           transparent
    //           onPress={() => {
    //             SetVisible(!visible);
    //           }}>
    //           <Icon name="search" />
    //         </Button>
    //         </Right>
    //       </Header>
    //        ) : null}
        
    //     {visible ? (
    //       <Header>
    //         <Left>
    //           <Button
    //             transparent
    //             onPress={() => {
    //               SetVisible(!visible);
    //             }}>
    //             <Icon name="arrow-back" />
    //           </Button>
    //         </Left>
    //         <Body>
    //           <View>
    //             <Input
    //               placeholder="Search..."
    //               autoFocus
    //               onChangeText={(term) => {
    //                 searchUpdated(term);
    //               }}
    //               placeholderTextColor="grey"
    //               style={{width: windowWidth - 100}}
    //             />
    //           </View>
    //         </Body>
    //         <Right />
    //       </Header>
    //     ) : null}
     
    //       <Tabs renderTabBar={() => <ScrollableTab />} >
    //       <Tab
    //       index={0}
    //         heading={
    //           <TabHeading >
    //              <Text style={{color:'white', fontSize:12}}>ACTIVE</Text>
    //         {/* <Badge style={{bottom: windowHeight / 60}}>{data.filter((item) => item.activeConsultants !== 0).length}</Badge> */}
    //             </TabHeading>
    //         }>
    //        <ClientList
    //        {...props}
    //        searchTerm={searchTerm}
    //       info={data.filter((item) => item.activeConsultants !== 0)}
    //     />
    //       </Tab>
    //       <Tab
    //       index={1}
    //         heading={
    //           <TabHeading>
    //             <Text style={{color:'white', fontSize:12}}>IN-ACTIVE</Text>
    //             {/* <Badge style={{bottom: windowHeight / 60}}>{data.filter((item) => item.activeConsultants === 0).length}</Badge> */}
    //           </TabHeading>
    //         }>
    //         <ClientList
    //         {...props}
    //         searchTerm={searchTerm}
    //       info={data.filter((item) => item.activeConsultants === 0)}
    //     />
    //       </Tab>
    //       <Tab
    //       index={2}
    //         heading={
    //         <TabHeading>
    //           <Text style={{color:'white', fontSize:12}}>ALL</Text>
    //           {/* <Badge style={{bottom: windowHeight / 60}}>{data.length}</Badge> */}
    //         </TabHeading>
    //         }>
    //        <ClientList  searchTerm={searchTerm} {...props} info={data} />
    //       </Tab>
         
    //     </Tabs>
        
    // </Container>
    <Container>
       {!visible ? (
      <Header>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Clients</Title>
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
     
          <Tabs renderTabBar={() => <ScrollableTab />} >
          <Tab
          index={0}
            heading={
              <TabHeading><Text style={{color:'white', fontSize:12}}>ACTIVE</Text>
                </TabHeading>
            }>
          <ClientList  searchTerm={searchTerm} {...props} info={data.filter((item) => item.activeConsultants !== 0)}/>
          </Tab>
          <Tab
          index={1}
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:12}}>IN-ACTIVE</Text>
               {/* <Badge style={{bottom:15}}>{approvedRanges}</Badge> */}
              </TabHeading>
            }>
            <ClientList  searchTerm={searchTerm} {...props} info={data.filter((item) => item.activeConsultants === 0)} />
          </Tab>
          <Tab
          index={2}
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:12}}>ALL</Text>
                {/* <Badge style={{bottom:15}}>{rejectedRanges}</Badge> */}
              </TabHeading>
            }>
            <ClientList  searchTerm={searchTerm} {...props} info={data} />
          </Tab>
          
            </Tabs>
    </Container>
  )
}
