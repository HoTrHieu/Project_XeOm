//import React from 'react';
import React, {Component} from 'react';

import './App.css';
import axios from 'axios';
//import Index from '../UserPage/Index/Index';
//import Profile from '../UserPage/Profile/Profile';
//import RegisterPage from '../UserPage/RegisterPage/RegisterPage';
import Statistical from '../UserPage/Statistical/Statistical';
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
        <Statistical></Statistical>
    );
  }
  
}

export default App;
