import React from "react";
import { useState, useEffect } from "react";
import { fetchProducts } from "../utils";
import ProductCard from "./ProductCard";
import './CartRecs.css';
import imgSrc from "./images";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from "../cartContext";
import 'swiper/css';
import { useMediaQuery } from 'react-responsive';

const CatRecs = function(){
    const [cartProducts, setCartProducts] = useState(null);
    const [activeCartproducts, setActiveCartproducts] = useState(null);
    const { cart, addItemToCart, removeItemFromCart, clearCart, bundleAddToCart} = useCart();
    const isTablet = useMediaQuery({ query: '(max-width: 420px)' });

    const [slides, setSlides] = useState(0);

    const setSlidesPerview = () => {
        setSlides(
        window.innerWidth <= 400  ? 1.5 : window.innerWidth <= 520  ? 2.2 : window.innerWidth < 620  ? 2.7 : window.innerWidth < 990  ? 3.5 : window.innerWidth > 990  ? 4 : 4
        );
    };
    // const setSlidesPerview = () => {
    //     setSlides(
    //       window.innerWidth <= 550
    //         ? 1.5
    //         : window.innerWidth <= 720
    //         ? 2.5
    //         : window.innerWidth > 720
    //         ? 3.2
    //         : window.innerWidth > 720
    //         ? 4
    //         : 4
    //     );
    //   }
    
    useEffect(() => {
        const getCartProducts = async () => {
            const responseCart = await fetchProducts("https://www.increasingly.co/Clients/Interview/products.json");
            setCartProducts(responseCart.responseData.products)
            setActiveCartproducts(responseCart.responseData.products)
        }
        getCartProducts()
        //Initially set the amount of slides on page load
        setSlidesPerview();
        // Add the event listner on component mount
        window.addEventListener("resize", setSlidesPerview);

        // Remove the listner when component unmounts
        return () => {
            window.removeEventListener("resize", setSlidesPerview);
        };
    }, [])
    
    if(!cartProducts) {
        return (
            <div className='loading'><span className="sr-only">Loading...</span></div>
        )
    }
    return (
        <div className="cart-recs">
            <div className="cart-recs-title">Customers Also Bought</div>
            <div className="cart-recs-list">
                <div className="cart_item_wrap_slider">
                    <Swiper spaceBetween={isTablet ? 0 : 10}
                        modules={[Navigation]}
                        slidesPerView={slides}
                        allowTouchMove={slides ? true : false}
                        scrollbar={slides ?  true : false }
                        navigation={{ disabledClass: 'inc_disabled' }}
                        >
                        {
                            activeCartproducts.map ((cartPrd, index) => {
                                cartPrd.imageURLN = imgSrc[index]
                                return (
                                    <SwiperSlide>
                                        <div className="cart-products product_list" key={cartPrd.id}>
                                            <ProductCard product={cartPrd} index={index}/>
                                            <button onClick={() => addItemToCart(cartPrd)} className='addtocartbtn'>Add to cart</button>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
};

export default CatRecs;
