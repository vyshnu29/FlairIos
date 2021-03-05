import React, { useEffect, useState } from "react"
import Presentation from "./Presentation"
import { uploadBusinessInformation } from "../../../../middleware"
import { connect } from "react-redux"
//
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
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        fileUpload(response)
      }
     // console.log(response.uri)
      
    });
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

  const handleChange = (key,value) => {
    console.log("Sss",key,value)
    setBusinessInformation({
      name: key,
      value: value,
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
  
      <Presentation
        businessInformation={businessInformation}
        handleChange={handleChange}
        handleKeyValuePair={handleKeyValuePair}
        isUploading={isUploading}
        handleFile={handleFile}
      />

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
