import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import { loadDueInvoices, loadOpenInvoices, loadPaidInvoices, loadVoidInvoices, loadAllInvoices, setState, unSubscribeListener } from "../../../middleware/invoiceList"


function Container(props) {
    const {
        _load_due_invoices,
        _load_open_invoices,
        _load_void_invoices,
        _load_paid_invoices,
        _load_all_invoices,
        _un_subscribe_listener,
        _set_state,
        state,
        condition
    } = props
    const tabPair = ["dueInvoices", "openInvoices", "voidInvoices", "paidInvoices", "allInvoices"]

    useEffect(() => {
        _un_subscribe_listener(tabPair[condition])
        switch (condition) {
            case 0: return _load_due_invoices();

            case 1: return _load_open_invoices();

            case 2: return _load_void_invoices();

            case 3: return _load_paid_invoices();

            case 4: return _load_all_invoices();

            default:
                break;
        }
    }, [condition])

    return (
   
            <Presentation
                state={state}
                {...props}
                condition={condition}
                tabPair={tabPair}
            />
      
    )
}


const mapStateToProps = (state) => {
    return {
        modules: state.employee.employeeModules.accessModules,
        loggedInEmployee: state.firebase.auth.uid,
        trackInvoiceSubmissions: state.firestore.data.trackInvoiceSubmissions,
        state: state.invoice.invoiceList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _load_open_invoices: () => dispatch(loadOpenInvoices()),
        _load_due_invoices: () => dispatch(loadDueInvoices()),
        _load_void_invoices: () => dispatch(loadVoidInvoices()),
        _load_paid_invoices: () => dispatch(loadPaidInvoices()),
        _load_all_invoices: () => dispatch(loadAllInvoices()),
        _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
        _set_state: (obj) => setState(obj)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
