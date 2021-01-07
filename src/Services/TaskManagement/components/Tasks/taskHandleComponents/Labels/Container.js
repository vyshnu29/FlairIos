import React from "react"
import Presentation from "./Presentation"
import firestore from '@react-native-firebase/firestore';
function Container(props) {
  
  const [state, setState] = React.useState({
    taskLabels: [],
  })
  
  const attachLabelsToTask = (taskArray) => {
      firestore()
      .collection("PROJECTS")
      .doc(props.project.id)
      .collection("TASKS")
      .doc(props.task[0].id)
      .set(
        {
          labels: taskArray,
        },
        { merge: true }
      )
  }
  const handleChange = (e,key, value) => {
  //  console.log("sSS",e,value)
  let taskArray = state.taskLabels
	if (e) {
	  taskArray = [...taskArray, value]
	} else {
	  const index = taskArray.indexOf(value)
	  taskArray.splice(index, 1)
	}
    setState({
      ...state,
      [key]: taskArray,
    })
    attachLabelsToTask(taskArray)
  }
  return (
      <Presentation {...props} taskLabelsData={state.taskLabels} handleChange={handleChange} />
  )
}

export default Container