import { combineReducers } from "redux"
import { wikiArticleReducer } from "./wikiArticlesReducer"

const rootReducer = combineReducers({
  wikiArticles: wikiArticleReducer,
})

export default rootReducer
