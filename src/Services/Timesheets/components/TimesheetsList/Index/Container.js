import React, { useEffect, useContext } from 'react'
import Presentation from "./Presentation"
import Wrapper from "../../../../../shared/wrapper"
import { ContextProvider, Context } from "../component_state/context"

function Container(props) {
  const [state, handle] = useContext(Context)
  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  useEffect(() => {
    setState({
      listAll: props.listAll,
      employeeID: props.employeeID
    })
  }, [])

  return (

      <Presentation  {...props} />

  )
}

export default Wrapper(ContextProvider, Container)

  
 
