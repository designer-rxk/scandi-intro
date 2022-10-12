import "./ShoppingCart.css";
import {useShoppingCart} from "../../context/StateContext";
const ShoppingCart = ({setIsOpen}) =>{
    const { increaseCartQuantity, cartItems, cartQuantity } = useShoppingCart();

    return(
        <div className={"sh-cart-wrapper"} onClick={() => setIsOpen(false)}>
            <div className={"sh-cart-background"} onClick={(e) => e.stopPropagation()}>
                <div className={"sh-cart-ol-wrapper"}>
                    My Bag, {cartQuantity} items
                </div>
                <div>
                    Main
                </div>
                <div>
                    <button>
                        <a href={"/cart"}>VIEW BAG</a>
                    </button>
                    <button>CHECK OUT</button>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;