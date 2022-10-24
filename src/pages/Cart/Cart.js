import "./Cart.css";
import {useShoppingCart} from "../../context/StateContext";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {useEffect, useState} from "react";

const Cart = ({ activeCurrency }) =>{
    const {  cartQuantity, cartItems, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

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

    const Carousel = ({id, gallery } ) => {
        const [index, setIndex] = useState(0);
        console.log(index)

        const evalPrev = () =>{
            if( index === 0 ){
                setIndex(gallery.length-1)
            }else{
                setIndex(prevState => prevState -1);
            }
        }

        const evalNext = () =>{
            if( index === gallery.length-1 ){
                setIndex(0)
            }else{
                setIndex(prevState => prevState +1);
            }
        }

        return(
            <div>
                <img src={gallery[index]} alt={id} className={"cart-image"}/>
                {gallery.length > 1 &&
                    <div>
                        <button className={"cart-button prev"} onClick={()=>evalPrev()}>&lt;</button>
                        <button className={"cart-button next"} onClick={()=>evalNext()}>&gt;</button>
                    </div>}
            </div>
        )
    };

    return(
        <div>{cartQuantity > 0 ? <div>
            <div className={"cart-title"}>CART</div>
                {cartItems.map((items) =>(
                    <div key={items.id} className={"cart-main"}>
                        <div className={"cart-info-wrapper"}>
                            <p className={"cart-name"}>{items.name}</p>
                            <p className={"cart-description"}>{items.brand}</p>
                            <p className={"cart-item-price"}>{items.prices[activeCurrency].currency.symbol} {items.prices[activeCurrency].amount}</p>
                            {items.specifications.map((specs) =>(
                                <div key={specs.id}>
                                    {specs.type === 'swatch' ? (<>
                                            <div className={"cart-options-name"}>{specs.id}:</div>
                                        <div className={"cart-options-break"}>
                                            {specs.items.map((i)=>(
                                                <div key={i.id+i[1]} className={"cart-options-buttons"} style={i[2] === 1 ? {background:i[1],
                                                    outline: "1px solid #5ECE7B", outlineOffset: "1px"} : {background:i[1]}} id={i.id+specs.name+specs.id}/>
                                            ))}
                                        </div></>
                                    ) : (<>
                                        <div className={"cart-options-name"}>{specs.id}:</div>
                                        <div className={"cart-options-break"}>
                                            {specs.items.map((i)=>(
                                                <div key={i.id+i[0]} className={"cart-options-buttons"}  id={i.id+i.name+specs.id}
                                                     style={i[2] === 1 ? {background:"black", color:"white"} : {background:"white", color:"black"}}>
                                                    {i[1]}
                                                </div>
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
                                    <Carousel id={items.id} gallery={items.imgGallery}/>
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
                <a className={"cart-order-button"}>ORDER</a>
            </div>
        </div> :
            <div>
                <h1 className={"cart-error-title"}>Your cart seems to be empty!</h1>
                <p className={"cart-error-desc"}>Add some products to continue..</p>
                <a className={"cart-order-button"} href={"/"}>RETURN</a>
        </div>}
        </div>
    )
}
export default Cart;