import React, { useContext, useEffect } from 'react'
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import validation from "../../../../../shared/validation"

function Container(props) {
  
   
    const { trackInvoiceSubmissions } = props


    return (
      
            <Presentation
                {...props}
                trackInvoiceSubmissions={trackInvoiceSubmissions ? trackInvoiceSubmissions : { open: 0, void: 0, paid: 0 }}
            // dueRanges={dueRanges}
            // voidInvoices={voidInvoices}
            // paidInvoices={paidInvoices}
            // openInvoices={openInvoices}
            />
        
    )
}

const mapStateToProps = (state) => {
    return {
        modules: state.employee.employeeModules.accessModules,
        loggedInEmployee: state.firebase.auth.uid,
        trackInvoiceSubmissions: state.firestore.data.trackInvoiceSubmissions
    }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) => {
    if (props.modules.includes("timesheets-manager"))
        return [
            {
                collection: "ID_TRACKER",
                doc: "invoices",
                storeAs: "trackInvoiceSubmissions",
            },
        ]
    return []
}))(Container)
