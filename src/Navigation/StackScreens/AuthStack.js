import React, { useEffect } from "react"
import DashBoard from '../../screens/DashBoard'
import ResetPassword from '../../Services/Authentication/components/ChangePassword/index'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackScreens(props) {
  return (
      <Stack.Navigator  headerMode='none' >
          <Stack.Screen name="DashBoard"  component={DashBoard}/>
          <Stack.Screen name="ResetPassword"  component={ResetPassword}/>
      </Stack.Navigator>
  );
}

export default StackScreens;