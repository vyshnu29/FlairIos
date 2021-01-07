import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { connect } from "react-redux"
import { addMember } from "../../../middleware"
import Presentation from "./Presentation"
import  Spinner  from "react-native-loading-spinner-overlay"

function Container(props) {
  const [state, setState] = React.useState({
    employees: [],
    isAdded: false,
  })

  let project = []
  const { projectData } = props

  const handleEmployees = (value) => {
    setState({
      ...state,
      employees: value,
    })
  }


  const onAddMembers = () => {
    const employees = state.employees
    const { addMember } = props
    let data = {
      employees,
      projectId: project[0].id,
    }
    addMember(data)
    setState({
      ...state,
      employees: [],
      isAdded: true,
    })
    props.navigation.goBack();
   
  }
 
  project = Object.values(projectData["projectData"])
  console.log("Asiii",project)
  return (
        <Presentation
          {...props}
          project={project}
          projectId={project.id}
          employees={state.employees}
          isAdded={state.isAdded}
          handleEmployees={handleEmployees}
          onAddMembers={onAddMembers}
        />
  )
  return(<Spinner visible={true}/>)
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMember: (payload) => {
      dispatch(addMember(payload))
    },
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    projectData: state.projects.project,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container)
