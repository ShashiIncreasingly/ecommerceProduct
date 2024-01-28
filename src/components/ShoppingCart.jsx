import React, { useState } from 'react';
import { useCart } from '../cartContext';
import Price from '../atoms/Price';
import SubTotal from './SubTotalPrice';

const ShoppingCart = () => {
   const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
   const [showCart, setShowCart] = useState(false)
   
   return (
      
      <div className='cart_header_b'>
         {document.body.classList.remove('open')}
         <div className='flex items-center gap-2 cart_header' onClick={() => setShowCart(true)}><div className='carticon'><p>Cart</p><p className='font-light cart_count'>{cart.length}</p></div><SubTotal/></div>
         {showCart && <div onClick={() => setShowCart(false)} className='overlay'></div>}
         {showCart && <div className='absolute bg-gray-100 h-full shadow-lg border w-80 p-2 top-0 right-0 minicartopen modalopen'>
            {document.body.classList.add('open')}
            <div className="flex gap-2">
               <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 close_btn' onClick={() => setShowCart(false)} > </button>
               <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 clear_cart' onClick={() => clearCart()}>Clear Cart</button>
            </div >

            <ul className=' border-t flex flex-col gap-2 text-sm font-light pt-5 product_block_list'>
               {cart.map(item => (
                  <li key={item.id} className='flex items-center justify-between product_list_cart'>
                     <div className='cart_image_block'><img src={item.imageURLN} alt={item.product_name} /></div>
                     <div className='product_cart_price_title'><p className='product_name_cart'>{item.product_name} </p> <p className='qty'>Quantity : {item.qty_val} </p>
                     <div className='cart_price_bk'>Price: <Price price={item.price} discounted_price={item.discounted_price} /> </div></div>
                     <button onClick={() => removeItemFromCart(item.id)} className='product_btn_cart'></button>
                  </li>
               ))}
            </ul>
            <div className='subTotalBlock'><span>SubTotal :</span> <SubTotal/></div>
            
         </div>}

      </div>
   );
};

export default ShoppingCart;