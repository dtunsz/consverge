import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CreateContact } from '../../store/actions/ContactActions'
import { useFirestore } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'


function AddContact (props) {
    const { user } = props
    const firestore = useFirestore();
    const [contact , setContact] = useState({name: "", email: "", phone: "", job: "", des: ""})


    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.id] : e.target.value
        })
    }

    const create = (contact) => {
        return new Promise ( resolve => {
            let action = {};
            firestore.collection('contacts').add({
                ...contact,
                authorId: user.uid,
                createdAt: new Date()
            }).then ( () => {
                action = { type: 'CREATE_CONTACT', contact};
                resolve(action);
            }).catch( (err) => {
                action = { type: 'CREATE_CONTACT_ERROR', err};
                resolve(action);
            })
        })
    }

    const doCreate = async () => {
        const response = await create(contact);
        props.createContact(response);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(state)
        doCreate();
    }

    if(!user.uid) return <Redirect to='/login' />

    // if(!user.uid) { console.log('Matching Problem')}
    return (
    <div className="container">
        <form className="white" onSubmit={handleSubmit}>
            <h5 className="grey-text text-darken-3">Add a New Contact</h5>
            <div className="input-field">
                <input type="text" id='name' onChange={handleChange} />
                <label htmlFor="name">Name</label>
            </div>
            <div className="input-field">
                <input type="email" id="email" onChange={handleChange}/>
                <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
                <input type="text" id='phone' onChange={handleChange} />
                <label htmlFor="phone">Mobile Number</label>
            </div>

            <div className="input-field">
                <input type="text" id='job' onChange={handleChange} />
                <label htmlFor="job">Occupation</label>
            </div>
            <div className="input-field">
                <textarea id="des" className="materialize-textarea" onChange={handleChange}></textarea>
                <label htmlFor="des">Description</label>
            </div>
            <div className="input-field">
                <button className="btn red darken-1 right">Create</button>
            </div>
        </form>
    </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createContact: (payload) => dispatch( CreateContact (payload))
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (AddContact)




// <div className="input-field">
//     <button className="btn pink lighten-1">Create</button>
// </div>