import React, {useEffect, useState} from "react";
import "./Home.css";
import { LOAD_ITEMS } from "../../utils/GraphQL/Query";

const Home = ({ activeCurrency, setActiveSection, fetchVar }) => {
    const [displayImages, setDisplayImages] = useState([]);

        useEffect(() => {
            fetch(process.env.REACT_APP_BACKEND_URL,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({query:LOAD_ITEMS,variables:`{"input": {"title": "${fetchVar}"}}`})
            }).then(response => response.json()).then(response => setDisplayImages(response.data.category.products) & setActiveSection(response.data.category.name));
        },[])

    const ChangeURL = (id) => {
        window.location.href=(`/product/${id}`);
    }

    return(
            <div className={"home-wrapper"}>
                <div className={"home-title"}>
                    Category name
                </div>
                <div className={"home-box-wrapper"}>
                    {displayImages.map((item) =>(
                        (item.inStock) === true ? (
                            <button className={"home-feat-item-box"} key={item.id} onClick={() => ChangeURL(item.id)}>
                                <div className={"home-item-img"}>
                                    <img src={item.gallery[0]} alt={item.id} className={"home-feat-img"}/>
                                </div>
                                <div className={"home-item-desc home-name"}>
                                    {item.name}
                                </div>
                                <div className={"home-item-desc home-price"}>
                                    {item.prices[activeCurrency].currency.symbol}{item.prices[activeCurrency].amount}
                                </div>
                            </button>
                            ) : (
                            <a className={"home-feat-item-box"} key={item.id}>
                                <div className={"not-in-stock"}>
                                    OUT OF STOCK
                                </div>
                                <div className={"home-item-img"}>
                                    <img src={item.gallery[0]} alt={item.id} className={"home-feat-img"}/>
                                </div>
                                <div className={"home-item-desc home-name"}>
                                    {item.name}
                                </div>
                                <div className={"home-item-desc home-price"}>
                                    {item.prices[activeCurrency].currency.symbol}{item.prices[activeCurrency].amount}
                            </div>
                        </a>)
                    ))}
                </div>
            </div>
    )
}
export default Home;
