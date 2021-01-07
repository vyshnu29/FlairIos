import ACTION from "../actions/actionTypes"
import taskState from "../reducers/loadTaskState"

export default (state = taskState, { type, payload }) => {
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

    case ACTION.LOAD_TASK_REQUEST:
      return {
        ...state,
        taskData: {
          ...state.taskData,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_TASK_SUCCESS:
      return {
        ...state,
        taskData: {
          ...state.taskData,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.taskData.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_TASK_FAILURE:
      return {
        ...state,
        taskData: {
          ...state.taskData,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_TASK_COMMENTS_REQUEST:
      return {
        ...state,
        taskCommentsData: {
          ...state.taskCommentsData,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_TASK_COMMENTS_SUCCESS:
      return {
        ...state,
        taskCommentsData: {
          ...state.taskCommentsData,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.taskCommentsData.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_TASK_COMMENTS_FAILURE:
      return {
        ...state,
        taskCommentsData: {
          ...state.taskCommentsData,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
