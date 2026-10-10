import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProductById } from "../data/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
 export default function ProductDetail ()  {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();


    //to show in cart
    const {addToCart,cartItems} =useCart();

    useEffect(()=>{
      const foundProduct=getProductById(id);

      if(!foundProduct){
        navigate("/");
        return;
      }
      setProduct(foundProduct);  
    },[id]);

    if(!product){
        return <h1>Loading..</h1>
    }
    const ProductInCart=cartItems.find((item)=> item.id===product.id);

    const labelquantity = ProductInCart ?`(${ProductInCart.quantity})`:""; 

  return (
    
     <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button className="btn btn-primary" onClick={()=>addToCart(product.id)}>
                Add to Cart
                {labelquantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

