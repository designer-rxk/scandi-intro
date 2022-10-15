import "./Cart.css";
import {useShoppingCart} from "../../context/StateContext";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {useEffect, useState} from "react";

const Cart = ({ setActiveSection, activeCurrency }) =>{
    const {  cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity, changeItemSpecs, getItemSpecs } = useShoppingCart()
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(()=>{
        setActiveSection('all');
    })

    useEffect(()=>{
        let sumArray = [];

        for(let i=0;i<=cartItems.length-1;i++){
            sumArray.push(cartItems[i].prices[activeCurrency].amount * cartItems[i].quantity)}

        const sum = sumArray.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);

        setTotal(sum);
        setTax(total * 0.21);

    },[ activeCurrency, cartItems, total])

    const changeSpecs = (options, id, e, objID, type) =>{
        const specs = getItemSpecs(id);
        for(let i=0;i<=specs.length-1; i++){
            if(specs[i][0] === options){
                specs[i][1] = e.target.innerText;
                if(type === "fill"){
                    document.getElementById(objID).style.background = "#1D1F22";
                    document.getElementById(objID).style.color = "white";
                }
                else if(type === "color"){
                    document.getElementById(objID).style.border = "1px solid #5ECE7B";
                }
            }
        }
        changeItemSpecs(id, specs);
    }

    return(
        <div>
            <div className={"cart-title"}>CART</div>
                {cartItems.map((items) =>(
                    <div key={items.id} className={"cart-main"}>
                        <div className={"cart-info-wrapper"}>
                            <p className={"cart-name"}>{items.name}</p>
                            <p className={"cart-description"}>{items.brand}</p>
                            <p className={"cart-item-price"}>{items.prices[activeCurrency].currency.symbol} {items.prices[activeCurrency].amount}</p>
                            {items.options.map((options) =>(<div key={options.id}>
                                    {options.type === 'swatch' ? (<>
                                            <div className={"cart-options-name"}>{options.name}:</div>
                                        <div className={"cart-options-break"}>
                                            {options.items.map((i)=>(
                                                <button key={i.id} className={"cart-options-buttons"} style={{background:i.value}} id={i.id+options.name}
                                                onClick={(e) => changeSpecs(options.id, items.id, e, i.id+options.name, "color")}/>
                                            ))}
                                        </div></>
                                    ) : (<>
                                        <div className={"cart-options-name"}>{options.name}:</div>
                                        <div className={"cart-options-break"}>
                                            {options.items.map((i)=>(
                                                <button className={"cart-options-buttons"} id={i.id+options.name} key={i.id}
                                                        onClick={(e)=> changeSpecs(options.id, items.id, e, i.id+options.name, "fill")}>
                                                <div className={"cart-button-text"}>{i.value}</div>
                                            </button>
                                        ))}
                                    </div>
                                        </>
                                )}
                                </div>
                            ))}
                        </div>
                        <div className={"cart-quantity-gallery"}>
                            <div className={"cart-hug-right"}>
                                <div className={"cart-quantity"}>
                                    <button className={"cart-inc-dec plus"} onClick={()=>increaseCartQuantity(items.id)}><AiOutlinePlus/></button>
                                    <p className={"cart-item-quantity quantity"}>{items.quantity}</p>
                                    <button className={"cart-inc-dec minus"} onClick={() =>decreaseCartQuantity(items.id)} ><AiOutlineMinus/></button>
                                </div>
                                <div className={"cart-gallery"}>
                                    <img src={items.imgGallery[0]} alt={items.id} className={"cart-image"}/>
                                    <button className={"cart-button prev"}>&lt;</button>
                                    <button className={"cart-button next"}>&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            <div>
                <p className={"cart-tax-quantity"}>Tax 21%: <span className={"cart-bold-text"}>{tax.toFixed(2)}</span></p>
                <p className={"cart-tax-quantity"}>Quantity: <span className={"cart-bold-text"}>{cartQuantity}</span></p>
                <p className={"cart-total"}>Total: <span className={"cart-bold-text"}>{cartItems[0].prices[activeCurrency].currency.symbol}
                    {total.toFixed(2)}</span></p>
                <a className={"cart-order-button"} href={"/checkout"}>ORDER</a>
            </div>
        </div>
    )
}
export default Cart;