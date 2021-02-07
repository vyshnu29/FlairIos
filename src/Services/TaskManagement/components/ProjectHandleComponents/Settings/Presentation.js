import React, {Component, useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
 
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import Collapsible from 'react-native-collapsible';
import {
  Appbar,
  TouchableRipple,
} from 'react-native-paper';
import ProjectTable from '../../ReusableUi/ProjectTable'
import ActiveMembers from '../../ActiveMembers/index'
import validate from '../../../../../shared/validation';
import {
  Title,
  Text,
  Container,
  Button,
  Header,
  Left,
  Right,
  List,
  Icon,
  ListItem,
  Body,
} from 'native-base';
import UserShield from 'react-native-vector-icons/FontAwesome5';
import TimelineIcon from 'react-native-vector-icons/MaterialIcons';
import LabelIcon from 'react-native-vector-icons/MaterialIcons';
import MetaInfo from '../../../../../shared/getMetaInfo';
function Presentation(props) {
  const {
    handleEmployees,
    onAddMembers,
    isAdded,
    employees,
    project,
    projectId,
  } = props;
  const metaInfo = new MetaInfo();
  const [collapsed, setcollapsed] = React.useState(true);
  let isCountExceeded = false;
  let assignees = [];
  assignees = Object.values(project[0].Users);
  let supervisorCount = 0;
  assignees.forEach((employee) => {
    if (metaInfo.checkSupervisor(employee.uid)) supervisorCount++;
  });
  employees.forEach((item) => {
    if (item.isSupervisor) supervisorCount++;
  });
  if (supervisorCount > 1) {
    isCountExceeded = true;
  }

  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Container>
      <Header style={{backgroundColor: '#3F51B5'}} androidStatusBarColor="#000">
      <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name= "chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
        <Body style={{right:90}}>
          <Title style={{color:'white',fontSize:18}}>
          Project Settings
          </Title>
        </Body>
      
      </Header>
     <ProjectTable {...props} item={project[0]}/>
      <ScrollView style={{flexDirection: 'column', padding: 10}}>
        <TouchableRipple
          onPress={() => {toggleExpanded()}}
          centered={true}
          rippleColor="#edebeb">
          <View style={{flexDirection: 'row', margin: 15}}>
            <UserShield
              name="user-cog"
              size={20}
              style={{
                color: '#3F51B5',
              padding:6
              }}
            />
            <Text
              style={{fontSize: 16, marginLeft: 20, fontWeight: '500', top: 5}}>
              General Settings
            </Text>
          </View>
        </TouchableRipple>
        <Collapsible collapsed={collapsed}>
          <View style={{margin:5}}>
        <ActiveMembers
         projectMembers={
          assignees && assignees.map((employee) => employee.uid)
        }
        isAdded={isAdded}
        projectID={project[0].id}
        inProject={true}
        handleEmployeesDefault={handleEmployees}
        />
        <Button
        onPress={onAddMembers}
        disabled={employees.length && !isCountExceeded ? false : true}
        style={{height:30,alignSelf:'flex-end'}}>
            <Text>Add Selected</Text>
          </Button>
          </View>
          </Collapsible>
        <TouchableRipple
          onPress={() => {
            props.navigation.navigate('AcessTable', {
              assignees: assignees,
              projectId: project[0].id,
            });
          }}
          centered={true}
          rippleColor="#edebeb">
          <View style={{flexDirection: 'row', margin: 15}}>
            <UserShield
              name="user-shield"
              size={20}
              style={{
                color: '#3F51B5',

                padding: 6,

              }}
            />
            <Text
              style={{fontSize: 16, marginLeft: 20, fontWeight: '500', top: 5}}>
              Members & Permissions
            </Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            props.navigation.navigate('ProjectDetails', {
              projectId: project[0].id,
              project: project[0],
            });
          }}
          centered={true}
          rippleColor="#edebeb">
          <View style={{flexDirection: 'row', margin: 15}}>
            <UserShield
              name="file-signature"
              size={20}
              color="#c42053"
              style={{
                color: '#3F51B5',

                padding: 6,
  
              }}
            />
            <Text
              style={{fontSize: 16, marginLeft: 20, fontWeight: '500', top: 5}}>
              Project Details
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            props.navigation.navigate('Labels', {projectId: project[0].id});
          }}
          centered={true}
          rippleColor="#edebeb">
          <View style={{flexDirection: 'row', margin: 15}}>
            <LabelIcon
              name="label"
              size={23}
              color="#c42053"
              style={{
                color: '#3F51B5',
 
                padding: 6,
  
              }}
            />
            <Text
              style={{fontSize: 16, marginLeft: 20, fontWeight: '500', top: 5}}>
              Labels
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            props.navigation.navigate('ProjectTimeline', {
              projectId: project[0].id,
            });
          }}
          centered={true}
          rippleColor="#edebeb">
          <View style={{flexDirection: 'row', margin: 15}}>
            <TimelineIcon
              name="timeline"
              size={20}
              color="#c42053"
              style={{
                color: '#3F51B5',
    
                padding: 6,
         
              }}
            />
            <Text
              style={{fontSize: 16, marginLeft: 20, fontWeight: '500', top: 5}}>
              Project Timline
            </Text>
          </View>
        </TouchableRipple>
      </ScrollView>
    </Container>
  );
}


export default Presentation;
