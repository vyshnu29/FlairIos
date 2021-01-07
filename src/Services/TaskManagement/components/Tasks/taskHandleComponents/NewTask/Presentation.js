import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SelectInput from 'react-native-select-input-ios'
import CheckBox from '@react-native-community/checkbox'
import {
  Container,
  Title,
  Label,
  Button,
  Header,
  Textarea,
  List,
  ListItem,
  Form,
  Item,
  Picker,
  Left,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';
import {addDays} from 'date-fns';
import DatePicker from 'react-native-datepicker';
import {BottomSheet} from 'react-native-btr';
import MetaInfo from '../../../../../../shared/getMetaInfo';
import validate from '../../../../../../shared/validation';
export default function Presentation(props) {
  const {
    text,
    handleCreate,
    handleChange,
    handleDateChange,
    handleDropdown1,
    handleDropdown,
    assignee,
    state,
    project,
    description,
    handleDescription,
  } = props;
  const [DefaultStartdate, setDefaultStartdate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedRemDate, setSelectedRemDate] = useState('');
  const [checked, Setchecked] = useState(false);
  const [collapsed, setcollapsed] = React.useState(false);
  const [collapsed1, setcollapsed1] = React.useState(false);
  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };
  const toggleExpanded1 = () => {
    setcollapsed1(!collapsed1);
  };
  const handleStartDate = (newDate) => {
    setDefaultStartdate(newDate);
    handleDateChange('startdate', newDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    handleDateChange('enddate', date);
  };
  const handleRemDateChange = (date) => {
    setSelectedRemDate(date);
    handleChange('reminderDate', date);
  };
  const handleSubmit = (e) => {
    handleCreate(e);
  };

  const handleReminder = (value) => {
    Setchecked(!checked);
    handleChange('setReminder', value);
  };

  const options1 = [{ value:"None" ,label:"None"},{ value:"Closed" ,label:"Closed"},{value : "Open" , label:"Open"},{value : "Inprogress" , label:"Inprogress"},{value : "Review" , label:"Review"}]
  const options2 = [{ value:"None" ,label:"None"},{ value:"Task" ,label:"Task"},{value : "Bug" , label:"Bug"}]
  const options3 = [{ value:"None" ,label:"None"},{ value:"Urgent" ,label:"Urgent"},{value : "High" , label:"High"},{value : "Medium" , label:"Medium"},{value : "Low" , label:"Low"}]

  useEffect(() => {
    // console.log('SSp', projectAssignee);
    if (state.isCreated) setOpen(false);
  }, [state.isCreated]);
  let labels = Object.values(project.labels).filter((e) => e.isExist);
  // const projectAssignee = Object.values(project.Users).map((user) => user.uid);
  const checkValidTaskRange = (startdate, enddate) => {
    const initialDateDiff = new Date(startdate) - new Date(project.startdate);
    const finalDateDiff = new Date(project.enddate) - new Date(enddate);
    return initialDateDiff >= 0 && finalDateDiff >= 0;
  };
  const metaInfo = new MetaInfo();
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
            {text}
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={{margin: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Task Name *"
              value={state.name}
              onChangeText={(value) => handleChange('name', value)}
            />
          </Item>
        </View>
       

        <View
          style={{
          paddingBottom:15
          }}>
        <Title style={{alignSelf:'flex-start', fontSize: 15, color: '#4a4646',paddingTop:5,paddingBottom:5}}>Status</Title>
          <View style={{ padinTop:10,height: 49,width: '93%',borderWidth: 1,borderColor: '#e6e6e6',alignSelf: 'flex-start',paddingBottom: 10}}>
            <SelectInput
            value={state.status}
            options={options1}
            style={{width: '90%', top: 9}}
            onValueChange={(value) => handleChange('status', value)}/>
            </View>
        </View>
        <View
          style={{
          paddingBottom:15
          }}>
        <Title style={{alignSelf:'flex-start', fontSize: 15, color: '#4a4646',paddingTop:5,paddingBottom:5}}>Task type</Title>
           <View style={{ padinTop:10,height: 49,width: '93%',borderWidth: 1,borderColor: '#e6e6e6',alignSelf: 'flex-start',paddingBottom: 10}}>
            <SelectInput
            value={state.type}
            options={options2}
            style={{width: '90%', top: 9}}
            onValueChange={(value) => handleChange('type', value)}/>
            </View>
        </View>

      <View
          style={{
          paddingBottom:15
          }}>
        <Title style={{alignSelf:'flex-start', fontSize: 15, color: '#4a4646',paddingTop:5,paddingBottom:5}}>Priority</Title>
           <View style={{ padinTop:10,height: 49,width: '93%',borderWidth: 1,borderColor: '#e6e6e6',alignSelf: 'flex-start',paddingBottom: 10}}>
            <SelectInput
            value={state.priority}
            options={options3}
            style={{width: '90%', top: 9}}
            onValueChange={(value) => handleChange('priority', value)}/>
            </View>
        </View> 

       
        <View
          style={{
            height: 49,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            paddingBottom: 15,
            //marginTop: 15,
          }}>
          <TouchableOpacity onPress={toggleExpanded}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {assignee.length ? (
              <Text style={{fontSize: 16, marginLeft:10,top:15, color: 'grey'}}>
                  Added {assignee.length}{' '}
                  {assignee.length === 1 ? 'employee' : 'employees'}
                </Text>
              ) : (
                <Text style={{fontSize: 16,marginLeft:10,top:15,color: '#4f4f4f'}}>
                  Add Employees *
                </Text>
              )}
              {assignee.length ? (
                <Icon
                  name="checkmark-circle"
                  style={{top: 8, color: '#3F51B5'}}
                />
              ) : (
                <Icon name="add" style={{top: 12, color: '#3F51B5'}} />
              )}
            </View>
          </TouchableOpacity>
          <BottomSheet
            visible={collapsed}
            onBackButtonPress={toggleExpanded}
            onBackdropPress={() => {
              setcollapsed(!collapsed);
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 350,
              }}>
              <Header style={{backgroundColor: '#3F51B5'}}>
                <Body>
                  <Title
                      style={{color: 'white', alignSelf: 'center', fontSize: 15}}>
                    Add Employees
                  </Title>
                </Body>
              </Header>
              <FlatList
                data={Object.values(project.Users)}
                renderItem={({item}) => {
                  return (
                    <List>
                      <ListItem avatar>
                        <Body>
                          <Text>{metaInfo.emailToName(item.uid)}</Text>
                        </Body>
                        <Right style={{bottom: 6}}>
                          <CheckBox
                            value={assignee.includes(item.uid)}
                            onValueChange={(value) =>
                              handleDropdown(
                                value,
                                item.uid,
                                metaInfo.emailToName(item.uid),
                              )
                            }
                          />
                        </Right>
                      </ListItem>
                    </List>
                  );
                }}
              />
            </View>
          </BottomSheet>
        </View>

        <View
          style={{
            height: 49,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            paddingBottom: 15,
            marginTop: 15,
          }}>
          {project.useLabels ? (
            <>
              <TouchableOpacity onPress={toggleExpanded1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {state.labels.length ? (
                    <Text style={{fontSize: 16, marginLeft:10,top:10, color: 'grey'}}>
                      Added {state.labels.length}{' '}
                      {state.labels.length === 1 ? 'label' : 'labels'}
                    </Text>
                  ) : (
                    <Text style={{fontSize: 16, marginLeft: 10,top:15, color: '#4f4f4f'}}>
                      Add Labels *
                    </Text>
                  )}
                  {state.labels.length ? (
                    <Icon
                      name="checkmark-circle"
                      style={{top: 8, color: '#3F51B5'}}
                    />
                  ) : (
                    <Icon name="add" style={{top: 12, color: '#3F51B5'}} />
                  )}
                </View>
              </TouchableOpacity>
              <BottomSheet
                visible={collapsed1}
                onBackButtonPress={toggleExpanded1}
                onBackdropPress={() => {
                  setcollapsed1(!collapsed1);
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: 350,
                  }}>
                  <Header style={{backgroundColor: '#3F51B5'}}>
                    <Body>
                      <Title
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 15,
                        }}>
                        Add labels
                      </Title>
                    </Body>
                  </Header>
                  <FlatList
                    data={labels}
                    renderItem={({item}) => {
                      return (
                        <List>
                          <ListItem avatar>
                            <Body style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: item.colorCode,
                                  width: 20,
                                }}>
                                <Text />
                              </View>
                              <View>
                                <Text style={{left: 10}}>{item.name}</Text>
                              </View>
                            </Body>
                            <Right style={{bottom: 6}}>
                              <CheckBox
                                value={state.labels.includes(item.id)}
                                onValueChange={(value) =>
                                  handleDropdown1(value, item.id)
                                }
                              />
                            </Right>
                          </ListItem>
                        </List>
                      );
                    }}
                  />
                </View>
              </BottomSheet>
            </>
          ) : null}
        </View>
        <View
          style={{
            paddingTop: 15,
          }}>
          <DatePicker
            style={{width: '93%'}}
            date={DefaultStartdate}
            name="startdate"
            value={DefaultStartdate ? DefaultStartdate : null}
            placeholder="Start date *"
            format="MM/DD/yyyy"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                borderRadius: 2,
              },
            }}
            onDateChange={(date) => handleStartDate(date)}
          />
        </View>
        <View
          style={{
            paddingTop: 15,
          }}>
          <DatePicker
            style={{width: '93%'}}
            date={selectedEndDate}
            name="enddate"
            placeholder="End date *"
            format="MM/DD/yyyy"
            value={selectedEndDate ? selectedEndDate : null}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                borderRadius: 2,
              },
            }}
            onDateChange={(date) => handleEndDateChange(date)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 25,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '600', fontSize: 16}}>Set remainder</Text>
          <CheckBox
            tintColors={{true: '#3F51B5', false: 'black'}}
            value={checked}
            style={{bottom: 3, marginRight: 15}}
            onValueChange={(value) => handleReminder(value)}
          />
        </View>
        {state.setReminder ? (
          <View
            style={{
              paddingTop: 15,
            }}>
            <DatePicker
              date={selectedRemDate}
              style={{width: '93%'}}
              name="remainderDate"
              placeholder="Remainder date *"
              format="MM/DD/yyyy"
              confirmBtnText="Confirm"
            cancelBtnText="Cancel"
              // minDate={addDays(new Date(), 1)}
              value={selectedRemDate ? selectedRemDate : null}
              onDateChange={(date) => handleRemDateChange(date)}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 2,
                  marginTop: 10,
                  marginBottom: 10,
                },
              }}
            />
          </View>
        ) : null}
        <View
          style={{
            paddingTop: 15,
          }}>
          <Textarea
            rowSpan={7}
            bordered
            placeholder="Description..."
            value={description}
            onChangeText={(value) => handleDescription('description', value)}
          />
        </View>
       
      </ScrollView>
      <Button
        full
        //style={styles.bottomView}
        onPress={handleSubmit}
        disabled={
          state.setReminder
            ? state.name &&
              state.type &&
              state.status &&
              state.priority &&
              validate.checkDateDiff(state.startdate, state.enddate) &&
              checkValidTaskRange(state.startdate, state.enddate) &&
              state.reminderDate &&
              state.assignee.length
              ? false
              : true
            : state.name &&
              state.type &&
              state.status &&
              state.priority &&
              validate.checkDateDiff(state.startdate, state.enddate) &&
              checkValidTaskRange(state.startdate, state.enddate) &&
              state.assignee.length
            ? false
            : true
        }>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 18}}>
          Create
        </Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gradient: {
    width: '100%',
    height: 50,
    elevation: 5,
  },
  bottomView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
