import React from "react"
import { connect } from "react-redux"
import { isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import Spinner from 'react-native-loading-spinner-overlay'
function Container(props) {
  const { accounts } = props
  console.log("Ss",accounts)
  if (isLoaded(accounts)) {
    return (
    
        <Presentation {...props} client={props.client} />
    )
  }

  return (
   <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.firestore.ordered.accounts,
  }
}

export default connect(mapStateToProps)(Container)
