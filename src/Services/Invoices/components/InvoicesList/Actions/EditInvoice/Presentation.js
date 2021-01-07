import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from "@material-ui/core"

function Presentation({ goToEditPage, row }) {
  const { isMailedToClient, isVoid, isPaymentDone } = row
  return (
    <div>
      <IconButton hidden={isMailedToClient || isVoid || isPaymentDone} onClick={goToEditPage} >
        <EditIcon />
      </IconButton>
    </div>
  )
}

export default Presentation
