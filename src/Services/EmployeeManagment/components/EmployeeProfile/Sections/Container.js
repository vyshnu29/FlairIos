import React from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"

function Container(props) {
  const { setState } = props
  const onDelete = () => {
    setState({

    })
  }
  return (
    <Presentation
      {...props}
      onDelete={onDelete}
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
