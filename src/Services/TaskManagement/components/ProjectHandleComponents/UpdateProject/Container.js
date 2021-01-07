import React, { useState } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { projectUpdation } from "../../../middleware"


function Container(props) {

	const [state, setState] = useState({
    title: props.route.params.project.title,
    startdate: props.route.params.project.startdate,
    enddate: props.route.params.project.enddate,
    status: props.route.params.project.status,
    firsttitle: props.route.params.project.title,
    useLabels: props.route.params.project.useLabels,
    useTimeline: props.route.params.project.useTimeline,
  })
  const handleChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    })
    console.log(name,val)
    console.log(state)
  }

  const handleCheck = (name,checked) => {
    console.log("Avf",name,checked)
    setState({
      ...state,
      [name]: checked,
    })
    console.log(state)
  }
 const handleDateChange = (key, value) => {
   if (!isNaN(Date.parse(value)))
    setState({
      ...state,
      [key]: new Date(value).toISOString()
    })
       
}

  

  // if (state.firsttitle == "") {
  //   setState({
  //     firsttitle: state.title,
  //   })
  // }
  const oldContent = {
    ...state,
    enddate: state.enddate,
  }
  const handleDropdown = (key, value) => {
    console.log("dropdown")
    console.log(value)
    setState({
      ...state,
      [key]: value,
    })
  }

  const handleEmployees = (value) => {
    setState({
      ...state,
      employees: value,
    })
  }
  console.log(state)
  const handleUpdate = (e) => {
    e.preventDefault()
    console.log(state)
    const { projectUpdation } = props
    const { title, status, startdate, enddate, useLabels, useTimeline } = state
    let projectInfo = {
      title,
      status,
      startdate,
      enddate,
      useLabels,
      useTimeline,
      id: props.route.params.project.id,
      cid: props.route.params.project.cid,
    }
    console.log(projectInfo)
    projectUpdation(projectInfo)
    // dispatch({
    //   type: UPDATE_PROJECT,
    //   payload: {
    //     title,
    //     status,
    //     startdate,
    //     enddate,
    //     useLabels,
    //     useTimeline,
    //   },
    // })
  }
	
	return (
      <Presentation
        {...props}
        {...state}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleEmployees={handleEmployees}
        //errCount={errCount}
        handleUpdate={handleUpdate}
        handleDropdown={handleDropdown}
        oldContent={oldContent}
        handleCheck={handleCheck}
      />
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    projectUpdation: (payload) => {
      dispatch(projectUpdation(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)

