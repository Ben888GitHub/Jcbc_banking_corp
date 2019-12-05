export const authenticate = data => {
    return {
        type: "AUTHENTICATE_DONE",
        payload: data
    }
}