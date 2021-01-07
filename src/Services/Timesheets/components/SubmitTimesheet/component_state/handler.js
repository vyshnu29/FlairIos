

const handler = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.data }

    case "LOAD_PLACEMENT":


    default: return state
  }
}

export default handler