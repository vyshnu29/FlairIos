import React, { useEffect, useState } from "react"
import Presentation from "./Presentation"
import { uploadToStorage } from "../../../../../../shared/fileUploader"
import { connect } from "react-redux"
import { editClientDetails } from "../../../../middleware"

function Container(props) {
  const { client, editClientDetails } = props
  const [state, setState] = useState({
    businessDisplayName: "",
    businessName: "",
    category: "",
    contactNumber: "",
    email: "",
    fax: "",
    federalId: "",
    jobTerminationNotice: "",
    netTerms: "",
    website: "",
    logo: "",
  })

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const tempState = {}
    Object.entries(client).forEach(([key, value]) => {
			if (state.hasOwnProperty(key)) {
				tempState[key] = value
			}
    })
    console.log(tempState)
    setState((state) => ({ ...state, ...tempState }))
  }, [client])

  const handleSubmit = (e) => {
    e.preventDefault()
    editClientDetails(state)
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      fileUpload(file)
    }
  }

  const fileUpload = async (file) => {
    const fileName = ["Clientlogo", "_", new Date().toISOString()].join("")
    const filePath = `Clients/${fileName}`
    setIsUploading(true)
    uploadToStorage(file, filePath, fileName, "profilePic")
      .then((url) => {
        console.log(url)
        setState((state) => ({ ...state, logo: url }))
        setIsUploading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsUploading(false)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
    <div>
      <Presentation
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFile={handleFile}
        isUploading={isUploading}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editClientDetails: (payload) => {
      dispatch(editClientDetails(payload, ownProps.client.id))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
