import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import {
  Container,
  Header,
  Text,
  Title,
  Body,
  Right,
  Left,
  Icon,
  Input,
  Button,
} from 'native-base';
import {

  Card,
  Avatar,
  Appbar,
  Checkbox,
  DataTable,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MetaInfo from '../../../../../shared/getMetaInfo';

function Presentation(props) {
  const {
    assignees,
    handleLevelChange,
    handleUpdateLevels,
    handleRemove,
  } = props;
  const metaInfo = new MetaInfo();
  console.log(assignees);

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
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white',fontSize:18}}>
            Permissions
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={{margin: 10}} showsVerticalScrollIndicator={false}>
        {assignees.map((employee) => (
          <View style={styles.container}>
              <View>
                <Text style={{color: '#3F51B5', fontSize: 18}} mode="text">
                  {metaInfo.toNameCase(metaInfo.emailToName(employee.uid))}
                </Text>
              </View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Create</DataTable.Title>
                  <DataTable.Title>Update</DataTable.Title>
                  <DataTable.Title>Read</DataTable.Title>
                  <DataTable.Title>Delete</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row > 
                  <DataTable.Cell>
                  <CheckBox
                  tintColors={{true: '#3F51B5', false: 'black'}}
                                value={employee.create}
                                onValueChange={(value) =>
                                  handleLevelChange(employee.uid, employee.create,'create')
                                }
                              />{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {' '}
                    <CheckBox
                    tintColors={{true: '#3F51B5', false: 'black'}}
                                value={employee.update }
                                onValueChange={(value) =>
                                  handleLevelChange(employee.uid, employee.update,'update')
                                }
                              />{' '}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {' '}
                    <CheckBox
                    tintColors={{true: '#3F51B5', false: 'black'}}
                                value={employee.read }
                                onValueChange={(value) =>
                                  handleLevelChange(employee.uid, employee.read,'read')
                                }
                              />{' '}
                  </DataTable.Cell>
                  
                  <DataTable.Cell>
                  <CheckBox
                  tintColors={{true: '#3F51B5', false: 'black'}}
                                value={employee.delete}
                                onValueChange={(value) =>
                                  handleLevelChange(employee.uid,employee.delete,'delete')
                                }
                              />{' '}
          
            </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
              <View>
                  <View>
                    <Text style={{fontSize:14,marginBottom:10,color:'grey'}}>Actions:</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                  <Button style={{height:30}}  onPress={() => handleUpdateLevels(employee.uid)} ><Text uppercase={false}> Apply </Text></Button>
                  <Button danger style={{height:30}}  onPress={() => handleRemove(employee.uid)} ><Text uppercase={false}> Remove </Text></Button>
               </View>
                </View>
            </View>
        
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width: '95%',
   // backgroundColor: 'white',
    borderRadius: 24,
    padding:10,
    alignSelf: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 16,
    borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: 'rgb(246,245,248)',
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
    marginBottom: 10,
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
  mainTextContainer: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
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
 {/* <View style={{flexDirection:'row'}}>
                <View>
                <TouchableWithoutFeedback onPress={() =>
                        handleLevelChange(
                          employee.uid,
                          employee.create,
                          "create"
                        )
                      }>
              <View>
                <Checkbox.Item
                  label="Create"
                  color="#012B72"
                  status={employee.create ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback> 
                </View>
                <View >
                <TouchableWithoutFeedback onPress={() =>
                        handleLevelChange(
                          employee.uid,
                          employee.update,
                          "update"
                        )
                      }>
              <View>
                <Checkbox.Item
                  label="Update"
                  color="#012B72"
                  status={employee.update ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback>
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View >
                <TouchableWithoutFeedback onPress={() =>
                        handleLevelChange(employee.uid, employee.read, "read")
                      }>
              <View>
                <Checkbox.Item
                  label="Read"
                  color="#012B72"
                  status={employee.delete? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback>
                </View>
                <View >
                <TouchableWithoutFeedback onPress={() =>
                         handleLevelChange(
                          employee.uid,
                          employee.delete,
                          "delete"
                        )
                      }>
              <View>
                <Checkbox.Item
                  label="Delete"
                  color="#012B72"
                  status={employee.delete ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback>
                </View>
                </View> */}
              {/* <View>
                  <View>
                    <Text style={{fontSize:18 ,marginBottom:10}}>Actions:</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <Button mode='contained' style={{marginLeft:20}}  onPress={() => handleUpdateLevels(employee.uid)} >Apply</Button>
               <Button  mode='contained' color='#DB2828' style={{marginLeft:20}} onPress={() => handleRemove(employee.uid)} >Remove</Button>
               </View>
                </View> */}