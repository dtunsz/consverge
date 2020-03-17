import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { LoginUser } from '../../store/actions/AuthActions'
import { Redirect } from "react-router-dom";


function Login (props){
    const firebase = useFirebase();
    const [user, setUser] = useState({email: "", password: ""});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })

    }

    const login = (user) => {
        return new Promise( resolve => {
            let action = {};
            firebase.auth().signInWithEmailAndPassword(
                user.email,
                user.password
            )
            .then( () => {
                action = {type: 'LOGIN_SUCCESS'}
                resolve(action)
            })
            .catch( (error) => {
                action = {type: 'LOGIN_ERROR' , error}
                resolve (action)
            })
        });
    }

    const make = async () => {
        const response = await login(user)
        props.loginUser(response);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        make();

    }
    const { authError } = props
    if(props.auth.uid) return <Redirect to='/contacts'/>

    return (
    <div className="container">
        <form className="white" onSubmit={handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' onChange={handleChange} />
            </div>
            <div className="input-field">
                <button className="btn red darken-1 right z-depth-0">Login</button>
                <div className="center red-text">
                    {authError}
                </div>
            </div>
        </form>
    </div>
    )
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loginUser: (payload) => dispatch( (LoginUser (payload)) )
    }
}


export default connect( mapStateToProps, mapDispatchToProps) (Login)

