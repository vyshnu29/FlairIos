import React from "react"
import PlacementView from "../Services/Placements/components/NewPlacement/Index"

function PlacementsViewScreen(props) {
  return (
  
      <PlacementView id={props.route.params.id} docId={props.route.params.docId} isEdit={true} {...props}/>
    
  )
}

export default PlacementsViewScreen