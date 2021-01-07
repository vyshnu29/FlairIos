import React from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { createLabels, updateLabels, deleteLabels } from "../../middleware"
import Spinner from "react-native-loading-spinner-overlay"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"

function Container(props) {

  const [state , setState] = React.useState({
    label:"",
    color:"",
    Reqid:""
  })
  const  handleEdit = (item) =>{
    setState({
        label:item.label,
        color:item.color,
      Reqid:item.id
    })
}
  const handleChange = (key, value) => {
    console.log("acc",key,value),
     setState({
       ...state,
       [key] : value,
     })
   }

  const checkColor = (name) => {
    const exp = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i
    return exp.test(name.trim())
  }
    const LabelNameValidation = {
      checkName: (name) => {
        const exp = /^[a-zA-Z \-  0-9\b]{1,}$/
        return exp.test(name.trim())
      },
    }
  const deleteLabel = (e) => {
    const { deleteLabels } = props
    let data = {
      id: e.id,
      projectId: props.route.params.projectId,
    }
    deleteLabels(data)
   
  }

  const updateLabel = () => {
    const { updateLabels } = props

    if (state.label && state.color) {
      if (checkColor(state.color)) {
        if (LabelNameValidation.checkName(state.label)) {

          let data = {
            projectId: props.route.params.projectId,
            labelName: state.label,
           labelId: state.Reqid,
            labelColorCode: state.color,
          }
        
          updateLabels(data)
        }
        else {
       return alert("Label name is invalid. No special charaters are allowed")
          
        }
      } else {
       return alert("color code is invalid")
      }
    } else if (!state.label) {
      return alert("Name should not be empty string")
    } else if (!state.color) {
      return alert("Color should not be empty string")
    }

  
  }
  const  clearValues=()=>{
    setState({
        label:"",
        color:"",
    })
}
  const createNewLabel = () => {
    console.log(props.route.params.projectId)
    const { createLabels } = props
    if (state.label && state.color) {
      if (checkColor(state.color)) {
         if (LabelNameValidation.checkName(state.label)) {
           let data = {
             projectId: props.route.params.projectId,
             labelName: state.label,
             labelId: state.Reqid,
             labelColorCode: state.color,
           }

           updateLabels(data)
         } else {
           return alert(
             "Label name is invalid. No special charaters are allowed"
           )
         }
        let data = {
          labelName: state.label,
          labelColorCode: state.color,
          projectId: props.route.params.projectId,
        }
        createLabels(data)
      } else {
        return alert("color code is invalid")
      }
    } else if (!state.label ) {
      return alert("Name should not be empty string")
    } else if (!state.color ) {
      return alert("Color should not be empty string")
    }
   
  }
  console.log("ll",props.project)
  if (isLoaded(props.project))
    return (
        <Presentation
          {...props}
          label={state.label}
          color={state.color}
          clearValues={clearValues}
          handleEdit={handleEdit}
          handleChange={handleChange}
          createNewLabel={createNewLabel}
          updateLabel={updateLabel}
          deleteLabel={deleteLabel}
        />
    )
  return <Spinner visible={true} />
}
 const mapStateToProps = (state, ownProps) => {
   return {
     project: state.firestore.ordered.project
       ? state.firestore.ordered.project
       : state.firestore.ordered.project,
   }
 }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createLabels: (payload) => {
      dispatch(createLabels(payload))
    },
    updateLabels: (payload) => {
      dispatch(updateLabels(payload))
    },
    deleteLabels: (payload) => {
      dispatch(deleteLabels(payload))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.project)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          storeAs: "project",
        },
      ]
    return []
  })
)(Container)
