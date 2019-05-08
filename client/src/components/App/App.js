//import React from 'react';
import React, {Component} from 'react';

import './App.css';
import axios from 'axios';
import AllDrivers from '../AdminPage/AllDrivers/AllDrivers';
import Driver from '../AdminPage/Driver/Driver';
import IndexAdmin from '../AdminPage/IndexAdmin/Index';
//import LoginAdmin from '../AdminPage/LoginAdmin/Login';
//import Index from '../UserPage/Index/Index';
//import Profile from '../UserPage/Profile/Profile';
//import RegisterPage from '../UserPage/RegisterPage/RegisterPage';
//import Statistical from '../UserPage/Statistical/Statistical';
//import BookPage from '../UserPage/BookPage/BookPage';
//import Login from '../UserPage/Login/Login';


class App extends Component {
  state ={    greeting: ''  };
  componentDidMount(){
    axios.get('/api/helloworld')
    .then(result => this.setState({greeting: result.data.sayHi}));
  }
  render(){
    return (
        //<BookPage></BookPage>
        //<Index></Index>
        //<Login></Login>
        //<Profile></Profile>
        //<RegisterPage></RegisterPage>
        //<Statistical></Statistical>
        //<LoginAdmin></LoginAdmin>
        //<AllDrivers></AllDrivers>
        //<Driver></Driver>
        <IndexAdmin></IndexAdmin>
       
        
      
  

    );
  }
  
}

export default App;
