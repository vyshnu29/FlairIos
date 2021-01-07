import {
  setAccountsInformation,
  setBusinessInformation,
  setContactsInformation,
  setLocationsInformation,
  countriesError,
  countriesRequest,
  countriesSuccess,
} from "../actions/actionCreators"
import axios from "axios"
import {
  stopWaitMsg,
  waitingMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import make_API_Call from "../../../providers/REST_API"

export function setCountries() {
  return (dispatch) => {
    dispatch(countriesRequest())
    make_API_Call("get", "/loadcountries")
      .then((data) => {
        dispatch(countriesSuccess(data))
      })
      .catch((err) => {
        dispatch(countriesError(err))
      })
  }
}

export function uploadBusinessInformation(payload) {
  return (dispatch, getState) => {
    const { name, value } = payload
    const businessInformation = getState().client.newClient.businessInformation
    if (!name.includes("-")) {
      const data = {
        ...businessInformation,
        [name]: value,
      }
      dispatch(setBusinessInformation(data))
    } else {
      const words = name.split("-")
      const word1 = words[0]
      const word2 = words[1]
      const data = {
        ...businessInformation,
        [word1]: {
          ...businessInformation[word1],
          [word2]: value,
        },
      }
      dispatch(setBusinessInformation(data))
    }
  }
}

export function uploadConatctsInformation(payload) {
  return (dispatch) => {
    const { contactsList } = payload
    console.log(contactsList)
    dispatch(
      setContactsInformation({
        contactsList,
        status: contactsList.filter((contact) => !contact.isDraft).length > 0,
      })
    )
  }
}

export function uploadAccountsInformation(payload) {
  return (dispatch, getState) => {
    const { name, value } = payload
    const accounts = getState().client.newClient.accounts
    if (!name.includes("-")) {
      dispatch(
        setAccountsInformation({
          ...accounts,
          [name]: value,
        })
      )
    } else {
      const words = name.split("-")
      const word1 = words[0]
      const word2 = words[1]
      dispatch(
        setAccountsInformation({
          ...accounts,
          [word1]: {
            ...accounts[word1],
            [word2]: value,
          },
        })
      )
    }
  }
}

export function uploadLocationsInformation(payload) {
  return (dispatch, getState) => {
    const { locationsList } = payload
    dispatch(
      setLocationsInformation({
        locationsList,
        status:
          locationsList.filter((location) => !location.isDraft).length > 0,
      })
    )
  }
}

export function deleteClient(id) {
  return (dispatch) => {
    waitingMsg(`Deleting ${id}...`)
    make_API_Call("delete", `/clients/delete/${id}`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function createClient(history) {
  return (dispatch, getState) => {
    const newClient = getState().client.newClient

    let businessInformation = {}
    let accounts = {}
    let locations = []
    let contacts = []

    newClient.contacts.contactsList
      .filter((item) => !item.isDraft)
      .forEach((contact) => {
        let req_contact = {}
        Object.entries(contact).forEach(([key, value]) => {
          if (
            key !== "key" &&
            key !== "id" &&
            key !== "countries" &&
            key !== "states" &&
            key !== "isDraft"
          ) {
            req_contact[key] = value
          }
        })
        contacts.push(req_contact)
      })

    newClient.locations.locationsList
      .filter((item) => !item.isDraft)
      .forEach((location) => {
        let req_location = {}
        Object.entries(location).forEach(([key, value]) => {
          if (
            key !== "key" &&
            key !== "id" &&
            key !== "countries" &&
            key !== "states" &&
            key !== "isDraft"
          ) {
            req_location[key] = value
          }
        })
        locations.push(req_location)
      })

    Object.entries(newClient.businessInformation).forEach(([key, value]) => {
      if (key !== "status" && key !== "countries" && key !== "states") {
        businessInformation[key] = value
      }
    })

    Object.entries(newClient.accounts).forEach(([key, value]) => {
      if (key !== "discountStatus" && key !== "helperText") {
        accounts[key] = value
      }
    })

    const payload = {
      ...businessInformation,
      locations,
      contacts,
      accounts,
    }
    console.log(payload)
    waitingMsg("Creating client...")
    axios
      .post("/clients/new", payload)
      .then((response) => {
        stopWaitMsg()
        console.log(response)
        successMsg("Created Successfully")
        history.push("/console/clientslist")
      })
      .catch((err) => {
        stopWaitMsg()
        console.error(err)
        errorMsg("Something went wrong")
      })
  }
}

export function editClientDetails(payload, clientId) {
  return function (dispatch) {
    waitingMsg(`Updating ${clientId}`)
    make_API_Call("put", `/clients/update/${clientId}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function contactActions(payload, actionType) {
  return function () {
    console.log(payload, actionType)
    waitingMsg(`Please wait...`)
    make_API_Call("post", `/clients/contacts/${actionType}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function locationActions(payload, actionType) {
  return function () {
    waitingMsg(`Please wait...`)
    make_API_Call("post", `/clients/locations/${actionType}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function accountsUpdate(payload, clientId, accountsId) {
  return function () {
    waitingMsg(`Please wait...`)
    make_API_Call(
      "put",
      `/clients/accounts/update/${clientId}/${accountsId}`,
      payload
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}