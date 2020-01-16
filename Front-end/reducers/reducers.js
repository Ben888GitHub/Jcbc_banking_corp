let defaultUser = {
  "_id": "5de4cdd617ed2eb94c60103b",
  "accname": "hungnguyen",
  "pin": "123456",
  "email": "vanhung.nguyen2@my.jcu.edu.au",
  "accounts": [
    {
      "accnumber": "999999990000",
      "balance": 1000000,
      "currency": "SGD"
    },
    {
      "accnumber": "999900009999",
      "balance": 190,
      "currency": "USD"
    },
    {
      "accnumber": "000099999999",
      "balance": 58392.51,
      "currency": "CNY"
    },
    {
      "accnumber": "666666666666",
      "balance": 6666666666,
      "currency": "VND"
    }
  ],
  "dependencies": [
    {
      "accname": "benryan",
      "accnumber": "999999999999"
    },
    {
      "accname": "zwenyan",
      "accnumber": "837213450781"
    }
  ]
};


function reducer(state = { currentUser: defaultUser }, action) {
  switch (action.type) {
    case "AUTHENTICATE_DONE":
      let newState = {
        currentUser: action.payload
      };
      return newState;
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
