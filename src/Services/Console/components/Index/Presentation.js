import React from "react"
import { Link } from "react-router-dom"

function Presentation(props) {
  return (
    <div>
      <Link to={"/console/companydetails"}>Company Details</Link>
    </div>
  )
}

export default Presentation
