import React, { useState } from "react";
import { View, Alert, Text,ScrollView,TouchableOpacity,StyleSheet } from "react-native";
import {  Container } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Button} from 'react-native-paper'
import BusinessInformation from "../newClientComponents/BusinessInformation"
import Contacts from "../newClientComponents/Contacts/Index"
import Accounts from "../newClientComponents/Accounts"
 import Locations from "../newClientComponents/Locations/Index"
import validate from "../../../../../shared/validation"


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0 /* using index 0 as starting point */,
      steps: ["Business", "Contact", "Account", "Location"],
    };
  }

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });
       const {activeStep,handleBack, handleNext, newClient,handleFinish } = this.props
   const { businessInformation, contacts, locations } = this.props.newClient

    const { steps, currentStep } = this.state;

    return (
      <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
         <View style={{marginTop: 30, marginHorizontal: 20,alignSelf:'center' }}>
          <View style={{ width: 280, height: 70 }}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#3F51B5",
                  width: 180,
                  position: "absolute",
                  top: 13,
                  zIndex: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                position: "absolute",
                zIndex: 20,
              }}
            >
              {steps.map((label, i) => (
                <View key={i} style={{ alignItems: "center", width: 70 }}>
                  {i > currentStep && i != currentStep /* Not selected */ && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        backgroundColor: "#fff",
                        borderWidth: 2,
                        borderColor: "#3F51B5",
                        borderRadius: 15,
                        marginBottom: 10,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "#3F51B5" }}>
                        {i + 1}
                      </Text>
                    </View>
                  )}
                  {i < currentStep /* Checked */ && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        backgroundColor: "#0faf9a",
                        borderWidth: 2,
                        borderColor: "#0faf9a",
                        borderRadius: 15,
                        marginBottom: 10,
                      }}
                    >
                      <Ionicons name="md-checkmark" size={20} color="#fff" />
                    </View>
                  )}
                  {i == currentStep /* Selected */ && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        backgroundColor: "#3F51B5",
                        borderWidth: 2,
                        borderColor: "#3F51B5",
                        borderRadius: 15,
                        marginBottom: 10,
                      }}
                    >
                      <Text style={{ fontSize: 13, color: "#ffffff" }}>
                        {i + 1}
                      </Text>
                    </View>
                  )}
                  <Text style={{ fontSize: 12 }}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "#fff" }}>
          {currentStep == 0 && (
            <View style={{marginHorizontal: 20 }}>
            <BusinessInformation />
            </View>
          )}
          {currentStep == 1 && (
             <View style={{ marginHorizontal: 20 }}>
           <Contacts />
           </View>
          )}
          {currentStep == 2 && (
             <View style={{ marginHorizontal: 20 }}>
             <Accounts />
             </View>
          )}
          {currentStep == 3 && (
             <View style={{ marginHorizontal: 20 }}>
            <Locations />
            </View>
          )}

<View style={{flexDirection:'row',justifyContent:'space-evenly',margin:20}}>
      <Button icon='arrow-left' disabled={currentStep === 0} onPress={() => { if (currentStep > 0) { this.setState({ currentStep: currentStep - 1 }); }}} style={{width:120,height:40,backgroundColor:'#3F51B5'}} uppercase={false} mode="contained">
          Back
        </Button>
        {currentStep === 0 ? (
        <Button icon='arrow-right' 
        disabled={
          (businessInformation.businessName.trim().length <= 0) ||
          businessInformation.contactNumber.trim().length <=0 ||
          !validate.checkNumber(businessInformation.contactNumber) ||
          !validate.checkWebsite(businessInformation.website) ||
          !businessInformation.jobTerminationNotice ||
          !businessInformation.category ||
          (businessInformation.businessDisplayName.trim().length <= 0) ||
          !validate.checkEmail(businessInformation.email) ||
          !businessInformation.netTerms.trim() ||
          businessInformation.federalId.trim().length !== 9 ||
          !businessInformation.invoiceLocation.line1.trim() ||
          !businessInformation.invoiceLocation.city.trim() ||
          !validate.checkZip(businessInformation.invoiceLocation.zipCode) ||
          !businessInformation.invoiceLocation.state ||
          !businessInformation.invoiceLocation.country
        }
        onPress={() => {if((currentStep+1) < steps.length){this.setState({currentStep: currentStep + 1});}}}
        contentStyle={{flexDirection:'row-reverse'}}  style={{width:120,height:40,backgroundColor:'#3F51B5'}} uppercase={false} mode="contained" >
          Next
        </Button>
        ) : currentStep  === 1 ? (
          <Button icon='arrow-right'  onPress={() => {if((currentStep+1) < steps.length){this.setState({currentStep: currentStep + 1});}}} disabled={!contacts.status}  contentStyle={{flexDirection:'row-reverse'}}  style={{width:120,height:40,backgroundColor:'#3F51B5'}} uppercase={false} mode="contained" >
          Next
        </Button>
        ) : currentStep  === 2 ? (
          <Button icon='arrow-right' onPress={() => {if((currentStep+1) < steps.length){this.setState({currentStep: currentStep + 1});}}}  contentStyle={{flexDirection:'row-reverse'}}  style={{width:120,height:40,backgroundColor:'#3F51B5'}} uppercase={false} mode="contained">
            Next
          </Button>
        ) : currentStep  === 3 ? (
          <Button
          disabled={!locations.status}
          icon='check-decagram' onPress={this.props.handleFinish}   contentStyle={{flexDirection:'row-reverse'}}  style={{width:120,height:40,backgroundColor:'#3F51B5'}} uppercase={false} mode="contained"
          >
            Finish
          </Button>
        ) : null}
        </View>
        </View>
      </ScrollView>
    );
  }
}

