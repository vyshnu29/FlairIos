import React from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
} from "../../middleware"

function Container(props) {
  const { onRowAdd, onRowDelete, onRowUpdate } = props
  const [state , setState] = React.useState({
    name:"",
    CreatedOn:"",
    CreatedBy:"",
    totaldata:[],
    description:"",
    editSection:[],
    Reqid:""
  })

 const handleChange = (key, value) => {
   console.log("acc",key,value),
    setState({
      ...state,
      [key] : value,
    })
    console.log("ss",state.name,state.description)
  }
const  clearValues=()=>{
    setState({
        name:"",
        CreatedOn:"",
        CreatedBy:"",
        description:"",
    })
}

const  handleEdit = (item) =>{
    setState({
        name:item.name,
        CreatedOn:item.createdOn,
        CreatedBy:item.createdBy,
        description:item.description,
      Reqid:item.id
    })
}

const updateTableContent = () => {
  console.log('buy',state.Reqid,state.name,state.description)
    onRowUpdate(
      {
          name: state.name,
          description: state.description,
        },
        state.Reqid,
      )
    
    }
  
 const deleteTableContent = (item) => {
   console.log("jj",item.id)
    onRowDelete(item.id)
      props.navigation.goBack()
    }
  
const   addTableContent = (newData) => {
  console.log("Asf",state.name,state.description)
    onRowAdd({
            name: state.name,
            description: state.description,
      })
     props.navigation.goBack()
    }
  
  const { categories } = props
  return (
      <Presentation
        categories={categories}
        {...state}
        {...props}
        handleEdit={handleEdit}
        clearValues={clearValues}
        handleChange={handleChange}
        addTableContent={addTableContent}
            deleteTableContent={deleteTableContent}
            updateTableContent={updateTableContent}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  return {
    categories: firestore.categories,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRowAdd: (payload) => {
      dispatch(addNewCategory(payload))
    },
    onRowUpdate: (payload, categoryId) => {
      dispatch(updateCategory(payload, categoryId))
    },
    onRowDelete: (categoryId) => {
      dispatch(deleteCategory(categoryId))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collectionGroup: "CATEGORIES_DOCS",
        where: [["isExist", "==", true]],
        storeAs: "categories",
      },
    ]
  })
)(Container)
