import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import  Home  from './pages/Home';
import  Checkout  from "./pages/Checkout";
import  Auth  from "./pages/Auth";
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import ProductDetail from './pages/ProductDetail';
import CartProvider from './context/CartContext';
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/checkout" element={<Checkout/> }/>
        <Route path="/products/:id" element={<ProductDetail/> }/>
      </Routes>
    </div>
    </CartProvider>
    </AuthProvider>
  )
}

export default App