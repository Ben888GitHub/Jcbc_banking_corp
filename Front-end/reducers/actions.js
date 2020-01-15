export const authenticate = data => {
    return {
        type: "AUTHENTICATE_DONE",
        payload: data
    }
}

export const getTransactions = data => {
    return {
        type: "GET_TRANSACTIONS",
        payload: data
    }
}