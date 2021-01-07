import React from "react"
import TabsView from '../TabsView'
export default function Presentation(props) {
  console.log(props)
  const {myReq} = props
  return (
      <TabsView {...props} />
  )
}
