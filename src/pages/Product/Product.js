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
    const [selected, setSelected] = useState([]);

    const { addToCart } = useShoppingCart();
    const len = productOptions.length -1;

    const [test, setTest] = useState([]);
    let tempItems = [];
    let obj = [];

    useEffect(()=>{
        for(let i=0;i<=len;i++){
            for(let j=0;j<=productOptions[i].items.length-1;j++){
                tempItems.push([productOptions[i].items[j].displayValue, productOptions[i].items[j].value, 0])
            }
            obj.push({ id:productOptions[i].id, items: tempItems, type: productOptions[i].type }) ;
            tempItems = [];
        }
        setTest(obj)
        setSelected(obj);
    },[productOptions]);

    const checkProduct = (e, id, objID) =>{
            for(let i=0;i<=test.length-1;i++){
                for(let j=0;j <= test[i].items.length - 1; j++){
                    if(test[i].items[j][1] === objID && test[i].id === id){
                        test[i].items[j][2] = 1;
                    }else if(test[i].id === id){
                        test[i].items[j][2] = 0;
                    }
                }
            }
        setSelected([...test]);
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
        if(test.length === 0 && len >= 0) {
            alert("Fill out the specifications!");
            return;
        }
        if(test.every(x => x.items.every(a => a !== '')) === true){
            let uuid = '';
            for(let i=0;i<=test.length-1;i++){
                uuid = uuid+test[i].items.toString()
            }
            addToCart(params.id+"-"+uuid, test, productGallery,
                productInfo.name, productInfo.brand, passablePrice, productOptions);
        }else{
            alert("Fill out the specifications!");
        }
        window.location.reload();
    }
    return(
        <div className={"product-page-wrapper"}>{productGallery.length > 0 ? <>
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
                    <div>{selected.map((items)=>(
                        <div key={items.id}>
                            <div className={"product-options-name"}>{items.id}:</div>
                            {items.type === 'swatch' ? (
                                <div className={"product-options-box"}>
                                    {items.items.map((options)=>(
                                    <button key={options[1]} className={"product-options-items"}
                                            style={options[2] === 1 ? {background:options[1],
                                                outline: "1px solid #5ECE7B", outlineOffset: "1px"} : {background:options[1]}} id={options.id}
                                            onClick={(e)=>checkProduct(e,items.id, options[1], "color")}></button>
                                ))}
                                </div>
                            ) : (
                                <div className={"product-options-box"}>
                                    {items.items.map((options)=>(
                                    <button key={options[1]} className={"product-options-items"} id={options.id}
                                            style={options[2] === 1 ? {background:"black", color:"white"} : {background:"white", color:"black"}}
                                            onClick={(e)=>checkProduct(e,items.id, options[1], "fill")}>{options[1]}</button>
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
            </div></>:(
            <div>
                <p className={"cart-error-title"}>The product you are looking for doesn't seem to exist..</p>
                <a className={"cart-order-button"} href={"/"}>RETURN</a>
            </div>
        )}
        </div>
    )
}
export default Product