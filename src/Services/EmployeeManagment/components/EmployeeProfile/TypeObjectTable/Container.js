import React from 'react'
import Presentation from "./Presentation"
import { _set_state } from "../../../middleware/dynamicProfileRender"
import { connect } from "react-redux"

function Container(props) {
  let newdata = props.route.params.data
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