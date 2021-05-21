import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { useState, useRef, useEffect } from 'react';
import ST from "./Music/St.mp3"
import axios from 'axios';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Menubar from './componets/Menubar'
import { Container } from 'semantic-ui-react';

function App(){
  return (   
    
      <Router>
        <Menubar />
        <Route excat path="/home" component ={Home}/>
        <Route excat path="/login" component ={Login}/>
        <Route excat path="/register" component ={Register}/>
      </Router>
  );
}
export default App;




