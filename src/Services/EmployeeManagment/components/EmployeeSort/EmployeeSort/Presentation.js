import React from "react"
import EmployeeList from "../../EmployeeList"
export default function Presentation(props) {
  const {
    employeelist,
    tabPair,
    condition,
    selected,
    handleSelectAll,
    handleSelect,
    noOfLoadings,
    isLoaded,
  } = props
  const data = Object.values(employeelist[tabPair[condition]].data)
   const isLoading = noOfLoadings === 0 ? isLoaded : false
  
  return (
    <EmployeeList
      handleSelectAll={handleSelectAll}
      selected={selected}
      {...props}
      handleSelect={handleSelect}
      employeelist={data}
      isLoading={isLoading}
    />
  )
}
