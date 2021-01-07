import ACTION from "../actions/actionTypes"
import TasksListState from "../reducers/TasksListState"

export default (state = TasksListState, { type, payload }) => {
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

    case ACTION.LOAD_ALL_TASKS_REQUEST:
      return {
        ...state,
        allTasksList: {
          ...state.allTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ALL_TASKS_SUCCESS:
      return {
        ...state,
        allTasksList: {
          ...state.allTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.allTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ALL_TASKS_FAILURE:
      return {
        ...state,
        allTasksList: {
          ...state.allTasksList,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.LOAD_OPEN_TASKS_REQUEST:
      return {
        ...state,
        openTasksList: {
          ...state.openTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_OPEN_TASKS_SUCCESS:
      return {
        ...state,
        openTasksList: {
          ...state.openTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.openTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_OPEN_TASKS_FAILURE:
      return {
        ...state,
        openTasksList: {
          ...state.openTasksList,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_INPROGRESS_TASKS_REQUEST:
      return {
        ...state,
        inProgressTasksList: {
          ...state.inProgressTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_INPROGRESS_TASKS_SUCCESS:
      return {
        ...state,
        inProgressTasksList: {
          ...state.inProgressTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.inProgressTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_INPROGRESS_TASKS_FAILURE:
      return {
        ...state,
        inProgressTasksList: {
          ...state.inProgressTasksList,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_OVERDUE_TASKS_REQUEST:
      return {
        ...state,
        overDueTasksList: {
          ...state.overDueTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_OVERDUE_TASKS_SUCCESS:
      return {
        ...state,
        overDueTasksList: {
          ...state.overDueTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.overDueTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_OVERDUE_TASKS_FAILURE:
      return {
        ...state,
        overDueTasksList: {
          ...state.overDueTasksList,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.LOAD_REVIEW_TASKS_REQUEST:
      return {
        ...state,
        reviewTasksList: {
          ...state.reviewTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_REVIEW_TASKS_SUCCESS:
      return {
        ...state,
        reviewTasksList: {
          ...state.reviewTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.reviewTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_REVIEW_TASKS_FAILURE:
      return {
        ...state,
        reviewTasksList: {
          ...state.reviewTasksList,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_CLOSED_TASKS_REQUEST:
      return {
        ...state,
        closedTasksList: {
          ...state.closedTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_CLOSED_TASKS_SUCCESS:
      return {
        ...state,
        closedTasksList: {
          ...state.closedTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.closedTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_CLOSED_TASKS_FAILURE:
      return {
        ...state,
        closedTasksList: {
          ...state.closedTasksList,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_SUB_TASKS_REQUEST:
      return {
        ...state,
        subTasksList: {
          ...state.subTasksList,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_SUB_TASKS_SUCCESS:
      return {
        ...state,
        subTasksList: {
          ...state.subTasksList,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.subTasksList.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_SUB_TASKS_FAILURE:
      return {
        ...state,
        subTasksList: {
          ...state.subTasksList,
          isLoading: false,
          error: payload,
        },
      }

    // case ACTION.LOAD_APPROVED_EXPENSES_REQUEST:
    //   return {
    //     ...state,
    //     approvedExpenses: {
    //       ...state.approvedExpenses,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_APPROVED_EXPENSES_SUCCESS:
    //   return {
    //     ...state,
    //     approvedExpenses: {
    //       ...state.approvedExpenses,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.approvedExpenses.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_APPROVED_EXPENSES_FAILURE:
    //   return {
    //     ...state,
    //     approvedExpenses: {
    //       ...state.approvedExpenses,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }
    // case ACTION.LOAD_REJECTED_EXPENSES_REQUEST:
    //   return {
    //     ...state,
    //     rejectedExpenses: {
    //       ...state.rejectedExpenses,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_REJECTED_EXPENSES_SUCCESS:
    //   return {
    //     ...state,
    //     rejectedExpenses: {
    //       ...state.rejectedExpenses,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.rejectedExpenses.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_REJECTED_EXPENSES_FAILURE:
    //   return {
    //     ...state,
    //     rejectedExpenses: {
    //       ...state.rejectedExpenses,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }

    // case ACTION.LOAD_MY_EXPENSES_REQUEST:
    //   return {
    //     ...state,
    //     myExpenses: {
    //       ...state.myExpenses,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_MY_EXPENSES_SUCCESS:
    //   return {
    //     ...state,
    //     myExpenses: {
    //       ...state.myExpenses,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.myExpenses.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_MY_EXPENSES_FAILURE:
    //   return {
    //     ...state,
    //     myExpenses: {
    //       ...state.myExpenses,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }

    default:
      return state
  }
}
