import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { uploadConatctsInformation } from "../../../../../middleware"
import make_API_Call from "../../../../../../../providers/REST_API"

function Container(props) {
  const { item, index, contactsList, setConatctsInformation } = props
  const [state, setState] = useState({
    representativeName: "",
    jobTitle: "",
    contactType: "",
    gender: "",
    email: "",
    mobile: "",
    workPhone: "",
    homePhone: "",
    line1: "",
    line2: "",
    country: "",
    state_name: "",
    city: "",
    zip: "",
    workPhoneExtension: "",
    countries: [],
    states: [],
  })

  useEffect(() => {
    Object.entries(item).forEach(([key, value]) => {
      setState((prevState) => ({
        ...prevState,
        [key]: value,
      }))
    })
     make_API_Call("get", "/loadcountries")
       .then((data) => {
         handleKeyValuePair("countries", data)
       })
       .catch((err) => {
         console.error(err)
       })
  }, [item])

  const onSubmit = (e) => {
    e.preventDefault()
    let payload = {
      ...state,
      key: index,
      id: index,
      isDraft: false,
    }

    let data = contactsList
    data[index] = payload

    setConatctsInformation({ contactsList: data })
  }

  const handleKeyValuePair = (key, value) => {
    const name =
      key === "state" ? "state_name" : key === "country" ? "country" : key
    setState((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  return (
    <div>
      <Presentation
        contact={state}
        index={index}
        handleChange={handleChange}
        onSubmit={onSubmit}
        handleKeyValuePair={handleKeyValuePair}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setConatctsInformation: (payload) => {
      dispatch(uploadConatctsInformation(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
