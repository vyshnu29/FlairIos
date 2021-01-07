import React, { Component } from 'react'
import Presentation from '../Login/Presentation'
import {onLogin} from '../../middleware/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
	waitingMsg,
	stopWaitMsg,
	errorMsg,
	successMsg,
  } from "../../../../shared/SnackBars/index"

export class Container extends Component {
    state = {
        email: '',
        password: '',
       
    }



    handleChange = (input, value) => {
        this.setState({
            [input]: value
        })
    }


    CheckLogin = (e) => {
		e.preventDefault();
        const {onLogin} = this.props;
        if (this.state.email != '') {
            if (this.state.password != '') {
                onLogin(this.state);
            } else {
				errorMsg('Please Enter Password');
            }
          } else {
            errorMsg('Please Enter Email');
          }
        
      };
   
    render() {
        return (
            <Presentation
                {...this.state}
                handleChange={this.handleChange}
                CheckLogin={this.CheckLogin}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
	console.log(state)
	return {
		auth: state.firebase.auth,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onLogin: (creds) => {
			dispatch(onLogin(creds))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
