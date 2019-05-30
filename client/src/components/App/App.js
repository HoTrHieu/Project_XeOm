//import React from 'react';
import React, {Component} from 'react';

import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Index from '../UserPage/Index/Index';
import Profile from '../UserPage/Profile/Profile';
import RegisterPage from '../UserPage/RegisterPage/RegisterPage';
import Statistical from '../UserPage/Statistical/Statistical';
import BookPage from '../UserPage/BookPage/BookPage';
import Login from '../UserPage/Login/Login';
import IndexAdmin from '../AdminPage/IndexAdmin/Index';
import AllDrivers from '../AdminPage/AllDrivers/AllDrivers';
import Driver from '../AdminPage/Driver/Driver';

class App extends Component {
  state ={    greeting: ''  };
  componentDidMount(){
    axios.get('/api/helloworld')
    .then(result => this.setState({greeting: result.data.sayHi}));
  }
  render(){
    return (
        <Router>
          <Route exact path="/"  component={Index}/>
          <Route  path="/book"  component={BookPage}/>
          <Route  path="/login"  component={Login}/>
          <Route  path="/profile"  component={Profile}/>
          <Route  path="/register"  component={RegisterPage}/>
          <Route  path="/statistical"  component={Statistical}/>
          <Route  path="/index-admin"  component={IndexAdmin}/> 
          <Route  path="/alldrivers"  component={AllDrivers}/> 
          <Route  path="/driver"  component={Driver}/> 
        </Router>
      );
  }
  
}

export default App;
