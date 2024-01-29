import React from "react";
import Price from "../atoms/Price";
import imgSrc from "./images";

function ProductCard({product, index}) {
    return (
        <div>
            <p>{product.category}</p>
            <div className='image_block'><img src={imgSrc[index]} alt={product.product_name} />
            </div>
            <h2 className='product_name'>{product.product_name}</h2>
            <span className='product_c'>{product.brand}</span>
            <Price price={product.price} discounted_price={product.discounted_price} />
        </div>
    )
}

export default ProductCard;