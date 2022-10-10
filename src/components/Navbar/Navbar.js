import React, {useEffect, useState} from "react";
import {CATEGORY_QUERY} from "../../utils/GraphQL/Query";
import "./Navbar.css"
import {BsFillFilterSquareFill} from "react-icons/bs";
import {FiShoppingCart} from "react-icons/fi";

const Navbar = ({ setActiveCurrency, activeSection }) =>{
    const totalQuantities = 9;
    const [Categories, setCategories] = useState([]);
    const [Currencies, setCurrencies] = useState([]);

    const handleChange = (e) =>{
        setActiveCurrency(e.target.selectedIndex);
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({query:CATEGORY_QUERY})
        }).then(response => response.json()).then(response => setCurrencies(response.data.currencies) & setCategories(response.data.categories));

    },[])

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
                    <select name={"currencies"} id={"currencies"} onChange={(e)=>handleChange(e)}>
                        {Currencies.map((item) =>(
                            <option className={"nav-curr"} key={item.label} value={item.label}>{item.symbol}</option>
                            ))}
                    </select>
                    <div className={"nav-cart-n-item"}>
                        {totalQuantities > 0 && (
                            <span className={"nav-cart-items"}>{totalQuantities}</span>
                        )}
                        <FiShoppingCart/>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Navbar;