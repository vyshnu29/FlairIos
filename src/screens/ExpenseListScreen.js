import React from "react"
import ExpensesList from "../Services/Expenses/components/ExpensesList/Index/index"

function ExpensesListScreen(props) {
  console.log("list", props)
  return (
      <ExpensesList {...props} listAll={true} />
  )
}

export default ExpensesListScreen