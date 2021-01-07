import React,{ useEffect, useState} from "react"
import { Card, Title, Paragraph,Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import { Text,View ,ScrollView,FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import validate from "../../../../../../shared/validation"



function Presentation(props) {
  const {
    timesheetCycle,
    startDay,
    approvalBy,
    attachMandatory,
    enableTask,
    makeMandatory,
    linkToProject,
    projectsList,
    approvals,
    implementationDate,
    handleChange,
    handleChecked,
    handleDateChange,
    handleSubmit,
    fillableSections,
    handleKeyValuePair,
  } = props

  // const [approval, setApproval] = useState([])
  // const [project, setProject] = useState([])

 

  const Cycle =(type) => {
   
    switch (type) {
      case 0: return "Daily"
      case 1: return "Weeklym"
      case 2: return "Biweekly"
      case 3: return "Semi-Monthly"
      case 4: return "Monthly"
        default:
          return type
      }
    }  
    const weekStartDays =(type) => {
      switch (type) {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return"Friday"
        case 6: return  "Saturday"
          default:
            return type
        }
      }  
      const [approval, setApproval] = useState(null)
      const [project, setProject] = useState(null)

      React.useEffect(() => {
        approvals.filter((ele) => {
          console.log(ele.uid)
          if(ele.uid == approvalBy){
            setApproval(ele.name)
          }else{
            setApproval("")
          }
        })
        projectsList.filter((ele) => {
          if(ele.id == linkToProject){
            console.log("s",ele.title)
            setProject(ele.title)
          }else{
            setProject("")
          }
        })
      }, [linkToProject, approvalBy])
  
  
  // const [project, setProject] = useState(null)
  // useEffect(() => {
  //   setApproval(approvals.filter((ele) => ele.uid === approvalBy)[0])
  //   setProject(projectsList.filter((ele) => ele.id === linkToProject)[0])
  // }, [linkToProject, approvalBy])
 
      return (
        <View style={{flexDirection:"row"}}>
        <View style={{marginTop:5}}>
          <Text style={{color:'#62B1F6'}}>Timesheet cycle</Text>
          <Text style={{color:'#62B1F6'}}>Week start date</Text>
          <Text style={{color:'#62B1F6'}}>Approval By</Text>
          <Text style={{color:'#62B1F6'}}>Implementation Date</Text>
          <Text style={{color:'#62B1F6'}}>Project</Text>
          <Text style={{color:'#62B1F6'}}>Timesheet Attachment</Text>
          <Text style={{color:'#62B1F6'}}>Enable Task</Text>
          <Text style={{color:'#62B1F6'}}>Make Manditory</Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{left:15}} >{Cycle(timesheetCycle)}</Text>
          <Text style={{left:15}}>{weekStartDays(startDay)}</Text>
      <Text style={{left:15}}>{approval}</Text>
          <Text style={{left:15}} >{validate.dateFormatter(implementationDate)}</Text>
          <Text style={{left:15}}>{project}</Text>
          <Text style={{left:15}}>{attachMandatory ? 'Yes' : 'No'}</Text>
          <Text style={{left:15}}>{enableTask ? 'Yes' : 'No'}</Text>
          <Text style={{left:15}}>{makeMandatory ? 'Yes' : 'No'}</Text>
       
        </View>
    </View>
       
      );
   
      
  
}

export default Presentation
