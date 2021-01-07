import axios from "axios"
import React, { useEffect } from "react"
const stateLoader = async (code) => {
  try {
    let response = await axios.get(`/loadstates?countrycode=${code}`)
    if (response.data.length) {
      return response.data
    } else {
      return [
        {
          id: "no_state",
          state_code: "no_state",
          country_code: code,
          name: "None",
        },
      ]
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export default stateLoader
