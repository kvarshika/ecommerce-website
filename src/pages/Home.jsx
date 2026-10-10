import React from 'react'
import { getProducts } from "../data/products";
import { Link } from 'react-router-dom';
import ProductCrad from '../components/ProductCard';
const Home = () => {

  const products=getProducts();
  return (
    <div className='page'>
      {/* hero */}
      <div className='home-hero'>
        <h1 className='home-title'>Welcome to ShopHub</h1>
        <p className='home-subtitle'>Discover amazing products at great prices</p>
      </div>
      {/* actual products */}
      <div className="container">
        <h2 className='page-title'>Our Products</h2> 
        <div className="product-grid">
          {products.map((product)=>(
            <ProductCrad product={ product } key={product.id}/>
          ))}
        </div>     
      </div>
      
    </div>
  )
}

export default Home