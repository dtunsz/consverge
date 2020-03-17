import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './store/reducers/RootReducer'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { getFirebase , ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance , getFirestore } from 'redux-firestore'
import firebaseConfig from './config/FirebaseConfig'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// import { useSelector } from 'react-redux'
// import { isLoaded } from 'react-redux-firebase'




// const store  = createStore(RootReducer, 
//     compose(
//     applyMiddleware(thunk)
//     )
//     );
firebase.initializeApp(firebaseConfig)
firebase.firestore()

const middlewares = [
    thunk.withExtraArgument(getFirebase, getFirestore)
]

const store  = createStore( RootReducer, 
    compose(
    applyMiddleware(...middlewares))
    //applyMiddleware([thunk.withExtraArgument( getFirebase, getFirestore )]))

    //applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))

);


const rrfConfig = {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true,
};


 const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}



function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading...</div>;
  return children
}


// const store  = createStore( RootReducer, 
//     compose(
//         //applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//         //applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//         reduxFirestore(FirebaseConfig),
//         reactReduxFirebase(FirebaseConfig),
//     )
// );

ReactDOM.render(
    <Provider store= {store} > 
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
