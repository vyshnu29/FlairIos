import React from 'react'
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import validate from "../../../../shared/validation"
//import FilterBy from '../../../../shared/filterBy'
export default function Presentation(props) {
	let projectList = []
	console.log(props)
	projectList = props.projectList
	const statusList = ["Open", "Closed"]

	let data = []

	projectList.length &&
		projectList.forEach((project) => {
			data.push({
				clientname: project.title,
				id: project.id,
				cid: project.cid,
				startdate: validate.dateFormatter(project.startdate),
				enddate: validate.dateFormatter(project.enddate),
				status:project.status,
			})
		})
	console.log(data)
	return (
		<Container>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
            
                <List>
                  <ListItem avatar>
                    <Left>
                      <Avatar.Text
                        size={55}
                        label={item.clientname[0].toUpperCase()}
                        style={{backgroundColor: '#c42053'}}
                      />
                    </Left>
                    <Body>
                      <TouchableOpacity onPress={() => {
                  props.navigation.navigate('Tasks',{projectId : item.id});
                }}>
                        <Title
                          style={{color: '#3F51B5', fontSize: 16}}
                          mode="text">
                          {item.clientname.toUpperCase()}
                        </Title>
                      </TouchableOpacity>

                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Text>ProjectId</Text>
                          <Text>Status</Text>
                          <Text>Start date</Text>
                          <Text>End date</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text> : </Text>
                          <Text> : </Text>
                          <Text> : </Text>
                          <Text> : </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text>{item.cid}</Text>
                          <Text>{item.status}</Text>
                          <Text>{item.startdate}</Text>
                          <Text>{item.enddate}</Text>
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
}
