import ACTION from "../actions/actionTypes"
import initState from "../reducers/loadLetterRequestsState"

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION.SET_STATE:
      return {
        ...state,
        ...payload,
      }

    case ACTION.SET_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: payload.listener,
        },
      }

    case ACTION.UNSUBSCRIBE_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: () => {},
        },
      }

    case ACTION.LOAD_ALL_REQUEST_LETTER_REQUEST:
      return {
        ...state,
        allLetterRequests: {
          ...state.allLetterRequests,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ALL_REQUEST_LETTER_SUCCESS:
      return {
        ...state,
        allLetterRequests: {
          ...state.allLetterRequests,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.allLetterRequests.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ALL_REQUEST_LETTER_FAILURE:
      return {
        ...state,
        allLetterRequests: {
          ...state.allLetterRequests,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_PENDING_REQUEST_LETTER_REQUEST:
      return {
        ...state,
        pendingLetterRequests: {
          ...state.pendingLetterRequests,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_PENDING_REQUEST_LETTER_SUCCESS:
      return {
        ...state,
        pendingLetterRequests: {
          ...state.pendingLetterRequests,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.pendingLetterRequests.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_PENDING_REQUEST_LETTER_FAILURE:
      return {
        ...state,
        pendingLetterRequests: {
          ...state.pendingLetterRequests,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.LOAD_REJECTED_REQUEST_LETTER_REQUEST:
      return {
        ...state,
        rejectedLetterRequests: {
          ...state.rejectedLetterRequests,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_REJECTED_REQUEST_LETTER_SUCCESS:
      return {
        ...state,
        rejectedLetterRequests: {
          ...state.rejectedLetterRequests,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.rejectedLetterRequests.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_REJECTED_REQUEST_LETTER_FAILURE:
      return {
        ...state,
        rejectedLetterRequests: {
          ...state.rejectedLetterRequests,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_ISSUED_REQUEST_LETTER_REQUEST:
      return {
        ...state,
        issuedLetterRequests: {
          ...state.issuedLetterRequests,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ISSUED_REQUEST_LETTER_SUCCESS:
      return {
        ...state,
        issuedLetterRequests: {
          ...state.issuedLetterRequests,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.issuedLetterRequests.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ISSUED_REQUEST_LETTER_FAILURE:
      return {
        ...state,
        issuedLetterRequests: {
          ...state.issuedLetterRequests,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.HTML_CONTENT_REQUEST:
      return {
        ...state,
        htmlContent: {
          ...state.htmlContent,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.HTML_CONTENT_SUCCESS:
      return {
        ...state,
        htmlContent: {
          ...state.htmlContent,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.htmlContent.noOfLoadings + 1,
        },
      }

    case ACTION.HTML_CONTENT_FAILURE:
      return {
        ...state,
        htmlContent: {
          ...state.htmlContent,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
