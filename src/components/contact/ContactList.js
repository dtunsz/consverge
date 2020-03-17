import React from 'react'
import { Link } from 'react-router-dom'
import ContactSummary from './ContactSummary'



function ContactList({contacts}){
    return(
        <div className="card">
            { contacts && contacts.map ( contact => {
                return(
                    <ContactSummary contact = {contact} key= {contact.id} />
                )
            })}
        </div>
    )
}



export default ContactList
