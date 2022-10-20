import "./MiniCart.css";
import {useShoppingCart} from "../../context/StateContext";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useEffect, useState} from "react";

const MiniCart = ({setIsOpen, activeCurrency}) =>{
    const { increaseCartQuantity, decreaseCartQuantity, cartItems, cartQuantity, getItemSpecs, changeItemSpecs } = useShoppingCart();
    const [total, setTotal] = useState(0);

    useEffect(()=> {
        let SumArray = [];

        for(let i=0;i<=cartItems.length-1;i++){
            SumArray.push(cartItems[i].prices[activeCurrency].amount * cartItems[i].quantity)}

        const sum = SumArray.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);

        setTotal(sum);

    },[ activeCurrency, cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity])

    return(
        <div className={"mini-wrapper"} onClick={() => setIsOpen(false)}>
            <div className={"mini-background"} onClick={(e) => e.stopPropagation()}>
                {cartQuantity > 0 ? (<div>
                <div className={"mini-text-wrapper"}>
                    <span className={"mini-bold"}>My Bag</span><span className={"mini-items"}>, {cartQuantity} items</span>
                </div>
                <div className={"mini-main-wrapper"}>
                    {cartItems.map(items =>(
                        <div key={items.id} className={"mini-half-wrapper"}>
                            <div className={"mini-first-half"}>
                                <div className={"mini-name"}>{items.name}</div>
                                <div className={"mini-brand"}>{items.brand}</div>
                                <div className={"mini-price"}>{items.prices[activeCurrency].currency.symbol} {items.prices[activeCurrency].amount}</div>
                                {items.specifications.map(specs =>(
                                    <div key={specs.id}>
                                        {specs.type === "swatch" ? (
                                            <div className={"mini-flex"}>
                                                <div className={"mini-options-name"}>{specs.id}:</div>
                                                <div className={"mini-option-button-wrapper"}>
                                                    {specs.items.map(item =>(
                                                        <div key={item.id+item[1]} className={"mini-options-buttons"} style={item[2] === 1 ? {background:item[1],
                                                            outline: "1px solid #5ECE7B", outlineOffset: "1px"} : {background:item[1]}} id={item.id+specs.name+specs.id}/>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={"mini-flex"}>
                                                <div className={"mini-options-name"}>{specs.id}:</div>
                                                <div className={"mini-option-button-wrapper"}>
                                                    {specs.items.map(item =>(
                                                        <div key={item.id+item[0]} className={"mini-options-buttons"}  id={item.id+item.name+specs.id}
                                                             style={item[2] === 1 ? {background:"black", color:"white"} : {background:"white", color:"black"}}>
                                                            {item[1]}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                            <div className={"mini-second-half"}>
                                <div className={"mini-2-button-wrapper"}>
                                    <button className={"mini-2-in-dec-btn"} onClick={()=> increaseCartQuantity(items.id)}><AiOutlinePlus/></button>
                                    <p className={"mini-2-quantity"}>{items.quantity}</p>
                                    <button className={"mini-2-in-dec-btn"} onClick={() => decreaseCartQuantity(items.id)}><AiOutlineMinus/></button>
                                </div>
                                <div className={"mini-2-img-wrapper"} alt={""}>
                                    <img className={"mini-2-img-itself"} src={items.imgGallery[0]} alt={""}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className={"mini-total-wrapper"}>
                        <div className={"mini-total"}>Total</div>
                        <div className={"mini-total-price"}>{cartItems[0].prices[activeCurrency].currency.symbol} {total.toFixed(2)}</div>
                    </div>
                    <div className={"mini-button-wrapper"}>
                        <a className={"mini-view-bag"} href={"/cart"}>
                            <span>VIEW BAG</span>
                        </a>
                        <a className={"mini-check-out"}>CHECK OUT</a>
                    </div>
                </div>
                </div>
                ) :
                    <div className={"mini-error-wrapper"}>
                        <div className={"mini-error-title"}>Your cart seems to be empty!</div>
                        <p className={"mini-error-desc"}>Add some products to continue..</p>
                    </div>
                }
            </div>
        </div>
    )
}
export default MiniCart;