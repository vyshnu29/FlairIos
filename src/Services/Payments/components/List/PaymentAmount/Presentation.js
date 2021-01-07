import React from "react"
import { TextField } from "@material-ui/core"
import { CurrencyFormatter } from "../../../../../shared/customNumberFormats"

function Presentation(props) {
  const { index, value, handleChange } = props

  return (
    <div>
      <TextField
        size="small"
        onChange={(e) => handleChange(index, e.target.value)}
        value={value}
        required
        label="Amount"
        InputProps={{
          inputComponent: CurrencyFormatter,
        }}
      />
    </div>
  )
}

export default Presentation
