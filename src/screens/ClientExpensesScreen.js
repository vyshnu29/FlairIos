import React from "react"
import ExpensesList from "../Services/Expenses/components/ExpensesList/Index/index"

function ClientExpenses(props) {
  console.log("list", props)
  return (
      <ExpensesList {...props} clientId={props.route.params.clientId}  listAll={false} clientView={true} />
  )
}

export default ClientExpenses