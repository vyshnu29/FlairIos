import React,{useEffect} from "react"
import { connect } from "react-redux"
import Drawer from './Navigation/Drawer/index'
import { loadCompanyDetails } from "./Services/Console/middleware"
import LoginScreen from "./Services/Authentication/components/Login/index"

function App(props) {
	const { auth, _load_company_details } = props

  useEffect(() => {
    _load_company_details()
  })
	return auth.uid ? (
    <Drawer/>
  ) : (
   <LoginScreen/>
  )
}

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = dispatch => ({
	_load_company_details: (data) => dispatch(loadCompanyDetails(data))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)