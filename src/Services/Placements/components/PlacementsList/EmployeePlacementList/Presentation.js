import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import PlacementsList from "../Index"

export default function Presentation(props) {
  const { id, loggedInEmployee } = props

  return (
    <div>
      <div className="text-right m-2">
        {loggedInEmployee !== id ? (
          <Link to={"/console/newplacement/" + id}>
            <Button variant="contained" color="primary">
              Add New Placement
            </Button>
          </Link>
        ) : null}
      </div>
      <PlacementsList listAll={false} employeeId={id} clientView={false} clientId={null} />
    </div>
  )
}
