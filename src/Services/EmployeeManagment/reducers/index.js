import { combineReducers } from "redux"
import { employeeModulesReducer } from "./employeeModulesReducer"
import employeeListReducer from "./employeeListReducer"
import dynamicProfileRender from "./dynamicProfileRender"
const rootReducer = combineReducers({
	employeeList: employeeListReducer,
	employeeModules: employeeModulesReducer,
	dynamicProfileRender: dynamicProfileRender
})

export default rootReducer
