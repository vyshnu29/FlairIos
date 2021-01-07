import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { loadProject, setState } from "../../middleware/projectsList"
import Presentation from "./Presentation"
import Spinner from 'react-native-loading-spinner-overlay'

function Container(props) {
  const [state, setState] = React.useState({
    projectId: "",
    project: {},
  })
  let project = []
  const { projectData, _load_project, isLoadingProject } = props
  const handleComponentUpdate = () => {
    setState({
      ...state,
      update: "component",
    })
  }
  let payload = {
    projectID: props.id,
  }

  useEffect(() => {
    _load_project(payload)
  }, [])
  if (
    
    (isLoaded(props.modules) &&
   
      isLoaded(props.projectsList) &&
    
      isLoaded(props.tasksList))
  
  ) {
    if (!isLoadingProject) {
      project = Object.values(projectData["projectData"])
      console.log("Asiii",project)
      return (
        <Presentation
          {...props}
          project={project}
          handleComponentUpdate={handleComponentUpdate}
        />
      )
    }
    return <Spinner visible={true} />
  }
 
    return <Spinner visible={true} />
  
}
const mapDispatchToProps = (dispatch) => {
  return {
    _load_project: (payload) => {
      dispatch(loadProject(payload))
    },
    _set_state: (obj) => setState(obj),
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.route.params.projectId
  const projects = state.firestore.ordered.projectsList
  const employee = state.firebase.profile

  return {
    id: id,
    projectsList: state.firestore.ordered.projectsList,
    modules: state.employee.employeeModules.accessModules,
    tasksList: state.firestore.ordered.taskslist,
    EmpDetails: employee,
    projectData: state.projects.project,
    isLoadingProject: state.projects.project.projectData.isLoading,
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
  
    if (!props.projectsList || !props.taskslist)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          subcollections: [
            {
              collection: "TASKS",
              storeAs: "taskslist",
            },
          ],
          storeAs: "taskslist",
        },
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          storeAs: "project",
        },
        {
          collection: "PROJECTS",
          storeAs: "projectsList",
        },
      ]
    return []
  })
)(Container)
