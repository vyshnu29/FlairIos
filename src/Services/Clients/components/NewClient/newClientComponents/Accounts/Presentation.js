import React from 'react';
import {
  View,
  Text,
  ScrollView,
  CheckBox,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';

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
import validate from "../../../../../../shared/validation"


function Presentation(props) {
  const {
    accounts,
    handleChange,
    handleAdd,
    handleDiscountDetails,
    handleDelete,
    onAddDiscount,
    onRemoveDiscount,
  } = props
  return (
    <View>
    <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
      <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
        Accounts
      </Text>
    </View>
    <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="Services"
            value={accounts.services}
            onChangeText={(value) => {
              handleChange('services', value);
            }}
          />
        </Item>
      </View>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="First Name"
            value={accounts.firstName}
            onChangeText={(value) => {
              handleChange('firstName', value);
            }}
          />
        </Item>
      </View>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="Middle Name"
            value={accounts.middleName}
            onChangeText={(value) => {
              handleChange('middleName', value);
            }}
          />
        </Item>
      </View>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="Last Name"
            value={accounts.lastName}
            onChangeText={(value) => {
              handleChange('lastName', value);
            }}
          />
        </Item>
      </View>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="Job Title"
            value={accounts.jobTitle}
            onChangeText={(value) => {
              handleChange('jobTitle', value);
            }}
          />
        </Item>
      </View>
      <View
        style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
        <Item regular>
          <Input
            placeholder="Email"
            value={accounts.email}
            onChangeText={(value) => {
              handleChange('email', value);
            }}
          />
        </Item>
      </View>
    
     
      
        <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
      <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
      Notifiers
      </Text>
    </View>
    <View style={{paddingTop: 15, width: '93%', alignSelf: 'flex-start'}}>
    <Item regular>
          <Input
            placeholder="To"
            value={accounts.to}
            onChangeText={(value) => {
              handleChange("to", value);
            }}
          />
        </Item>
          </View>
          <View style={{paddingTop: 15, width: '93%', alignSelf: 'flex-start'}}>
    <Item regular>
          <Input
            placeholder="CC"
            value={accounts.cc}
            onChangeText={(value) => {
              handleChange("cc", value);
            }}
          />
        </Item>
          </View>
          <View style={{paddingTop: 15, width: '93%', alignSelf: 'flex-start'}}>
    <Item regular>
          <Input
            placeholder="Bcc"
            value={accounts.bcc}
            onChangeText={(value) => {
              handleChange("bcc", value);
            }}
          />
        </Item>
          </View>
          <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
      <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
      Discounts
      </Text>
    </View>
    <View
          style={{
            paddingBottom: 15,
            height: 49,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            marginTop: 15,
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
            selectedValue={accounts.status}
            onValueChange={(value, index) => handleChange('status', value)}>
            <Picker.Item label="Status" value="" />
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="InActive" value="Female" />
          </Picker>
        </View>
        {accounts.discountDetails.map((item, index) => {
          return(
            <View>
            <View style={{paddingTop: 15, width: '93%', alignSelf: 'flex-start'}}>
            <Item regular>
                  <Input
                    placeholder="Name"
                    value={item["name"]}
                    onChangeText={(value) => {
                      handleDiscountDetails("name", value);
                    }}
                  />
                </Item>
                  </View>
                  
          <View
            style={{
              padinTop: 15,
              height: 49,
              width: '93%',
              borderWidth: 1,
              borderColor: '#e6e6e6',
              alignSelf: 'flex-start',
              marginTop: 15,
            }}>
              <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              textStyle={{color: '#5cb85c'}} 
              itemStyle={{
                backgroundColor: '#d3d3d3',
                marginLeft: 0,
                paddingLeft: 10,
              }}
              itemTextStyle={{color: '#788ad2'}}
              style={{width: undefined}}
              selectedValue={item["type"]}
              onValueChange={(value, index) => handleDiscountDetails('type', value)}>
                <Picker.Item label="Select" value="" />
              <Picker.Item label="byValue" value="By Value" />
              <Picker.Item label="byPercentage" value="By Percentage" />
            </Picker>
          </View>
          <View
            style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
            <TextInput
              label="Discount"
              keyboardType="number-pad"
             
              value={item["value"]}
              onChangeText={(value) => {
                const val = Number(value)
                if (
                  (accounts.discountDetails[index]["type"] === "byPercentage" &&
                    val < 100) ||
                  accounts.discountDetails[index]["type"] === "byValue"
                ) {
                  accounts.discountDetails[index]["value"] = val
                  handleDiscountDetails('value', value)
                }
              }}
            />
          </View>
          </View>
          )
         
        })}
          
        
    </ScrollView>
  </View>
  )
}

export default Presentation
