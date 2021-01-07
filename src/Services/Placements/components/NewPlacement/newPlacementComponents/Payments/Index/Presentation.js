import React, { useState } from "react"

import History from "../History"

function Presentation(props) {
  const {
    state,
    handleSubmit,
    handleChange_Numbers,
    handleChange_Date,
    handleChange_Strings,
    handleUpdate,
    clearState,
  } = props
  const billingTypes = [
    "Per Hour",
    "Per Day",
    "Per Week",
    "Per Month",
    "Per Annum",
  ]
  const payTypes = ["Hourly", "Fixed Pay"]
  const [value, setValue] = useState(0)
  const handleTabChange = (_, value) => setValue(value)

  return (

          <History
            history={state.data}
            handleUpdate={handleUpdate}
            handleTabChange={handleTabChange}
          />

  )
}

export default Presentation
