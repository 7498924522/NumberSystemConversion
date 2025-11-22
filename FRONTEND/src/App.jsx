import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import DecimalConverter from './Components/DecimalConverter'
import BinaryConverter from './Components/BinaryConverter';
import Home from './Components/Home';
import OctalConverter from './Components/OctalConverter';
import HexadecimalConverter from './Components/HexadecimalConverter';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';

function App() {

  return (
    <>
    
     <BrowserRouter>
      <Routes>

         <Route path="/" element={ <HomePage/>} />          
       
        <Route path="/lg" element={ <Login/>} />          
        <Route path="/signup" element={ <SignUp/>} />          
      
         <Route path="/home" element={ <Home/>} />          
      
        <Route path="/decimal" element={ <DecimalConverter/>} />          
        <Route path="/binary" element={<BinaryConverter />} />
        <Route path="/octal" element={<OctalConverter />} />
        <Route path="/hex" element={<HexadecimalConverter />} />
       
        
        
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
