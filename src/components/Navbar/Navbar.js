import React, {useEffect, useState} from "react";
import {CATEGORY_QUERY} from "../../utils/GraphQL/Query";
import "./Navbar.css"
import {BsFillFilterSquareFill} from "react-icons/bs";
import {FiShoppingCart} from "react-icons/fi";
import {useShoppingCart} from "../../context/StateContext";

const Navbar = ({ setActiveCurrency, activeSection, activeCurrency }) =>{
    const { openCart, cartQuantity } = useShoppingCart()
    const [Categories, setCategories] = useState([]);
    const [Currencies, setCurrencies] = useState([]);
    const [selCurrency, setSelCurrency] = useState();


    const handleChange = (e) =>{
        console.log(e.target.selectedIndex);
        setActiveCurrency(e.target.selectedIndex);
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({query:CATEGORY_QUERY})
        }).then(response => response.json()).then(response => setCurrencies(response.data.currencies) & setCategories(response.data.categories)
        & setSelCurrency(response.data.currencies[activeCurrency].symbol));
    },[activeCurrency])

    return(
        <div className={"nav-container"}>
            <div className={"nav-sections"}>
                <div className={"nav-section-container"}>
                {Categories.map((item) => {
                    return(
                        <a key={item.name} className={`nav-category ${activeSection === item.name ? 'active' : ''}`} href={`/${item.name}`}>{item.name}</a>
                    )
                })}
                </div>
                <a className={"nav-logo"} href={"/"}>
                    {<BsFillFilterSquareFill/>}
                </a>
                <div className={"nav-curr-cart-container"}>
                    <select name={"currencies"} id={"currSelect"} onChange={(e)=>handleChange(e)} value={selCurrency}>
                        {Currencies.map((item) =>(
                            <option className={"nav-curr"} key={item.label} value={item.symbol} >{item.symbol}</option>
                            ))}
                    </select>
                    <button className={"nav-cart-n-item"} onClick={openCart}>
                        {cartQuantity > 0 && (
                            <span className={"nav-cart-items"}>{cartQuantity}</span>
                        )}
                        <FiShoppingCart/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Navbar;