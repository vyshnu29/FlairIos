import React, {useContext, useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet,Text,ScrollView} from 'react-native';
import {
  TextInput,
  Checkbox,
} from 'react-native-paper';
import SelectInput from 'react-native-select-input-ios'
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Button,
  Header,
  Content,
  Title,
  Form,
  Item,
  Picker,
  Left,
  Body,
  Right,
  Label,
  Icon,
  Input,
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function Presentation(props) {
  
  const {
    handleChange,
    handleDateChange,
    handleUpdate,
    //errCount,
    oldContent,
    handleCheck,
  } = props
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date(oldContent.startdate));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date(oldContent.enddate));
  const [timeline, setTimeline] = useState(oldContent.useTimeline);
  const [labels, setLabels] = useState(oldContent.useLabels);
  const [val, Setval] = useState(oldContent.title);
  const [picker, Setpicker] = useState(oldContent.status);
  const [val1, Setval1] = useState("");
  const options = [{ value:"None" ,label:"None"},{ value:"Closed" ,label:"Closed"},{value : "Open" , label:"Open"}]
  

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

  const handleSubmit = (e) => {
    handleUpdate(e);
    props.navigation.goBack();
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
            Update Project
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={{margin:10}} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 15,width: '93%',alignSelf: 'flex-start'}}>
            <Item regular>
            
              <Input
              placeholder="Project Name *"
                value={oldContent.title}
                onChangeText={(value) => handleChange('title', value)}
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
            value={picker}
            options={options}
            style={{width: '90%', top: 9}}
            onValueChange={(value, index) => handlePick(value)}/>
            </View>

         
        </View>
            <View
              style={{paddingBottom: 15}}>
              <DatePicker
                date={selectedStartDate}
                name="startdate"
                value={selectedStartDate ? selectedStartDate : null}
                placeholder="Start date *"
             //   minDate={oldContent.startdate}
                format="MM/DD/yyyy"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{width: '93%',alignSelf: 'flex-start'}}
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
            <View style={{paddingBottom: 15}}>
              <DatePicker
                date={selectedEndDate}
                name="enddate"
                minDate={new Date(oldContent.startdate)}
                placeholder="End date *"
                format="MM/DD/yyyy"
                style={{width: '93%',alignSelf: 'flex-start'}}
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
            <View>
                <Checkbox.Item
                  label="Timeline"
                  labelStyle={{color:'black'}}
                  color='#3F51B5'
                  status={timeline ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleLabels}>
            <View
              style={{
                paddingBottom: 15,
              }}>
                <Checkbox.Item
                  label="Labels"
                  labelStyle={{color:'black'}}
                  color='#3F51B5'
                  status={labels ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableWithoutFeedback>
       
            </ScrollView>
          <Button
          style={{backgroundColor:'#3f51b5'}}
          full
            onPress={handleSubmit}>
           <Text style={{alignSelf: 'center',color: 'white',fontSize:18}}>Update</Text>
          </Button>
        
         
      </Container>
   
  );
}

export default Presentation;

const styles = StyleSheet.create({
 
  bottomView:{ 
    width: '100%',  
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  textStyle:{

    color: '#fff',
    fontSize:22
  },
  row: {
    flex: 1,
  },
  Gradient: {
    width: '100%',
    height: 50,
    elevation: 5,
  },
});






