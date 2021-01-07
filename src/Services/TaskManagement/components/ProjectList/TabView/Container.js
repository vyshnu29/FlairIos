import React, { useContext, useEffect } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { loadAllProjects } from "../../../middleware/projectsList"
function Container(props) {
  const { modules } = props
  const { state, _load_all_projects } = props
  useEffect(() => {
    _load_all_projects()
  },[])

  return (
      <Presentation
        {...props}
        modules={modules}
      />
  )
}
const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    state: state.projects.projectsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_all_projects: () => dispatch(loadAllProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
