import React from 'react';
import {
  View,
  Text,
  ScrollView,
  CheckBox,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
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
  const { location, handleChange, onSubmit, handleKeyValuePair } = props
  return (
    <View>
      <ScrollView>
      <View style={{marginTop: 24, alignSelf: 'flex-start'}}>
        <Text style={{fontSize: 20, fontWeight: '600',textDecorationLine:'underline'}}>
          Locations
        </Text>
      </View>
    <View style={{paddingBottom: 15,marginTop:15, width: '93%', alignSelf: 'flex-start'}}>
    <Item regular>
      <Input
        placeholder="Address Line 1 *"
        value={location.locationsline1}
        onChangeText={(value) => {
          handleChange('locationsline1', value);
        }}
      />
    </Item>
    {   location.locationsline1.length
                  ? (validate.checkAddress(location.locationsline1) ? null : (
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
        value={location.locationsline2}
        onChangeText={(value) => {
          handleChange('locationsline2', value);
        }}
      />
    </Item>
    {   location.locationsline2.length
                  ? (validate.checkAddress(location.locationsline2) ? null : (
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
        value={location.locationscity}
        onChangeText={(value) => {
          handleChange('locationscity', value);
        }}
      />
    </Item>
    {   location.locationscity.length
                  ? (validate.checkAddress(location.locationscity) ? null : (
        <Text style={{color: 'red', left: 5}}>
          Enter valid city
        </Text>
      )
    ) : null}
  </View>
  <CountryAndState
       handleKeyValuePair={handleKeyValuePair}
       countries={location.countries}
       states={location.states}
       state={location.locationsstate_name}
       country={location.locationscountry}
       spacing={1}
      />
   <View
    style={{paddingBottom: 15, width: '93%', alignSelf: 'flex-start'}}>
    <TextInput
      label="Zip code *"
      keyboardType="number-pad"
      value={location.locationszip}
      onChangeText={(value) => {
        handleChange('locationszip', value);
      }}
    />
   {  location.locationszip.length
            ? (validate.checkZip(location.locationszip)? null : (
        <Text style={{color: 'red', left: 5}}>Enter valid zip code</Text>
      )
    ) : null}
  </View> 
  <View style={{alignSelf: 'flex-end',right:15,bottom:9}} >
        <Button transparent onPress={onSubmit}  disabled={
              !location.locationsline1.trim() ||
              !location.locationscountry.trim() ||
              !location.locationscity.trim() ||
              !location.locationsstate_name.trim() ||
              !validate.checkZip(location.locationszip)
            }>
            <Text style={{color:'#3F51B5',fontWeight:'700',fontSize:17}}>Save</Text>
          </Button>
          </View>
      </ScrollView> 
  </View>
  )
}

export default Presentation
