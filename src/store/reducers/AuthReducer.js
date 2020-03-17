const initState = {
    authError: null
}

const AuthReducer = (state = initState ,  action) => {

    switch (action.type) {
        case 'CREATEUSER_SUCCESS':
            console.log('register success');
            return{
                ...state,
                authError: null
            }
        case 'CREATEUSER_ERROR':
            console.log('register error');
            console.log(action.error.message);
            return{
                ...state,
                authError: action.error.message
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            console.log('login error');
            return{
                ...state,
                authError: action.error.message
            }
        case 'LOGOUT_SUCCESS':
            console.log('logout success');
            return state
        case 'LOGOUT_ERROR':
            console.log('logout error');
            return state
        default:
            return state;
    }

}

export default AuthReducer