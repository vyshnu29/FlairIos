import ACTION from "../actions/actionTypes"
import tasksListState from "../reducers/taskListState"

export default (state = tasksListState, { type, payload }) => {
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

    case ACTION.LOAD_TASKSLIST_REQUEST:
      return {
        ...state,
        tasksListData: {
          ...state.tasksListData,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_TASKSLIST_SUCCESS:
      return {
        ...state,
        tasksListData: {
          ...state.tasksListData,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.tasksListData.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_TASKSLIST_FAILURE:
      return {
        ...state,
        tasksListData: {
          ...state.tasksListData,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
