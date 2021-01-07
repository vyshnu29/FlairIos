import React, { useState, useEffect } from 'react'
import Presentation from "./Presentation"
import validate from "../../../../../../shared/validation"
import { loadInvoiceAttachments, sendInvoiceToClient, loadMailReceivers } from "../../../../middleware/invoiceList"
import { connect } from "react-redux"


function Container(props) {
  const { row, send_invoice_to_client, invoiceState, load_invoice_attachments, _load_mail_receivers } = props
  const idExist = invoiceState.sendInvoiceToClient.attachments.hasOwnProperty(row.id)
  const attachmentsInState = idExist ? invoiceState.sendInvoiceToClient.attachments[row.id] : { isLoading: true }

  const [state, setState] = useState({
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    body: '',
    helperText: {
      to: '',
      cc: '',
      bcc: '',
    },
    attachment: [],
    isUploading: false
  })
  const [open, setOpen] = React.useState(false)
  const [isMailing, setIsMailing] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (obj) => {
    setState({
      ...state,
      ...obj
    })
  }

  const handleSend = () => {
    const { to, cc, bcc, subject, attachment, body } = state
    const mail = {
      to,
      cc,
      bcc,
      subject,
      body
    }

    handleClose()
    send_invoice_to_client(mail, row.id)
  }

  const handleAdd = (name, chip) => {
    let data = state[name]
    if (validate.checkEmail(chip)) {
      data = [...data, chip]
      handleChange({
        helperText: {
          to: '',
          cc: '',
          bcc: '',
        },
      })
    } else {
      handleChange((prevState) => ({
        helperText: {
          ...prevState.helperText,
          [name]: 'Enter valid email',
        },
      }))
    }
    handleChange({ [name]: data })
    console.log('add', data)
  }

  const handleDelete = (name, index) => {
    let data = state[name]
    data.splice(index, 1)
    handleChange({ [name]: data })
    console.log('delete', data)
  }

  useEffect(() => {
    setIsMailing(invoiceState.actions.mailingInvoices.includes(row.id))
  }, [invoiceState.actions.mailingInvoices.includes(row.id)])

  useEffect(() => {
    if (open) {
      handleChange({
        subject: row.id,
        to: row.mailReceivers.to,
        cc: row.mailReceivers.cc,
        bcc: row.mailReceivers.bcc
      })
      load_invoice_attachments(row, row.id)
    }
  }, [open])

  useEffect(() => {
    if (!attachmentsInState.isLoading && open) {
      const timesheetAttachments = attachmentsInState.data.filter(item => item.type === "timesheet")
      const expenseAttachments = attachmentsInState.data.filter(item => item.type === "expense")
      const invoiceAttachments = attachmentsInState.data.filter(item => item.type === "invoice")
      let content = `
        <div>
        <h3><u>Timesheets</u></h3>
          ${timesheetAttachments.map(item => {
        return `
                <div>
                  <a target='_blank' href='${item.url}' >${item.name}</a>
                </div>
                <br>
              `
      })
        }
        </div>
          
        <hr><br>
        <div>
        <h3><u>Expenses</u></h3>
          ${expenseAttachments.map(item => {
          return `
                <div>
                  <a target='_blank' href='${item.url}' >${item.name}</a>
                </div>
                <br>
              `
        })
        }
        </div>
      <hr><br>
      <div>
        <h3><u>Invoice</u></h3>
        ${invoiceAttachments.map(item => {
          return `
                <div>
                  <a target='_blank' href='${item.url}' >${item.name}</a>
                </div>
                <br>
              `
        })
        }
      </div>
        
          `
      handleChange({ body: content })
    }

  }, [idExist, attachmentsInState.isLoading])




  return (
    <div>
      <Presentation
        handleChange={handleChange}
        row={props.row}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleSend={handleSend}
        open={open}
        state={state}
        isMailing={isMailing}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return { invoiceState: state.invoice.invoiceList }
}

const mapDispatchToProps = dispatch => ({
  send_invoice_to_client: (inputs, invoiceID) => dispatch(sendInvoiceToClient(inputs, invoiceID)),
  load_invoice_attachments: (invoice, invoiceID) => dispatch(loadInvoiceAttachments(invoice, invoiceID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)