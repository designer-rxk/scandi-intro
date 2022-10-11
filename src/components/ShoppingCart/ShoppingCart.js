import "./ShoppingCart.css";
const ShoppingCart = ({setIsOpen}) =>{
    return(
        <div className={"sh-cart-wrapper"} onClick={() => setIsOpen(false)}>
            <div className={"sh-cart-background"} onClick={(e) => e.stopPropagation()}>
                <div className={"sh-cart-ol-wrapper"}>
                    My Bag, 3 items
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;