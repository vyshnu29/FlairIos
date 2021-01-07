import ACTION from "../actions/actionTypes"
import projectListState from "../reducers/projectsListState"

export default (state = projectListState, { type, payload }) => {
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

    case ACTION.LOAD_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        allProjects: {
          ...state.allProjects,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        allProjects: {
          ...state.allProjects,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.allProjects.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        allProjects: {
          ...state.allProjects,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_OVERDUE_PROJECTS_REQUEST:
      return {
        ...state,
        overDueProjects: {
          ...state.overDueProjects,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_OVERDUE_PROJECTS_SUCCESS:
      return {
        ...state,
        overDueProjects: {
          ...state.overDueProjects,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.overDueProjects.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_OVERDUE_PROJECTS_FAILURE:
      return {
        ...state,
        overDueProjects: {
          ...state.overDueProjects,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.LOAD_INPROGRESS_PROJECTS_REQUEST:
      return {
        ...state,
        inProgressProjects: {
          ...state.inProgressProjects,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_INPROGRESS_PROJECTS_SUCCESS:
      return {
        ...state,
        inProgressProjects: {
          ...state.inProgressProjects,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.inProgressProjects.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_INPROGRESS_PROJECTS_FAILURE:
      return {
        ...state,
        inProgressProjects: {
          ...state.inProgressProjects,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_CLOSED_PROJECTS_REQUEST:
      return {
        ...state,
        closedProjects: {
          ...state.closedProjects,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_CLOSED_PROJECTS_SUCCESS:
      return {
        ...state,
        closedProjects: {
          ...state.closedProjects,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.closedProjects.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_CLOSED_PROJECTS_FAILURE:
      return {
        ...state,
        closedProjects: {
          ...state.closedProjects,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
