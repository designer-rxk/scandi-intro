import "./Cart.css";
import {useShoppingCart} from "../../context/StateContext";
import {useEffect, useState} from "react";
import {SINGLE_PRODUCT_QUERY} from "../../utils/GraphQL/Query";

const Cart = () =>{
    const {  cartQuantity, cartItems } = useShoppingCart()
    const [cartInfo, setCartInfo] = useState([]);
    const cartInfo1 = [];

    useEffect(() => {
        for(let i=0; i<=cartItems.length-1; i++){
            fetch(process.env.REACT_APP_BACKEND_URL,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({query:SINGLE_PRODUCT_QUERY, variables:`{"productId": "${cartItems[i].id}"}`})
            }).then(response => response.json()).then(response => setCartInfo(
                cartInfo => [...cartInfo, [response.data.product.name, response.data.product.brand, response.data.product.gallery[0]]]));
        }
    },[]);

    for(let i=0; i<=(cartInfo.length/2)-1; i++){
        cartInfo1.push(cartInfo[i]);
    }
    console.log("CART",cartInfo1);
    return(
        <div>
            <div className={"cart-title"}>CART</div>
            <div className={"cart-main"}>
                MAIN
            </div>
            <div>
                <p className={"cart-tax-quantity"}>Tax 21%:</p>
                <p className={"cart-tax-quantity"}>Quantity: <span className={"cart-bold-text"}>{cartQuantity}</span></p>
                <p className={"cart-total"}>Total:</p>
            </div>
        </div>
    )
}
export default Cart;