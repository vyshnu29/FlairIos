import React, { useEffect } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackScreens from '../StackScreens/ServicesStack'
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { getModules } from "../../Services/EmployeeManagment/middleware/index"
import { connect } from "react-redux"
import { compose } from "redux"


const Tab = createBottomTabNavigator();



const MainTabs = (props) => {
  
  return (
   <StackScreens/>
  );
 
};

export default MainTabs

{/* <Tab.Navigator
initialRouteName="Dash-Board"
tabBarOptions={{
  activeTintColor: '#e91e63',
  labelStyle:{
    fontSize:14
  }
}}
>
    <Tab.Screen
    name="Dash-Board"
    component={DashBoard}
    options={{
      tabBarLabel: 'Dash Board',
      tabBarIcon: ({ color,size }) => (
        <Dash name="graph" color={color} size={size} />
      ),
    }}
  />
   <Tab.Screen
       name="Services"
       options={{
        tabBarLabel: 'Services',
           tabBarIcon: ({ color ,size }) => (
                <Icon
                  name={'appstore1'}
                  color={color}
                  size={size}
                />
           )
       }}
   
       component={StackScreens}/> 
          
       
</Tab.Navigator> */}