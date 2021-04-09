import React from "react"
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import RenderProfile from '../EmployeeProfile/Index/index'

export default function Presentation(props) {
  const { value, handleChange, Id } = props
  return (
          <RenderProfile employeeID={Id} {...props}/> 
  )
}