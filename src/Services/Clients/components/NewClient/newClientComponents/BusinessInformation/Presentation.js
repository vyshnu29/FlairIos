import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Text,

  ScrollView,
  CheckBox,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import CountryAndState from "../../../../../../shared/countryAndState"
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
import validate from '../../../../../../shared/validation';

function Presentation(props) {
  const {
    businessInformation,
    handleChange,
    handleKeyValuePair,
    isUploading,
    handleFile,
  } = props;
 
  const options1 = [
    {value: '', label: 'Client Category *'},
    {value: 'End Client', label: 'End Client'},
    {value: 'Prime-Contractor', label: 'Prime-Contractor'},
    {value: 'Sub-Contractor', label: 'Sub-Contractor'},
  ];
  
  return (
    <View>
      <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
          Business Information
        </Text>
      </View>
      <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Business Name *"
              value={businessInformation.businessName}
              onChangeText={(value) => {
                handleChange('businessName', value);
              }}
            />
          </Item>
          {businessInformation.businessName.length ? (
            validate.checkName(businessInformation.businessName) ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid Business name
              </Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Business Display Name *"
              value={businessInformation.businessDisplayName}
              onChangeText={(value) => {
                handleChange('businessDisplayName', value);
              }}
            />
          </Item>
          {businessInformation.businessDisplayName.length ? (
            validate.checkName(
              businessInformation.businessDisplayName,
            ) ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid Business display name
              </Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Email *"
              value={businessInformation.email}
              onChangeText={(value) => {
                handleChange('email', value);
              }}
            />
          </Item>
          {businessInformation.email.length ? (
            validate.checkEmail(businessInformation.email) ? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid email id</Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Website *"
              value={businessInformation.website}
              onChangeText={(value) => {
                handleChange('website', value);
              }}
            />
          </Item>
          {businessInformation.website.length ? (
            validate.checkWebsite(businessInformation.website) ? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid website</Text>
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
            selectedValue={businessInformation.jobTerminationNotice}
            onValueChange={(value, index) => handleChange('jobTerminationNotice', value)}>
            <Picker.Item label="Job Termination Notice *" value="" />
            <Picker.Item label="1-week" value="1-week" />
            <Picker.Item label="2-weeks" value="2-weeks" />
            <Picker.Item label="3-weeks" value="3-weeks" />
            <Picker.Item label="4-weeks" value="4-weeks" />
          </Picker>
        </View>
        <View
          style={{
            paddingBottom: 15,
            height: 49,
            width: '93%',
            borderWidth: 1,
            borderColor: '#e6e6e6',
            alignSelf: 'flex-start',
            marginBottom: 10,
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
            selectedValue={businessInformation.category}
            onValueChange={(value, index) => handleChange('category', value)}>
            <Picker.Item label="Client Category *" value="" />
            <Picker.Item label="End Client" value="End Client" />
            <Picker.Item label="Prime-Contractor" value="Prime-Contractor" />
            <Picker.Item label="Sub-Contractor" value="Sub-Contractor" />
          </Picker>
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Fax"
            keyboardType="number-pad"
            maxLength={10}
            render={(props) => (
              <TextInputMask {...props} mask="[0000000000]" />
            )}
            value={businessInformation.fax}
            onChangeText={(value) => {
              handleChange('fax', value);
            }}
          />
          {businessInformation.fax.length
                  ? (validate.checkNumber(businessInformation.fax) ? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid fax number</Text>
            )
          ) : null}
        </View>
       
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          
          {businessInformation.federalId.length ? (
            businessInformation.federalId.trim().length === 9 ? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid federalId</Text>
            )
          ) : null}
        </View>
        <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
         
        </View>
        <View style={{paddingBottom: 3, alignSelf: 'flex-start'}}> 
        <Text style={{fontSize:16,color:'gray'}}>Logo</Text>
        </View>
        <View
          style={{
            paddingBottom: 15,
            
            marginBottom: 10,
          }}>
             <Button iconLeft bordered style={{width: 130,height:30,margin:9}} onPress={handleFile} >
            <Icon name="link" />
            <Text style={{right: 10, color: '#3F51B5'}}>Choose file</Text>
          </Button>
          </View>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <>
              {businessInformation.logo !== '' ? (
                <View style={{marginLeft: 12,bottom:22}}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(businessInformation.logo)}>
                    <Text style={{ color: '#62B1F6',textDecorationLine: 'underline',fontSize:16}}>
                      logo attachment
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{marginLeft: 12,bottom:22}}>
                  <Text style={{ color: 'grey'}}>
                    No file choosen
                  </Text>
                </View>
              )}
            </>
          </View>
        {isUploading ? (
          <View style={{marginLeft: 12,bottom:22}}>
            <Text style={{ color: 'grey'}}>
              Uploading Please Wait...
            </Text>
          </View>
        ) : (
          null
        )}
         <View style={{marginTop: 15, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
          Invoice Location
        </Text>
      </View>
      <View style={{paddingBottom: 15,marginTop:15, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="Address Line 1 *"
              value={businessInformation.invoiceLocation.line1}
              onChangeText={(value) => {
                handleChange('invoiceLocation-line1', value);
              }}
            />
          </Item>
          { businessInformation.invoiceLocation.line1.length
                  ? (validate.checkAddress(businessInformation.invoiceLocation.line1) ? null : (
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
              value={businessInformation.invoiceLocation.line2}
              onChangeText={(value) => {
                handleChange('invoiceLocation-line2', value);
              }}
            />
          </Item>
          { businessInformation.invoiceLocation.line2.length
                  ? (validate.checkAddress(businessInformation.invoiceLocation.line2) ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid address
              </Text>
            )
          ) : null}
        </View>
        <View style={{paddingBottom: 15,marginTop:10, width: '93%', alignSelf: 'flex-start'}}>
          <Item regular>
            <Input
              placeholder="City *"
              value={businessInformation.invoiceLocation.city}
              onChangeText={(value) => {
                handleChange('invoiceLocation-city', value);
              }}
            />
          </Item>
          {  businessInformation.invoiceLocation.city.length
                  ? (validate.checkAddress(businessInformation.invoiceLocation.city) ? null : (
              <Text style={{color: 'red', left: 5}}>
                Enter valid city
              </Text>
            )
          ) : null}
        </View>
        <CountryAndState
              handleKeyValuePair={handleKeyValuePair}
              countries={businessInformation.countries}
              states={businessInformation.states}
              state={businessInformation.invoiceLocation.state}
              country={businessInformation.invoiceLocation.country}
              spacing={1}
            />
         <View
          style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
          <TextInput
            label="Zip code *"
            keyboardType="number-pad"
            value={businessInformation.invoiceLocation.zipCode}
            onChangeText={(value) => {
              handleChange('invoiceLocation-zipCode', value);
            }}
          />
         { businessInformation.invoiceLocation.zipCode.length
                  ? (validate.checkZip(businessInformation.invoiceLocation.zipCode)? null : (
              <Text style={{color: 'red', left: 5}}>Enter valid zip code</Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default Presentation;
