

function reducer(state = { currentUser: null }, action) {
  switch (action.type) {
    case "AUTHENTICATE_DONE":
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload
      };
    case "DECREMENT":
      return {
        ...state,
        masseuseName: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
