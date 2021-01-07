import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { TextInput ,Button} from 'react-native-paper';

import Dialog from 'react-native-dialog';
function Presentation(props){
    const {handleSubmit,setEmail,email} =props
    const [dialogVisible, setdialogVisible] = React.useState(false);
 const showDialog = () => {
      setdialogVisible(true);
      };

  const  handleCancel = () => {
    setdialogVisible(false);
  };
 const handleOk = () => {
    setdialogVisible(false);
    handleSubmit()
  };
   
        return (
          <View>
          <Button uppercase={false} onPress={showDialog}>
            <Text style={{ color: '#c42053', marginTop: 15 }}>Forgot password?</Text> 
          </Button>
          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Forgot Password?</Dialog.Title>
            <Dialog.Description>
            Enter your user account's verified email address and we will send you a password reset link.
            </Dialog.Description>
            <View style={{height:40}}>
            <Dialog.Input  placeholder="Email Address" value={email} onChangeText={(value)=> setEmail(value)}/>
            </View>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="OK" onPress={handleOk} />
          </Dialog.Container>
        </View>
           
            
        )

}
export default Presentation