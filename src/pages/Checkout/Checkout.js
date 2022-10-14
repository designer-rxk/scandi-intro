import "./Checkout.css";
import {useShoppingCart} from "../../context/StateContext";
import {useEffect, useState} from "react";

const Checkout = ({setActiveSection, activeCurrency}) =>{
    const { cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(()=>{
        setActiveSection('all');
    },)

    useEffect(()=>{
        let sumArray = [];
        for(let i=0;i<=cartItems.length-1;i++){
            sumArray.push(cartItems[i].prices[activeCurrency].amount * cartItems[i].quantity)}
        const sum = sumArray.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        setTotal(sum);
        setTax(total * 0.21);
    },[ activeCurrency, cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity, total])

    console.log(cartItems)
    return(
        <div className={"check-wrapper"}>
            <div className={"check-title"}>Checkout</div>
            <div className={"check-main"}>
                {cartItems.map((items,index) =>(
                    <div key={index} className={"check-main-wrapper"}>
                    <div className={"check-first-half"}>
                        <p className={"check-name"}>{items.name}</p>
                        <p className={"check-brand"}>{items.brand}</p>
                        <p className={"check-price"}>{items.prices[activeCurrency].currency.symbol} {items.prices[activeCurrency].amount}</p>
                        <p className={"check-quantity"}>Quantity: <span className={"check-qty"}>{items.quantity}</span></p>
                        {items.specifications.map((specs, idx) =>(
                            <div key={idx} className={"check-opt-wrapper"}>
                                <p className={"check-opt-name"}>{specs[0]}: <span className={"check-opt-itself"}>{specs[1]}</span></p>
                            </div>
                        ))}
                    </div>
                        <div className={"check-second-half"}>
                            <div className={"check-image-wrapper"}>
                                <img src={items.imgGallery[0]} alt={items.id} className={"check-image"} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p className={"cart-tax-quantity"}>Tax 21%: <span className={"cart-bold-text"}>{tax.toFixed(2)}</span></p>
                <p className={"cart-tax-quantity"}>Quantity: <span className={"cart-bold-text"}>{cartQuantity}</span></p>
                <p className={"cart-total"}>Total: <span className={"cart-bold-text"}>{cartItems[0].prices[activeCurrency].currency.symbol}
                    {total.toFixed(2)}</span></p>
                <a className={"cart-order-button"} href={"/"}>RETURN</a>
            </div>
        </div>
    )
}
export default Checkout;