import { useContext, useState } from "react";
import { createContext } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({children}){

    const [cartItems, setCartItems] = useState([]); //{id: , quantity: 7}
    
    
    function addToCart(productId){
        const existing=cartItems.find((item)=> item.id===productId)
        if(existing){
            const currentQuantity=existing.quantity;
            //setCartItems([...cartItems,{id:productId,quantity:currentQuantity+1}]);
            const updatedCartItems=cartItems.map((item)=> item.id===productId ? {id: productId,quantity:currentQuantity+1} : item);
            setCartItems(updatedCartItems);
        }
        else{
            //cartItems.push({id:porductId,quantity:1}) cant do this becoz its a state
            setCartItems([...cartItems,{id:productId,quantity:1}]);
        }
    }


    function getCartItemsWithProducts(){
        return cartItems.map(item=>({
            ...item,
            product: getProductById(item.id)
        })).filter(item=>item.product);
    }



    //cart in nav

    function removeFromcart(productId){
        setCartItems(cartItems.filter((item)=> item.id!==productId));
    }




    function updateQuantity(productId,quantity){
        if(quantity<=0){
            removeFromcart(productId);
            return ;
        }
        setCartItems(
            cartItems.map((item)=> item.id===productId?{...item,quantity}:item)
        );
    }

    //total
    function getCartTotal(){
        const total=cartItems.reduce((total,item)=> {
            const product=getProductById(item.id)
            return total+(product? product.price*item.quantity:0);
        }, 0)
        return total;
    }


    function clearcart(){
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{cartItems,addToCart,getCartItemsWithProducts,removeFromcart,updateQuantity,getCartTotal,clearcart}}>{children}</CartContext.Provider>
    );
}
//create own hook
export function useCart(){
    const context=useContext(CartContext);

    return context;
}