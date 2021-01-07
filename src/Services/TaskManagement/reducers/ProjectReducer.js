import ACTION from "../actions/actionTypes"
import projectState from "../reducers/ProjectState"

export default (state = projectState, { type, payload }) => {
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

    case ACTION.LOAD_PROJECT_REQUEST:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_PROJECT_SUCCESS:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.projectData.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_PROJECT_FAILURE:
      return {
        ...state,
        projectData: {
          ...state.projectData,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
