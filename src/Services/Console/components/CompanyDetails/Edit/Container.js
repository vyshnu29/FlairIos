import React, { useState } from "react"
import { connect } from "react-redux"
import { submitCompanyDetails, uploadCompanyDetails } from "../../../middleware"
import Presentation from "./Presentation"
import { uploadToStorage } from "../../../../../shared/fileUploader"

function Container(props) {
  const { companyDetails, setCompanyDetails, submitDetails } = props

  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(companyDetails)
    submitDetails()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCompanyDetails(name, value)
  }

  const handleFile = (e, name) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      const names = name.split("-")
      fileUpload(file, names[1], name)
    }
  }

  const fileUpload = async (file, name, fullName) => {
    const fileName = name
    const filePath = `CompanyDetails/${fileName}`
    setIsUploading(true)
    uploadToStorage(file, filePath, fileName, "file")
      .then((url) => {
        console.log(url)
        setCompanyDetails(fullName, url)
        setIsUploading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsUploading(false)
      })
  }

  return (
    <div>
      <Presentation
        companyDetails={companyDetails}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleKeyValuePair={setCompanyDetails}
        isUploading={isUploading}
        handleFile={handleFile}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    companyDetails: state.console.companyDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCompanyDetails: (name, value) => {
      dispatch(uploadCompanyDetails(name, value))
    },
    submitDetails: () => {
      dispatch(submitCompanyDetails())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
