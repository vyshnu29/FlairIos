import { combineReducers } from "redux"
import { employeeModulesReducer } from "./employeeModulesReducer"
import employeeListReducer from "./employeeListReducer"
const rootReducer = combineReducers({
	employeeList: employeeListReducer,
	employeeModules: employeeModulesReducer,
})

export default rootReducer
