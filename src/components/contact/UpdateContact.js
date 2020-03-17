import React, { Component } from 'react'


class UpdateContact extends Component{

    state = {
        name: "",
        email: "",
        phone: "",
        job: "",
        des: ""
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
    }

    render () {
        return(
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Add a New Contact</h5>
                    <div className="input-field">
                        <input type="text" id='name' onChange={this.handleChange} />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" id="email" onChange={this.handleChange}/>
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field">
                        <input type="text" id='phone' onChange={this.handleChange} />
                        <label htmlFor="phone">Mobile Number</label>
                    </div>

                    <div className="input-field">
                        <input type="text" id='job' onChange={this.handleChange} />
                        <label htmlFor="job">Occupation</label>
                    </div>
                    <div className="input-field">
                        <textarea id="des" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label htmlFor="des">Description</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default UpdateContact
