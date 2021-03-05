import React from 'react'
import Presentation from "./Presentation"
import { _set_state } from "../../../middleware/dynamicProfileRender"
import { connect } from "react-redux"

function Container(props) {
let newdata = props.route.params.data
const { setState, state, section } = props
  const onDelete = (index) => {
    const profile = JSON.parse(JSON.stringify(state.employeeProfile.data))
    const data = profile[section.access_key]
    data.splice(index, 1)
    profile[section.access_key] = data
    setState({
      employeeProfile: {
        ...state.employeeProfile,
        data: profile
      }
    })
  }
  return (
    <Presentation
    {...props}
      data={newdata}
    />
  )
}

const mapStateToProps = state => ({
  state: state.employee.dynamicProfileRender
})

const mapDispatchToProps = dispatch => ({
  setState: (obj) => dispatch(_set_state(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)