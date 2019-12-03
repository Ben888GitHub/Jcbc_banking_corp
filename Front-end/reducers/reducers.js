

function reducer(state = {}, action) {
  switch (action.type) {
    case "AUTHENTICATE_DONE":
      console.log(action.payload);
      return action.payload;
    // return {
    //   ...state,
    //   masseuseName: action.payload
    // };
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
