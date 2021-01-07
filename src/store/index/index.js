import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducers"

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { getFirebase } from "react-redux-firebase"

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
)

export default store

// import { createStore , applyMiddleware} from 'redux'
// import rootReducer from '../reducers/index'
// import thunk from 'redux-thunk'

// const middleware = [thunk]

// export default createStore(rootReducer , applyMiddleware(...middleware));