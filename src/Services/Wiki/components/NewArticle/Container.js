import Spinner from 'react-native-loading-spinner-overlay'
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"

import { uploadToStorage } from "../../../../shared/fileUploader"
import { addNewArticle, updateArticle } from "../../middleware"

function Container(props) {
  const {
    articleId,
    categoryMetaInfo,
    selectedArticle,
    onAddArticle,
    onUpdateArticle,
  } = props

  const [state, setState] = useState ({
    title: "",
    categoryId: "",
    categoryName:"",
    content: "",
    isUploading: false,
    attachments: [],
    categoryMetaInfo: [],
  })

  const handleChange = (key, value , name ,val1) => {
    // clearState()
     console.log("Aa",value)
    setState((state) => ({ ...state, [key]: value }))
    setState((state) => ({ ...state, [name]: val1 }))
  }
  

  useEffect(() => {
    if (isLoaded(categoryMetaInfo)) {
      const metaInfo = Object.entries(categoryMetaInfo[0].types).map(
        ([key, value]) => {
          return {
            name: value,
            id: key,
          }
        }
      )
      setState((state) => ({ ...state, categoryMetaInfo: metaInfo }))
    }

    if (props.route.params.search !== "") setState((state) => ({ ...state, title: props.route.params.search }))

    if (props.route.params.isEdit) {
      if (isLoaded(selectedArticle)) {
        const { categoryId, title, content, attachments } = selectedArticle[0]
        setState((state) => ({
          ...state,
          categoryId,
          title,
          content,
          attachments,
        }))
      }
    }
  }, [selectedArticle, categoryMetaInfo])


  // const handleKeyValuePairs = (key, value) => {
  //   setState((state) => ({ ...state, [key]: value }))
  // }

  const handleFile = (e) => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        setState((state) => ({ ...state, file : response}))
      }
     // console.log(response.uri)
      fileUpload(response)
    });
   
  }

  const fileUpload = async (file) => {
    const fileName = file.fileName.split(".")[0]
    const filePath = `Wiki/Documents/${fileName}`
    setState((prevState) => ({ ...prevState, isUploading: true }))
    uploadToStorage(file, filePath, fileName, "file")
      .then((url) => {
        console.log(url)
        setState((prevState) => ({
          ...prevState,
          attachments: prevState.attachments.concat({ name: file.fileName, url }),
          isUploading: false,
        }))
      })
      .catch((err) => {
        console.error(err)
        setState((prevState) => ({ ...prevState, isUploading: false }))
      })
  }

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = state.attachments.filter((_, i) => i !== index)
    setState((state) => ({ ...state, attachments: updatedAttachments }))
  }

  const handleSubmit = (e) => {
    props.navigation.goBack();
    e.preventDefault()
    if (props.route.params.isEdit) {
      console.log("edit")
      onUpdateArticle(
        {
          title: state.title,
          content: state.content,
          attachments: state.attachments,
        },
        articleId,
        state.categoryId
      )
    } else {
      console.log("new")
      onAddArticle(
        {
          title: state.title,
          content: state.content,
          attachments: state.attachments,
        },
        state.categoryId
      )
    }
  }

  return isLoaded(categoryMetaInfo) && state.categoryMetaInfo.length ? (
      <Presentation
        {...state}
        {...props}
        isEdit={props.route.params.isEdit}
        handleChange={handleChange}
       // handleKeyValuePairs={handleKeyValuePairs}
     //  handleNameChange={handleNameChange}
        handleFile={handleFile}
        handleDeleteAttachment={handleDeleteAttachment}
        handleSubmit={handleSubmit}
      />
  ) : (
    <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  return {
    selectedArticle: firestore.selectedArticle,
    categoryMetaInfo: firestore.categoryMetaInfo,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddArticle: (payload, categoryId) => {
      dispatch(addNewArticle(payload, categoryId))
    },
    onUpdateArticle: (payload, articleId, categoryId) => {
      dispatch(updateArticle(payload, articleId, categoryId))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (props.route.params.isEdit)
      return [
        {
          collection: "WIKI",
          where: [
            ["id", "==", props.articleId],
            ["isExist", "==", true],
          ],
          storeAs: "selectedArticle",
        },
        {
          collection: "ID_TRACKER",
          doc: "categories",
          storeAs: "categoryMetaInfo",
        },
      ]
    return [
      {
        collection: "ID_TRACKER",
        doc: "categories",
        storeAs: "categoryMetaInfo",
      },
    ]
  })
)(Container)
