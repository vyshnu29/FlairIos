import React, { useEffect, useState } from "react"
import Presentation from "./Presentation"
import { uploadBusinessInformation } from "../../../../middleware"
import { connect } from "react-redux"
import make_API_Call from "../../../../../../providers/REST_API"
import { uploadToStorage } from "../../../../../../shared/fileUploader"

function Container(props) {
  const { businessInformation, setBusinessInformation } = props

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    make_API_Call("get", "/loadcountries")
      .then((data) => {
        handleKeyValuePair("countries", data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

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
        handleKeyValuePair("logo", url)
        setIsUploading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsUploading(false)
      })
  }

  const handleChange = (event) => {
    setBusinessInformation({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const handleKeyValuePair = (name, value) => {
    setBusinessInformation({
      name:
        name === "state"
          ? "invoiceLocation-state"
          : name === "country"
          ? "invoiceLocation-country"
          : name,
      value,
    })
  }

  return (
    <div>
      <Presentation
        businessInformation={businessInformation}
        handleChange={handleChange}
        handleKeyValuePair={handleKeyValuePair}
        isUploading={isUploading}
        handleFile={handleFile}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    businessInformation: state.client.newClient.businessInformation,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setBusinessInformation: (payload) => {
      dispatch(uploadBusinessInformation(payload))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
