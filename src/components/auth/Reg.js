import React, { useState } from 'react'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { create } from '../../store/actions/AuthActions'
import { Redirect } from 'react-router-dom'


function Reg (props) {
    const firebase = useFirebase();
    const firestore = useFirestore();

    const [user, setUser] = useState({email: '', password: '', firstName: '', lastName: ''});

    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const create = (user) => {
        return new Promise( resolve => {
            var payload = {}
            firebase.auth().createUserWithEmailAndPassword(
                user.email,
                user.password
            ).then( (res) => {
                res.user.updateProfile({
                    displayName: user.firstName[0] + user.lastName[0]
                })
                // console.log(res);
                // console.log(res.user.uid);
                let uid = res.user.uid;
                return uid
            })
            .then( (uid) => {
                // console.log(uid);
                firestore.collection('users').doc(uid).set({
                    firstName : user.firstName,
                    lastName: user.lastName,
                })
            })
            .then( () => {
                payload = { type: 'CREATEUSER_SUCCESS'}
                console.log('success');
                resolve (payload);
            })
            .catch( (error) => {
                payload = { type: 'CREATEUSER_ERROR', error}
                // console.log(error);
                resolve (payload)

            })
        });

    }

    const bb = async () => {
        const res = await create(user);
        //console.log(res);
        props.creating(res);
    }


    const handleSubmit =  (e) => {
        e.preventDefault();
        //console.log(user)
        bb();
    }

    if(props.auth.uid) return <Redirect to='/contacts'/>

    return ( 
        <div className="container">
            <form className="white" onSubmit={handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id='firstName' onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id='lastName' onChange={handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn red darken-1 right z-depth-0">Register</button>
                    <div className="center red-text">
                    </div>
                </div>
            </form>
        </div>
    )
}

const matchStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


const matchDispatchToProps = (dispatch) => {
    return {creating: (payload) => ( dispatch ( create (payload)))
    }
}


export default connect(matchStateToProps, matchDispatchToProps ) (Reg)