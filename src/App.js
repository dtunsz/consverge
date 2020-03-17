import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddContact from './components/contact/AddContact'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Reg from './components/auth/Reg'
import Land from './components/home/Land'
import UpdateContact from './components/contact/UpdateContact'
import Navbar from './components/layout/Navbar'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
        <Route exact path="/addcontact" component={AddContact}/>
        <Route exact path="/">
          <Land />
        </Route>
        <Route exact path="/contacts">
          <Home />
        </Route>
        <Route exact path="/contact/:id">
          <UpdateContact />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Reg />
        </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
