import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogoutUser } from '../../store/actions/AuthActions'
import { useFirebase } from 'react-redux-firebase'


function LoggedInLinks (props){

    const firebase = useFirebase();
    const logout = () => {
        return new Promise ( resolve => {
            let action = {}
            firebase.auth().signOut().then( () => {
                action = {type: 'LOGOUT_SUCCESS'}
                resolve(action)
            }).then( (error) => {
                action = {type: 'LOGOUT_ERROR', error}
                resolve(action)
            })
        })
    }

    const doLogout = async () => {
        const response = await logout();
        props.logoutUser(response);
    }
    const handleClick = () => {
        doLogout()
    }

    return (
        <div>
            <ul className="right">
                <li><NavLink to='/addcontact'>Add Contact</NavLink></li>
                <li><a onClick={handleClick}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating red">
                {props.auth.displayName}</NavLink></li>
            </ul>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return{
        logoutUser: (payload) => ( dispatch (LogoutUser (payload)))
    }
}

export default connect(null, mapDispatchToProps) (LoggedInLinks)