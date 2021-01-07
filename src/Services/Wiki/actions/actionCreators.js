import { ACTION } from "./actionTypes"

export function wikiArticlesRequest() {
  return {
    type: ACTION.WIKI_ARTICLES_REQUEST,
  }
}

export function wikiArticlesSuccess(payload) {
  return {
    type: ACTION.WIKI_ARTICLES_SUCCESS,
    payload,
  }
}

export function wikiArticlesError(e) {
  return {
    type: ACTION.WIKI_ARTICLES_ERROR,
    e,
  }
}

