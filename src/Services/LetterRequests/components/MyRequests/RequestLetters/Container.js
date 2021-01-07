import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { uploadToStorage } from "../../../../../shared/fileUploader"

function Container(props) {
  const { employee } = props
  const [state, setState] = useState({
    type: "",
    req_doc: "",
    isUploading: false,
  })
  const [description, setDescription] = useState("")
  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }
  const handleDescription = (key, value) => {
    setDescription(value)
  }
  const clearValues = () => {
    setState({
      ...state,
      type: "",

      req_doc: "",
    })
    setDescription("")
  }

  const handleChange2 = (e) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      const file = e.target.files[0]
      console.log(file)
      // setState(() => ({ file }))
      fileUpload1(file)
    }
  }
  const fileUpload1 = (file) => {
    const employeeCompanyID = employee.companyID
    const fileName = [
      employeeCompanyID,
      "_LT_",
      state.type.replace(/ /g, "").toLowerCase(),
      "_",
      new Date().toISOString(),
      ".",
      file.name.split(".")[1],
    ].join("")
    const filePath = `EmployeeLetter/${employeeCompanyID}/${state.type
      .replace(/ /g, "")
      .toLowerCase()}/${fileName}`
    setState({
      ...state,
      isUploading: true,
    })
    return uploadToStorage(file, filePath, fileName, "file")
      .then((url) => {
        setState({
          ...state,
          req_doc: url,
          isUploading: false,
        })
      })
      .catch((err) => {
        setState({
          ...state,
          isUploading: false,
        })
        console.log(err)
      })
  }

  const handleNewRequest = (universityDetails) => {
    console.log(state)
    
  }
  const { type, req_doc, isUploading } = state

  if (type !== "" && description !== "") {
    let state = {
      type: type,
      req_doc: req_doc,
      isUploading: isUploading,
      description: description,
    }
    props.requestDetailsVerified(true, state)
  } else {
    let state = {
      type: type,
      req_doc: req_doc,
      isUploading: isUploading,
      description: description,
    }
    props.requestDetailsVerified(false, state)
  }
  return (
    <div>
      <Presentation
        {...state}
        {...props}
        handleChange={handleChange}
        clearValues={clearValues}
        handleChange2={handleChange2}
        handleNewRequest={handleNewRequest}
        handleDescription={handleDescription}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    employee: state.firebase.profile,
  }
}
export default connect(mapStateToProps)(Container)
