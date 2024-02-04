import { useState, useEffect } from "react";
import { fetchProducts } from "../utils";
import ProductCard from "./ProductCard";
import style from './FBT.css'
import imgSrc from "./images";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from "../cartContext";
import 'swiper/css';
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
import { useMediaQuery } from 'react-responsive';


const FBT = function(){
    const [products, setProducts] = useState(null);
    const [activeProducts, setActiveProducts] = useState(null);
    const [selectedProducts, setselectedProducts] = useState([]);
    const [addedProductsToBundle, setaddedProductsToBundle] = useState([]);
    const { cart, addItemToCart, removeItemFromCart, clearCart, bundleAddToCart} = useCart();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1290px)' });
    const [clicked, setClicked] = useState('');

    const [subTotalBundlePrice, setSubTotalBundlePrice] = useState(0)
    const [subTotalDiscountBundlePrice, setSubTotalDiscountBundlePrice] = useState(0)
    

    useEffect(() => {
        const getProducts = async () => {
            const prodResp = await fetchProducts("https://www.increasingly.co/Clients/Interview/products.json")
            setProducts(prodResp.responseData.products)
            setActiveProducts(prodResp.responseData.products)
        }
        getProducts()
    }, [])

    const handleSelectedBundle = (items,btntext) => {
        let elmBtn = btntext;
        if(elmBtn.querySelector('.addtocartbtn').innerText.toLowerCase() === "add to bundle"){
            elmBtn.querySelector('.addtocartbtn').innerText = "Added";
            setselectedProducts([...selectedProducts, items])
            setaddedProductsToBundle([...addedProductsToBundle, items.id])
            clicked ? setClicked('') : setClicked('active');
        }else {
            elmBtn.querySelector('.addtocartbtn').innerText = "Add to Bundle";
            const updatedProducts = selectedProducts.filter ((selectedProducts) => selectedProducts.id !== items.id)
            const updatebundleprodcheck = addedProductsToBundle.filter ((addedProductsToBundle) => addedProductsToBundle !== items.id)
            setselectedProducts(updatedProducts)
            setaddedProductsToBundle(updatebundleprodcheck)
            clicked ? setClicked('') : setClicked('in-active');
        }
        totalBundlePrice()
    }

    const handleRemoveProductBundle = (item) => {
        const removeProductBundle = selectedProducts.filter ((selectedProducts) => selectedProducts.id !== item.id)
        const bundleremoveprod = addedProductsToBundle.filter ((addedProductsToBundle) => addedProductsToBundle !== item.id)
        setselectedProducts(removeProductBundle)
        setaddedProductsToBundle(bundleremoveprod)
        clicked ? setClicked('') : setClicked('active');
        totalBundlePrice()
    }
    const handleAddtocart = () => {
        bundleAddToCart(selectedProducts)
        setselectedProducts([])
        setaddedProductsToBundle([])
        totalBundlePrice()
    }
    const totalBundlePrice  = () => {
        let totalPrice=0
        let totalDiscountPrice=0
        selectedProducts.map((bundleprod) => {
            totalDiscountPrice += bundleprod.discounted_price ?  bundleprod.discounted_price :  bundleprod.price
            totalPrice += bundleprod.price
        })
        setSubTotalBundlePrice(totalPrice)
        setSubTotalDiscountBundlePrice(totalDiscountPrice)
    }
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
                            <div className={`checkbox_btn ${addedProductsToBundle.includes(activeProducts[0].id) ? 'active' : 'inactive'}`} onClick={ (e) => handleSelectedBundle(activeProducts[0],e.currentTarget)}>
                                <span className="checkbox_spn"></span>
                                <button className='addtocartbtn'>Add to Bundle</button>
                            </div>
                        </div>
                    </div>
                    <div className="plusicon">+</div>
                    <div className="fbt_item_wrap">
                        <div className="fbt_item_wrap_slider">
                        <Swiper spaceBetween={isTabletOrMobile ? 0 : 10}
                            modules={[Navigation]}
                            slidesPerView={isTabletOrMobile ? 1.2 : 2}
                            allowTouchMove={isTabletOrMobile ? true : false}
                            scrollbar={isTabletOrMobile ?  true : false }
                            navigation={{ disabledClass: 'inc_disabled' }}>
                            {
                                activeProducts.slice(1).map ((product, index) => {
                                    product.imageURLN = imgSrc[index]
                                    activeProducts[0].imageURLN = imgSrc[0]
                                    return (
                                        <SwiperSlide>
                                            <div key={product.id} className='product_list mainproduct'>
                                            <ProductCard product={product} index={index} />
                                                <div className={`checkbox_btn ${addedProductsToBundle.includes(product.id) ? 'active' : 'inactive'}`} onClick={ (e) => handleSelectedBundle(product,e.currentTarget)}>
                                                    <span className="checkbox_spn"></span>
                                                    <button className='addtocartbtn'>Add to Bundle</button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="fbt_summary_wrap">
                    <div className="fbt_summary_list">
                        {
                            selectedProducts.map((bundlepr) => {
                                return (
                                    <div className="summary-product-block">
                                        <div className="image-block">
                                            <img src={bundlepr.imageURLN} alt={bundlepr.product_name} />
                                        </div>
                                        <div className="product-details">
                                            <div className="product-tile">{bundlepr.product_name}</div>
                                            <div className="product-price">{bundlepr.discounted_price ? <span>{bundlepr.discounted_price}<s>{bundlepr.price}</s></span> : <span>{bundlepr.price}</span>}</div>
                                        </div>
                                        <span className="delete-bundle-prod" onClick={(e) => handleRemoveProductBundle(bundlepr)}></span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="fbt_summary_btn">
                        <div className="sub-total-item">Total Items : {<span>{addedProductsToBundle.length}</span>}</div>
                        <div className="sub-total-price"> Total Price : 
                            {subTotalDiscountBundlePrice !== 0 && <span className="price">₹{parseFloat(subTotalDiscountBundlePrice).toFixed(2)}</span>}
                            {subTotalBundlePrice !== 0 && <span className="strike_price line-through">₹{parseFloat(subTotalBundlePrice).toFixed(2)}</span>}
                        </div>
                        <button className="fbt_add_btn" onClick={() => handleAddtocart()}>Add Bundle To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FBT;
