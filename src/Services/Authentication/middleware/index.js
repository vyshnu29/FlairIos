import RNFirebase from '@react-native-firebase/app';
import axios from "axios"
import {
  onLoginFailure,
  onLoginSuccess,
  onLoginRequest,
  onSignoutRequest,
  onSignoutSuccess,
  onSignoutFailure,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import auth from '@react-native-firebase/auth';
import { configuration } from "../../../config/companyConfig"

const base_url = configuration.REST_api;


export function onLogin(creds) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(onLoginRequest())
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(({ user }) => {
        console.log(user)
        dispatch(onLoginSuccess())
        return user.getIdToken()
      })
      .then((idToken) => {
        // assigning token
        console.log(idToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`
        axios.defaults.baseURL = base_url
        return
      })
      .catch((err) => {
        console.error(err)
        if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found")
          alert("Incorrect username or password.")
        else alert(err.message)
        dispatch(onLoginFailure())
      })
  }
}


export const attachTokenListener = () => {
  RNFirebase.auth().onIdTokenChanged((user) => {
    if (user) {
      user
        .getIdTokenResult()
        .then((tokenResult) => {
          console.log(tokenResult)
          const idToken = tokenResult.token
          axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`
          axios.defaults.baseURL = base_url
          return
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
}

export function onSignout() {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(onSignoutRequest())
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        return dispatch(onSignoutSuccess())
      })
      .catch((err) => {
        console.error(err)
        dispatch(onSignoutFailure())
      })
  }
}

export function forgetPassword(email) {
  console.log("gg",email)
  console.log("gg",base_url)
  return (dispatch) => {
    waitingMsg("Requesting server...")
    axios
      .post(`${base_url}/auth/forgotpassword?email=${email}`)
      .then((response) => {
        console.log(response)
        stopWaitMsg()
        successMsg(response.data.message)
      })
      .catch((err) => {
        console.log(err)
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}

export function changePassword(newPassword) {
  return (dispatch) => {
    waitingMsg("Changing Password....")
    axios
      .post(`/auth/changepassword`, { password: newPassword })
      .then((response) => {
        console.log(response)
        stopWaitMsg()
        successMsg(response.data.message)
      })
      .catch((err) => {
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}