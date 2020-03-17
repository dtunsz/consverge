

export const create = (payload) => {
    return (dispatch, getState ) => {
        dispatch(payload)
    }

}


export const LoginUser = (payload) =>{
    return(dispatch, getState) => {
        dispatch(payload)
    }
}

export const LogoutUser = (payload) => {
    return (dispatch, getState) => {
        dispatch(payload)
    }
}

