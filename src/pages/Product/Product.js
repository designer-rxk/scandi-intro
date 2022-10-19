import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SINGLE_PRODUCT_QUERY} from "../../utils/GraphQL/Query";
import "./Product.css";
import {useShoppingCart} from "../../context/StateContext";

const Product = ({ setActiveSection, activeCurrency }) => {
    const params = useParams();
    const [mainDisplay, setMainDisplay] = useState([]);
    const [productGallery, setProductGallery] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [productPrice, setProductPrice] = useState([]);
    const [productSymbol, setProductSymbol] = useState([]);
    const [passablePrice, setPassablePrice] = useState([]);

    const { addToCart, cartItems } = useShoppingCart();
    const len = productOptions.length -1;
    const itemsToFill = [];
    let uuid = '';

    const checkProduct = (e, id, objID, type) =>{


        console.log(objID)
        for(let i=0;i<=len;i++){
            itemsToFill.push([productOptions[i].id,''])
            if(itemsToFill.length -1 > len) itemsToFill.splice(len+1);
            if(productOptions[i].id === id) {
                itemsToFill[i].splice(1, 1, e.target.innerText);
                if(type === "fill"){
                    document.getElementById(objID).style.background = "#1D1F22";
                    document.getElementById(objID).style.color = "white";
                }
                else if(type ==="color"){
                    document.getElementById(objID).style.border = "1px solid #5ECE7B";
                }
            }
        }
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({query:SINGLE_PRODUCT_QUERY, variables:`{"productId": "${params.id}"}`})
        }).then(response => response.json()).then(response => setProductGallery(response.data.product.gallery) & setMainDisplay(response.data.product.gallery[0])
         & (setProductInfo(response.data.product) & setProductOptions(response.data.product.attributes) & setActiveSection(response.data.product.category)
            & setProductPrice(response.data.product.prices[activeCurrency]) & setProductSymbol(response.data.product.prices[activeCurrency].currency.symbol)
            & setPassablePrice(response.data.product.prices))
        );
    },[activeCurrency])

    const SendToCart = () => {
        if(itemsToFill.length === 0 && len >= 0) {
            alert("Fill out the specifications!");
            return;
        }
        if(itemsToFill.every(x => x.every(a => a !== '')) === true){
            let uuid = '';
            console.log(itemsToFill)
            for(let i=0;i<=itemsToFill.length-1;i++){
                uuid = uuid+itemsToFill[i].toString()
            }
            addToCart(params.id+"-"+uuid, itemsToFill, productGallery,
                productInfo.name, productInfo.brand, passablePrice, productOptions);
        }else{
            alert("Fill out the specifications!");
        }
    }
    return(
        <div className={"product-page-wrapper"}>
            <div className={"product-image-box"}>
                <div className={"product-image-individual"}>
                    {productGallery.map(items => (
                        <img src={items} alt={""} key={items} className={"product-display-images"} onClick={() => setMainDisplay(items)}/>
                    ))}
                </div>
            </div>
            <div className={"product-main-image"}>
                <img src={mainDisplay} alt={"mainDisplay"} className={"product-main-display-image"}/>
            </div>
            <div className={"product-desc-box"}>
                <h1 className={"product-name"}>{productInfo.name}</h1>
                <h2 className={"product-description"}>{productInfo.brand}</h2>

                <div className={"product-options"}>
                    <div>{productOptions.map((items)=>(
                        <div key={items.id}>
                            <div className={"product-options-name"}>{items.name}:</div>
                            {items.type === 'swatch' ? (
                                <div className={"product-options-box"}>
                                    {items.items.map((options)=>(
                                    <button key={options.id} className={"product-options-items"} style={{background:options.value}} id={options.id+items.name}
                                            onClick={(e)=>checkProduct(e,items.id, options.id+items.name, "color")}/>
                                ))}
                                </div>
                            ) : (
                                <div className={"product-options-box"}>{items.items.map((options)=>(
                                    <button key={options.id} className={"product-options-items"} id={options.id+items.name}
                                            onClick={(e)=>checkProduct(e,items.id, options.id+items.name, "fill")}>{options.value}</button>
                                ))}
                                </div>
                            )}
                        </div>
                    ))}
                        <div className={"product-options-name"}>PRICE:</div>
                        <div className={"product-price"}>{productSymbol} {productPrice.amount}</div>
                        <div className={"product-center"}>
                            <button className={"product-add"} onClick={()=>SendToCart(params.id)}>ADD TO CART</button>
                        </div>
                        <div className={"product-description text"} dangerouslySetInnerHTML={{ __html: productInfo.description}}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Product