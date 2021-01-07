import ACTION from "../actions/actionTypes"
import initState from "./placementListState"

export function placementListReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.PLACEMENTLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case ACTION.PLACEMENTLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        placementList: action.payload.placementList,
      }

    case ACTION.PLACEMENTLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case ACTION.DOCUMENTS_REQUEST:
      return {
        isLoaded_documents: false,
        isEmpty_documents: false,
      }

    case ACTION.DOCUMENTS_SUCCESS:
      return {
        isLoaded_documents: true,
        isEmpty_documents: false,
        documents: action.payload,
        documents_error: null,
      }

    case ACTION.DOCUMENTS_FAILURE:
      return {
        isLoaded_documents: true,
        isEmpty_documents: true,
        documents_error: action.error,
        documents: [],
      }

    default:
      return state
  }
}
