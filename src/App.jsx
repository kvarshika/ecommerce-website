import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import  Home  from './pages/Home';
import  Checkout  from "./pages/Checkout";
import  Auth  from "./pages/Auth";
import Navbar from './components/Navbar';
const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/checkout" element={<Checkout/> }/>
      </Routes>
    </div>
  )
}

export default App