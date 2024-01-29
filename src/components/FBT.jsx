import { useState, useEffect } from "react";
import { fetchProducts } from "../utils";
import style from './FBT.css'
import ProductCard from "./ProductCard";
import imgSrc from "./images";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';

const FBT = function(){
    const [products, setProducts] = useState(null);
    const [activeProducts, setActiveProducts] = useState(null);
    useEffect(() => {
        const getProducts = async () => {
            const prodResp = await fetchProducts("https://www.increasingly.co/Clients/Interview/products.json")
            setProducts(prodResp.responseData.products)
            setActiveProducts(prodResp.responseData.products)
        }
        getProducts()
    }, [])

    if(!products) {
        return (
            <div className='loading'><span className="sr-only">Loading...</span></div>
        )
    }
    return (
        <div className='fbt_block'>
            <div className="fbt_title">Frequently Bought Together</div>
            <div className="fbt_wrapper">
                <div className="fbt_wrapper_products">
                    <div className="mainproducts">
                    <div key={activeProducts[0].id} className='product_list mainproduct'>
                            <ProductCard product={activeProducts[0]} index={0} />
                            <div className="checkbox_btn">
                                <span className="checkbox_spn"><input type="checkbox" id="test0" /><label for="test0"></label></span>
                                <button className='addtocartbtn'>Add to Bundle</button>
                            </div>
                        </div>
                    </div>
                    <div className="plusicon">+</div>
                    <div className="fbt_item_wrap">
                        <div className="fbt_item_wrap_slider">
                        <Swiper spaceBetween={10}
                            modules={[Navigation]}
                            slidesPerView={2}
                            allowTouchMove={false}
                            navigation={{ disabledClass: 'inc_disabled' }}>
                            {
                                activeProducts.map ((product, index) => {
                                    product.imageURLN = imgSrc[index]
                                    if(index !== 0){
                                        return (
                                            <SwiperSlide>
                                                <div key={product.id} className='product_list mainproduct'>
                                                <ProductCard product={product} index={index} />
                                                    <div className="checkbox_btn">
                                                        <span className="checkbox_spn"><input type="checkbox" id={"test" +index} /><label for={"test" +index}></label></span>
                                                        <button className='addtocartbtn'>Add to Bundle</button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    }
                                })
                            }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="fbt_summary_wrap">
                    <div className="fbt_summary_list">

                    </div>
                    <div className="fbt_summary_btn">
                        <button className="fbt_add_btn">Add Bundle To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FBT;
