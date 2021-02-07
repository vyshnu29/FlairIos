import React, {useContext, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import {TextInput, Checkbox, Colors, Appbar, Chip} from 'react-native-paper';
import SelectInput from 'react-native-select-input-ios'
import validate from '../../../../shared/validation';
import MetaInfo from '../../../../shared/getMetaInfo';
import DatePicker from 'react-native-datepicker';
import {BottomSheet} from 'react-native-btr';
import CheckBox from '@react-native-community/checkbox'
import {
  Container,
  Title,
  Button,
  Header,
  Item,
  Picker,
  List,
  ListItem,
  Left,
  Span,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';

function Presentation(props) {
  const [selectedStartDate, setSelectedStartDate] = React.useState('');
  const [collapsed, setcollapsed] = React.useState(false);
  const [selectedEndDate, setSelectedEndDate] = React.useState('');
  const [timeline, setTimeline] = useState(false);
  const [labels, setLabels] = useState(false);
  const [val, Setval] = useState('');
  const [picker, Setpicker] = useState(undefined);
  const [val1, Setval1] = useState('');
  const options = [{ value:"None" ,label:"None"},{ value:"Closed" ,label:"Closed"},{value : "Open" , label:"Open"}]
  const {
    handleCreate,
    handleChange,
    addedNames,
    inProject,
    handleDateChange,
    handleEmployees,
    projectsList,
    projectMembers,
    errCount,
    newProject,
    employees,
    handleCheck,
  } = props;

  const handleStartDateChange = (newDate) => {
    setSelectedStartDate(newDate);
    handleDateChange('startdate', newDate);
  };

  const handleEndDateChange = (newDate) => {
    setSelectedEndDate(newDate);
    handleDateChange('enddate', newDate);
  };

  const handleTimeline = (e) => {
    setTimeline(!timeline);
    handleCheck('useTimeline', !timeline);
  };

  const handleLabels = () => {
    setLabels(!labels);
    handleCheck('useLabels', !labels);
  };

  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };

  const handleSubmit = (e) => {
    handleCreate(e);
    props.navigation.goBack();
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  const handleProject = (value) => {
    Setval(value);
    handleChange('name', value);
  };
  const handlePick = (value) => {
    Setpicker(value);
    handleChange('status', value);
  };
  const handleProject1 = (value) => {
    Setval1(value);
    handleChange('projectId', value);
  };

  let activeEmployeeList = Object.values(props.names[0]);
  const metaInfo = new MetaInfo();
  let activeEmployees = [];
  if (activeEmployeeList)
    activeEmployees = activeEmployeeList.map((employee) => {
      return {
        name: metaInfo.emailToName(employee.uid),
        isSupervisor: employee.isSupervisor,
        uid: employee.uid,
        id: employee.uid,
      };
    });
  else activeEmployees = [];
  if (inProject) {
    activeEmployees = activeEmployees.filter(
      (employee) =>
        !projectMembers.includes(employee.uid) && employee.uid !== undefined,
    );
  } else {
    activeEmployees = activeEmployees.filter(
      (employee) => employee.uid !== undefined,
    );
  }

  const projectExist = projectsList.filter(
    (project) =>
      project.title.trim().toLowerCase() ===
      newProject.name.trim().toLowerCase(),
  ).length;
  const projectIdExist = projectsList.filter(
    (project) =>
      project.cid.trim().toLowerCase() ===
      newProject.projectId.trim().toLowerCase(),
  ).length;

  const ProjectIdValidations = {
    checkName: (name) => {
      const exp = /^[a-zA-Z \-  0-9\b]{1,}$/;
      return exp.test(name.trim());
    },
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
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white',fontSize:18}}>
            New Project
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={{margin: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Project Name *"
              value={val}
              onChangeText={(value) => handleProject(value)}
            />
          </Item>

          {projectExist ? (
            <Text style={{color: 'red'}}>
              This title already exists! choose another title
            </Text>
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Project Id *"
              value={val1}
              onChangeText={(value) => handleProject1(value)}
            />
          </Item>
          {newProject.projectId.length ? (
            newProject.projectId.length >= 3 &&
            newProject.projectId.length <= 10 ? (
              ProjectIdValidations.checkName(newProject.projectId) ? null : (
                <Text style={{color: 'red'}}>
                  ProjectId should not contain ay special characters except`-`
                </Text>
              )
            ) : (
              <Text style={{color: 'red'}}>
                Project ID should contain min. 3 and max. 10 characters
              </Text>
            )
          ) : null}
          {projectIdExist ? (
            <Text style={{color: 'red'}}>
              This Project ID already exists! choose another Project ID
            </Text>
          ) : null}
        </View>
        <View
          style={{
            height: 50,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            paddingBottom: 15,
          }}>
          <TouchableOpacity onPress={toggleExpanded}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {addedNames.length ? (
                <Text style={{fontSize: 16, marginLeft:10,top:15, color: 'grey'}}>
                  Added {addedNames.length}{' '}
                  {addedNames.length === 1 ? 'employee' : 'employees'}
                </Text>
              ) : (
                <Text style={{fontSize: 16,marginLeft:10,top:15,color: '#4f4f4f'}}>
                  Add Employees *
                </Text>
              )}
              {addedNames.length ? (
                <Icon
                  name="checkmark-circle"
                  style={{top:12,color: '#3F51B5'}}
                />
              ) : (
                <Icon name="add" style={{ top:8,color: '#3F51B5'}} />
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
                data={activeEmployees}
                renderItem={({item}) => {
                  return (
                    <List>
                      <ListItem avatar>
                        <Body>
                          <Text>{item.name}</Text>
                        </Body>
                        <Right style={{bottom: 8}}>
                          <CheckBox
                          
                            tintColors={{true: '#3F51B5', false: 'black'}}
                            style={{top:2}}
                            value={employees.includes(item.id)}
                            onValueChange={(value) =>
                              handleEmployees(value, item.id, item.name)
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
          paddingTop:15
          }}>
             <Title style={{alignSelf:'flex-start', fontSize: 15, color: 'grey',paddingTop:5,paddingBottom:5}}>Status</Title>
            <View style={{ padinTop:10,height: 49,width: '93%',borderWidth: 1,borderColor: '#e6e6e6',alignSelf: 'flex-start',paddingBottom: 10}}>
            <SelectInput
            value={picker}
            options={options}
            style={{width: '90%', top: 14}}
            onValueChange={(value, index) => handlePick(value)}/>
            </View>

         
        </View>
        <View
          style={{
            paddingTop: 15,
          }}>
          <DatePicker
            date={selectedStartDate}
            name="startdate"
            value={selectedStartDate ? selectedStartDate : null}
            placeholder="Start date *"
            format="MM/DD/yyyy"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{width: '93%', alignSelf: 'flex-start'}}
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
            onDateChange={(date) => handleStartDateChange(date)}
          />
        </View>
        <View style={{paddingTop: 15}}>
          <DatePicker
            date={selectedEndDate}
            name="enddate"
            placeholder="End date *"
            format="MM/DD/yyyy"
            style={{width: '93%', alignSelf: 'flex-start'}}
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
        <TouchableWithoutFeedback onPress={handleTimeline}>
          <View
            style={{
              paddingTop: 15,
            }}>
            <Checkbox.Item
              label="Timeline"
              labelStyle={{color: '#3F51B5'}}
              color="#3F51B5"
              status={timeline ? 'checked' : 'unchecked'}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleLabels}>
          <View>
            <Checkbox.Item
              label="Labels"
              labelStyle={{color: '#3F51B5'}}
              color="#3F51B5"
              status={labels ? 'checked' : 'unchecked'}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Button
        full
        style={{backgroundColor:'#3f51b5'}}
        onPress={handleSubmit}
        disabled={
          errCount === 0 &&
          !projectExist &&
          !projectIdExist &&
          validate.checkDateDiff(selectedStartDate, selectedEndDate) &&
          ProjectIdValidations.checkName(newProject.projectId)
            ? false
            : true
        }
        // style={ styles.bottomView}
      >
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 18}}>
          Create
        </Text>
      </Button>
    </Container>
  );
}

export default Presentation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  row: {
    flex: 1,
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
