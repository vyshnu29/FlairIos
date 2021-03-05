import React, { useState } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import {errorMsg} from '../../../../shared/SnackBars/index'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

function Container(props) {
  const [state, setState] = useState({
    profile: props.profile,
    image: null,
    progress: 0,
    url: "",
    imageURL: "",
    email: "",
  })

  const handleChange = (file, email) => {
    //console.log(e.target.files[0])
    console.log(file, email)
    // this.setState({email:email})
    if (file) {
      const image = file
      setState(() => ({
        ...state,
        image,
      }))
      ImgUpload(file, email)
    } else {
    }
  }
  const ImgUpload = (image, email) => {
    var size = 5000000
    console.log(email)

    console.log(image.type)
    if (
      image.type === "image/png" ||
      image.type === "image/jpeg" ||
      image.type === "image/jpg"
    ) {
      if (image.size > size) {
        errorMsg("Image size should be less than 5MB")
        setState({
          ...state,
          image: null,
        })
      } else {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progrss function ....
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 150
            )
            console.log(progress)
            setState({
              ...state,
              progress: 150,
            })
          },
          (error) => {
            // error function ....
            console.log(error)
          },
          () => {
            // complete function ....
              storage()
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                console.log(url)
                setState({
                  ...state,
                  url,
                })
                  firestore()
                  .collection("EMPLOYEES")
                  .doc(props.profile.uid)
                  .update({
                    imageURL: url,
                  })
                setState({
                  ...state,
                  image: null,
                })
                setState({
                  ...state,
                  progress: 0,
                })
              })
          }
        )
      }
    } else {
     errorMsg("You Are Allowed To Choose Images with jpeg,png,jpg Format")
      setState({
        ...state,
        image: null,
      })
    }
  }
  return (
      <Presentation
        {...state}
        {...props}
        handleChange={handleChange}
        progress={state.progress}
      />
  )
}

export default Container
