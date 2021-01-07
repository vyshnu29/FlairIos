import { ACTION } from "../actions/actionTypes"
import { initState } from "./wikiArticlesState"

export function wikiArticleReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.WIKI_ARTICLES_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.WIKI_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        isLoaded: true,
        isEmpty: false,
        error: null,
      }

    case ACTION.WIKI_ARTICLES_ERROR:
      return {
        ...state,
        articles: [],
        isLoaded: true,
        isEmpty: true,
        error: action.e,
      }

    default:
      return state
  }
}
