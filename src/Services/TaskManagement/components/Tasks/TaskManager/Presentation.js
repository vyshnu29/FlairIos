import React, { useState } from "react"
import TasksSort from "../TaskSort"
// import Validation from "../../../../../shared/validation"

function Presentation(props) {
  console.log(props.taskslist)
  const { project, tasksList, employee } = props
  
  return (
            <TasksSort
            {...props}
            
              taskslist={props.taskslist}
              id={props.id}
            />
  )
}

export default Presentation