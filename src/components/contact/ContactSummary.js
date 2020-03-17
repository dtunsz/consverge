import React from 'react'

const ContactSummary = ({contact}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        Name: <strong>{contact.name}</strong> 
        <br/>
        Email / Phone: <strong>{contact.email} / {contact.phone}</strong> 
        <br/>
        Job / Description: <strong>{contact.job} / {contact.des}</strong>
      </div>
    </div>
  )
}

export default ContactSummary