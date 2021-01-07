import React from "react"
import Form from "../Form"

function Presentation(props) {
  const {
    handleTabChange,
    tabList,
    deleteTab,
    addTab,
    value,
    handleChange,
    billableClient,
    clients,
    fillableSections,
    id,
    employeeID,
  } = props

  return (
   <>
          {tabList.map((item, index) => (
              <Form
                key={item.key.toString()}
                item={item}
                index={index}
                tabList={tabList}
                handleChange={handleChange}
                fillableSections={fillableSections}
                billableClient={item.key === 0 ? billableClient : ""}
                uid={employeeID}
                id={id}
              />
          ))}
      
    </>
  )
}

export default Presentation
