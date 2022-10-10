import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SINGLE_PRODUCT_QUERY} from "../../utils/GraphQL/Query";

const Product = () => {
    const params = useParams();
    const [mainDisplay, setMainDisplay] = useState([]);
    const [productGallery, setProductGallery] = useState([]);
    const [productInfo, setProductInfo] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({query:SINGLE_PRODUCT_QUERY, variables:`{"productId": "${params.id}"}`})
        }).then(response => response.json()).then(response => setProductGallery(response.data.product.gallery) & setMainDisplay(response.data.product.gallery[0])
        & console.log(response.data.product) & (setProductInfo(response.data.product))

        );
    },[])

    console.log(productInfo)

    return(
        <div className={"product-page-wrapper"}>
            <div className={"product-image-box"}>
                {productGallery.map(items => (
                    <img src={items} alt={""} key={items}/>
                ))}

            </div>
            <div className={"product-main-image"}>
                <img src={mainDisplay}/>{console.log(mainDisplay)}
            </div>
            <div className={"product-desc-box"}>
                {productInfo.name} {productInfo.description}
            </div>
        </div>
    )
}
export default Product