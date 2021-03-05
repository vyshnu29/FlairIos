import React from 'react'
import {View,ActivityIndicator} from 'react-native'
import IDcard from "../../IDcard/index"
import Section from "../Sections/index"
import ProfileFields from '../../ProfileFields/index'
import Spinner from 'react-native-loading-spinner-overlay'
import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler'

function Presentation(props) {
  const { state } = props
  const profileTemplate = state.profileTemplate
  const employeeProfile = state.employeeProfile
  const sections = state.profileTemplate.data.sections
  const loadingCondition = profileTemplate.isLoading || employeeProfile.isLoading
  const errorCondition = (profileTemplate.error !== "") || (employeeProfile.error !== "")
  if (loadingCondition)
    return <Spinner visible={true}/>
  else if (errorCondition)
    return <Spinner visible={true}/>
  return (
    <ScrollView style={{flex:1}}>
      <IDcard profile={employeeProfile.data} id={employeeProfile.data.employeeID} individual={false} {...props} /> 
      {
              Object.values(sections).sort((a, b) => a.sortPriority - b.sortPriority).map(item => {
                return (
                  <Section key={item.access_key} section={item} {...props} />
                )
              })
            }
    </ScrollView>
          
  )
}

export default Presentation