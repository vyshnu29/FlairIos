import React, { useContext, useEffect } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import validation from "../../../../../shared/validation"

function Container(props) {
  const { modules } = props
  

  return (
      <Presentation
        {...props}
        modules={modules}
      />

  )
}

// const mapStateToProps = (state) => {
//     return {

//     }
// }
const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(Container)
