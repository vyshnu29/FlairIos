import React, { useEffect } from "react"
import Presentation from "./Presentation"
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay'
import {ActivityIndicator} from 'react-native'
import { getModules } from "../../Services/EmployeeManagment/middleware"
import { onSignout } from "../../Services/Authentication/middleware/index"
import { compose } from "redux"
import { attachTokenListener } from '../../Services/Authentication/middleware/index'
import { firestoreConnect, isLoaded } from "react-redux-firebase"

function Container(props) {
  const {
    names,
    clients_meta_info,
  } = props


  const  SignOut = () => {
        const {onSignout} = props
        onSignout()
    }
 
    useEffect(() => {
      attachTokenListener()
    }, [])

  // useEffect(() => {
  //   getModules()
  // }, [getModules])

  if (
    // isFetching &&
    // accessModules.length &&
    isLoaded(names) &&
    isLoaded(clients_meta_info)
  )
    return (
        <Presentation 
        {...props}
        SignOut={SignOut}
        />
    )
    return (<Spinner visible={true}/>)
}



const mapStateToProps = (state, ownProps) => {
  return {
    // accessModules: state.employee.employeeModules.accessModules,
    // isFetching: state.employee.employeeModules.isFetching,
    names: state.firestore.ordered.names,
    clients_meta_info: state.firestore.ordered.clients_meta_info,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignout: () => {
      dispatch(onSignout())
    },
    // getModules: () => {
    //   dispatch(getModules())
    // },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "META_INFO",
        doc: "employees",
        storeAs: "names",
      },
      {
        collection: "META_INFO",
        doc: "clients",
        storeAs: "clients_meta_info",
      },
    ]
  })
)(Container)