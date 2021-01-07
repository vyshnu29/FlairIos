import React from "react"
import TasksTable from "../TaskTable/index"
export default function Presentation(props) {
  const { tabPair, condition, tasksListData, id } = props
  let num = Date.parse(new Date())

  const filterData = Object.values(
    tasksListData[tabPair[condition]].data
  ).filter(
    (e) =>
      e.startdate < num &&
      e.status !== "Completed" &&
      e.status !== "Review" &&
      e.status !== "Closed"
  )
  console.log(tasksListData[tabPair[condition]].data, filterData, "data")
  let data =
    condition === 3
      ? filterData
      : Object.values(tasksListData[tabPair[condition]].data)
  console.log(data)
  return <TasksTable taskList={data}  id={id} {...props}/>
}
