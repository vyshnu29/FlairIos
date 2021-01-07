import React, { useEffect, useContext, useState } from 'react'
import Presentation from "./Presentation"
import { Context } from "../component_state/context"
import { connect } from "react-redux"
import { uploadToStorage } from "../../../../../shared/fileUploader"

function Container(props) {
  const [state, handle] = useContext(Context);
  const [updatedState, setUpdatedState] = useState(state)
  const { type, loggedInEmployee } = props
  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  useEffect(() => {
    console.log("I Updated")
    setUpdatedState(state)
    console.log(state);
  }, [state.selectedRange.join(", ")])


  const handleDocumentSubmit = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = [loggedInEmployee, '_TS_', state.placementID, "_", new Date().toISOString()].join('')
      const filePath = `EMPLOYEES/${loggedInEmployee}/TIMESHEETS/${fileName}`
      console.log(updatedState);
      setState({ isDocumentUploading: true })
      return uploadToStorage(file, filePath, fileName, 'file')
        .then(url => {
          console.log(updatedState);
          setState({
            timesheetInfo: {
              ...updatedState.timesheetInfo,
              attachmentDetails: {
                publicURL: url,
                sourcePath: filePath + "." + file.name.split('.')[1]
              }
            },
            isDocumentUploading: false,
          })
        })
        .catch(err => {
          setState({ isDocumentUploading: false })
          console.log(err)
        })
    }
  }
  return (
    <div>
      <Presentation
        setState={setState}
        state={state}
        type={type}
        handleDocumentSubmit={handleDocumentSubmit}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInEmployee: state.firebase.auth.uid,
  }
}


export default connect(mapStateToProps)(Container)
