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
        <div className={"mini-wrapper"} onClick={() => setIsOpen(false)}>
            <div className={"mini-background"} onClick={(e) => e.stopPropagation()}>
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
                                {items.options.map(options =>(
                                    <div key={options.id}>
                                        {options.type === 'swatch' ? (
                                            <div className={"mini-flex"}>
                                                <div className={"mini-options-name"}>{options.name}:</div>
                                                <div className={"mini-option-button-wrapper"}>
                                                    {options.items.map(item =>(
                                                        <button key={item.id} className={"mini-options-buttons"} style={{background:item.value}} id={item.id+options.name+options.id}
                                                                onClick={(e)=> changeSpecs(options.id, items.id, e, item.id+options.name+options.id, "color")}/>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={"mini-flex"}>
                                                <div className={"mini-options-name"}>{options.name}:</div>
                                                <div className={"mini-option-button-wrapper"}>
                                                    {options.items.map(item =>(
                                                        <button key={item.id} className={"mini-options-buttons"} id={item.id+options.name+options.id}
                                                                onClick={(e)=> changeSpecs(options.id, items.id, e, item.id+options.name+options.id, "fill")}>
                                                            {item.value}
                                                        </button>
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
                        <a className={"mini-check-out"} href={"/checkout"}>CHECK OUT</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MiniCart;