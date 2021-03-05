import React, { useEffect } from "react"
import Profile from '../../screens/ProfileScreen'
import ArrayTable from '../../Services/EmployeeManagment/components/EmployeeProfile/TypeArrayTable/index'
import ObjTable from '../../Services/EmployeeManagment/components/EmployeeProfile/TypeObjectTable/index'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ProfileStackScreens(props) {
  return (
      <Stack.Navigator  headerMode='none' >
          <Stack.Screen name="Profile"  component={Profile}/>
          <Stack.Screen name="ProfileArrayTable"  component={ArrayTable}/>
          <Stack.Screen name="ProfileObjTable"  component={ObjTable}/>
      </Stack.Navigator>
  );
}

export default ProfileStackScreens;