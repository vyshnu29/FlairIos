import React from 'react';
import {
  View,
  Text,
  ScrollView,
  CheckBox,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import SelectInput from 'react-native-select-input-ios';
import DatePicker from 'react-native-datepicker';

import {BottomSheet} from 'react-native-btr';
import {
  Container,
  Header,
  Picker,
  Item,
  Button,
  Icon,
  Input,
} from 'native-base';
import validate from "../../../../../../../shared/validation"
import CountryAndState from "../../../../../../../shared/countryAndState"

function Presentation(props) {
  const { contact, handleChange, onSubmit, handleKeyValuePair } = props
  const genderList = ["Female", "Male", "Others"]
  return (
    <View>
      <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
          Contact
        </Text>
      </View>
      <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Representative Name *"
              value={contact.representativeName}
              onChangeText={(value) => {
                handleChange('representativeName', value);
              }}
            />
          </Item>
          {contact.representativeName.length
                  ?( validate.checkName(contact.representativeName)? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid representative Name
              </Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Job Title *"
              value={contact.jobTitle}
              onChangeText={(value) => {
                handleChange('jobTitle', value);
              }}
            />
          </Item>
          {contact.jobTitle.length
                  ? (validate.checkName(contact.jobTitle)
             ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid Business Job Title
              </Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Email *"
              value={contact.email}
              onChangeText={(value) => {
                handleChange('email', value);
              }}
            />
          </Item>
          { contact.email.length
                  ? (validate.checkEmail(contact.email) ? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid email id</Text>
            )
          ) : null}
        </View>
      <View style={{paddingBottom: 15,marginTop:15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Address Line 1 *"
              value={contact.line1}
              onChangeText={(value) => {
                handleChange('line1', value);
              }}
            />
          </Item>
          {  contact.line1.length
                  ? (validate.checkAddress(contact.line1) ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid address
              </Text>
            )
          ) : null}
        </View>
        <View style={{paddingBottom: 15,marginTop:10, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Address Line 2"
              value={contact.line2}
              onChangeText={(value) => {
                handleChange('line2', value);
              }}
            />
          </Item>
        </View>
        <View style={{paddingBottom: 15,marginTop:10, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="City *"
              value={contact.city}
              onChangeText={(value) => {
                handleChange('city', value);
              }}
            />
          </Item>
        </View>
        <CountryAndState
             handleKeyValuePair={handleKeyValuePair}
             countries={contact.countries}
             states={contact.states}
             state={contact.state_name}
             country={contact.country}
             spacing={1}
            />
         <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Zip code *"
            keyboardType="number-pad"
            value={contact.zip}
            onChangeText={(value) => {
              handleChange('zip', value);
            }}
          />
         {  contact.zip.length
                  ? (validate.checkZip(contact.zip)? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid zip code</Text>
            )
          ) : null}
        </View>   
        <View
          style={{
            padinTop: 15,
            height: 49,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            marginBottom: 15,
          }}>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Status"
            textStyle={{color: '#5cb85c'}}
            itemStyle={{
              backgroundColor: '#d3d3d3',
              marginLeft: 0,
              paddingLeft: 10,
            }}
            itemTextStyle={{color: '#788ad2'}}
            style={{width: undefined}}
            selectedValue={contact.gender}
            onValueChange={(value, index) => handleChange('gender', value)}>
            <Picker.Item label="Gender *" value="" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
       
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Mobile"
            keyboardType="number-pad"
            maxLength={10}
            value={contact.mobile}
            render={(props) => (
              <TextInputMask {...props} mask="[0000000000]" />
            )}
            onChangeText={(value) => {
              handleChange("mobile", value);
            }}
          />
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Work Phone *"
            keyboardType="number-pad"
            maxLength={10}
            value={contact.workPhone}
            render={(props) => (
              <TextInputMask {...props} mask="[0000000000]" />
            )}
            onChangeText={(value) => {
              handleChange("workPhone", value);
            }}
          />
          {
                    contact.workPhone.length
                      ? validate.checkNumber(contact.workPhone)
                        ? null
                        : <Text style={{color: 'red', left: 5}}>Enter valid work phone</Text>
                      : null
                  }
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Ext."
            keyboardType="number-pad"
            value={contact.workPhoneExtension}
            onChangeText={(value) => {
              handleChange("workPhoneExtension", value);
            }}
          />
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Home Phone"
            keyboardType="number-pad"
            maxLength={10}
            value={contact.homePhone}
            render={(props) => (
              <TextInputMask {...props} mask="[0000000000]" />
            )}
            onChangeText={(value) => {
              handleChange("homePhone", value);
            }}
          />
        </View>
        <View style={{alignSelf: 'flex-end',right:15,bottom:9}} >
        <Button transparent onPress={onSubmit}>
            <Text style={{color:'#3F51B5',fontWeight:'700',fontSize:17}}>Save</Text>
          </Button>
          </View>
      </ScrollView>
    </View>
  )
}

export default Presentation
