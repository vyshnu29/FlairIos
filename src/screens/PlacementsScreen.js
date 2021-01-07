import React from "react"
import Placements from '../Services/Placements/components/PlacementsList/Index/index'

function PlacementsScreen(props) {
  return (
  
      <Placements listAll={true} employeeId={null} clientView={false} clientId={null} {...props}/>
    
  )
}

export default PlacementsScreen