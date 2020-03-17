import React from 'react'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'


function Navbar (props){
    const { auth } = props
    const links = auth.uid ? <LoggedInLinks auth = {auth} /> : <LoggedOutLinks />;
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">CONSVERGE</Link> 
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        auth: state.firebase.auth
    }
}



export default connect(mapStateToProps) (Navbar)