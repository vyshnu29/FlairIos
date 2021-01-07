import { Container, Header, Content, Text, Button, Toast } from "native-base";
import React, { useEffect } from "react"
import {View} from 'react-native'
export const waitingMsg = content => {
    return Toast.show({
      text: content,
      buttonText: "Okay",
      type: "warning"
    });
  };
  
  export const successMsg = content => {
    return Toast.show({
      text: content,
      buttonText: "Okay",
      type: "success"
    });
  };
  
  export const errorMsg = content => {
    return Toast.show({
      text: content,
      buttonText: "Okay",
      type: "danger"
    });
  };
  
  export const stopWaitMsg = () => {
    return <View />;
  };