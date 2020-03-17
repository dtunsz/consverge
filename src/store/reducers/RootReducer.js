import AuthReducer from './AuthReducer'
import ContactReducer from './ContactReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'


const RootReducer = combineReducers({
    auth: AuthReducer,
    contact: ContactReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})



export default RootReducer
