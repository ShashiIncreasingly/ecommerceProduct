import React, { useEffect, useState } from "react";
import { useCart } from '../cartContext';

const SubTotal = () => {
    const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
    const [subTotal, setSubTotal] = useState(0)
    const [subTotalDiscount, setSubTotalDiscount] = useState(0)

    useEffect(() => {
        let totalPrice=0
        let totalDiscountPrice=0
        cart.map((product) => {
            totalDiscountPrice += product.discounted_price ?  product.discounted_price * product.qty_val :  product.price * product.qty_val
            totalPrice += product.price * product.qty_val
        })
        setSubTotal(totalPrice)
        setSubTotalDiscount(totalDiscountPrice)
    },[cart])
    return (
        <div className='cart_subTotal'>
            {subTotalDiscount !== 0 && <span className="price">₹{parseFloat(subTotalDiscount).toFixed(2)}</span>}
            {subTotal !== 0 && <span className="strike_price line-through">₹{parseFloat(subTotal).toFixed(2)}</span>}
        </div>
    )
}
export default SubTotal;