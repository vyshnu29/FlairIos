import React, { useEffect } from "react"
import Presentation from "./Presentation"
// import { attachTokenListener } from '../../Services/Authentication/middleware/index'
function Container(props) {


  // useEffect(() => {
  //   attachTokenListener()
  // }, [])

 
    return (
         <Presentation {...props} /> 
    )

}




export default Container
