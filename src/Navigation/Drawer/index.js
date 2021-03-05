import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../StackScreens/ServicesStack'
import  DrawerContent  from '../../screens/DrawerContent';
import Profile from '../StackScreens/ProfileStack'
import ResetPassword from '../../Services/Authentication/components/ChangePassword/index'

const Drawer = createDrawerNavigator();

export default function DrawerNavigate() {
  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name="TabBar" component={TabBar} />
        <Drawer.Screen name="ResetPassword"  component={ResetPassword}/>
        <Drawer.Screen name="Profile"  component={Profile}/>
      </Drawer.Navigator>
  );
}