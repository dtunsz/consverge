import React, { Component } from 'react'
import Notifications from './Notifications'
import ContactList from '../contact/ContactList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'



class Home extends Component{
    render(){
        if(!this.props.user.uid) return <Redirect to='/login' />
        console.log(this.props.contacts)
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m7">
                        <h5>Contacts</h5>
                        <ContactList contacts = {this.props.contacts} />
                    </div>
                    <div className="col s12 m4 offset-m1">
                        <Notifications />
                    </div>
                </div>

                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state)

    return{
        // contacts: state.contact.contacts,
        contacts: state.firestore.ordered.contacts,
        user: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        if (props.user.uid) {
            return [
                {collection: 'contacts', where: [["authorId", "==",  props.user.uid]]}
                ]
        } else {
            return [
                {collection: 'contacts'}
                ]
        }
    })
) (Home)
