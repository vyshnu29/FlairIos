import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { uploadConatctsInformation } from "../../../../../middleware"

function Container(props) {
  const { contactsList, setConatctsInformation } = props

  const [value, setValue] = useState(0)

  const addContact = () => {
    let id = contactsList[contactsList.length - 1].id + 1
    let data = contactsList
    let newContact = {
      key: id,
      id: id,
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
      isDraft: true,
    }
    data = [...data, newContact]
    setConatctsInformation({ contactsList: data })
  }

  const deleteContact = (e) => {
    e.stopPropagation()
    if (contactsList.length === 1) {
      return
    }
    let tabID = parseInt(e.target.id)
    let tabIDIndex = 0
    let tabList = contactsList.filter((value, index) => {
      if (value.id === tabID) {
        tabIDIndex = index
      }
      return value.id !== tabID
    })

    let curValue = parseInt(value)
    if (curValue === tabID) {
      if (tabIDIndex === 0) {
        curValue = contactsList[tabIDIndex + 1].id
      } else {
        curValue = contactsList[tabIDIndex - 1].id
      }
    }
    setValue(curValue)

    setConatctsInformation({ contactsList: tabList, status: false })
  }

  const handleTabChange = (_, value) => {
    setValue(value)
  }

  const state = {
    contactsList,
    value,
  }

  return (
    <div>
      <Presentation
        {...state}
        handleTabChange={handleTabChange}
        addContact={addContact}
        deleteContact={deleteContact}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    contactsList: state.client.newClient.contacts.contactsList,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setConatctsInformation: (payload) => {
      dispatch(uploadConatctsInformation(payload))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
