import React from "react";
import '../App.css';
import { useEffect, useState } from 'react';
import Price from '../atoms/Price';
import { useCart } from '../cartContext';
import { fetchProducts } from '../utils';
import Filter from '../components/Filter';
import ProductCard from "./ProductCard";
import imgSrc from "./images";

function ProductRecs() {
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
  const [products, setProducts] = useState(null)
  const [activeProducts, setActiveProducts] = useState(null)
  const [optionChange, setOptionChange] = useState(null)


  useEffect(() => {
    const getProducts = async () => {
      let productsRetreived = await fetchProducts("https://www.increasingly.co/Clients/Interview/products.json")
      setProducts(productsRetreived.responseData.products)
      setActiveProducts(productsRetreived.responseData.products)
    }
    getProducts()
  },[])
  const filterByBrands = (brand) => {
    let filterBrands = products.filter((product) => product.brand == brand)
    setActiveProducts(filterBrands)
  }
  const filterByCategories = (category) => {
    let filterBrands = products.filter((product) => product.category == category)
    setActiveProducts(filterBrands)
  }

  const resetFilter = () => {
    setActiveProducts(products)
  }
  function sortPrice(val){
    var productSort;
    if(val === "default"){
      productSort = products.sort((a, b) => (a.id - b.id))
    }else if(val === "decending"){
      productSort = products.sort((a, b) => ((b.discounted_price ? b.discounted_price : b.price ) - (a.discounted_price ? a.discounted_price : a.price)))
    }else if(val === "accending"){
      productSort = products.sort((a, b) => ((a.discounted_price ? a.discounted_price : a.price) - (b.discounted_price ? b.discounted_price : b.price)))
    }
    setActiveProducts(productSort)
    console.log(productSort)
    setOptionChange(val)
  }
  console.log(products)
  if(!products){
      return (
        <div className='loading'><span className="sr-only">Loading...</span></div>
      )
  }
  return (
    <div className='product_wraper'>
        <div className='filter_wrap'>
            <Filter resetFilter={resetFilter} filterByBrands={filterByBrands} filterByCategories={filterByCategories} products={products} />
            
            <div className="select_wrap">
            <div className="filter_by_price">Filter by Price:</div>
              <select onChange={(e) => sortPrice(e.target.value)}>
                <option value='default'>default</option>
                <option value='accending'>Low to High</option>
                <option value='decending'>High to low</option>
            </select>
            </div>
        </div>
        <div className='product_block'>
        {activeProducts.map((products, index) => {
            products.imageURLN = imgSrc[index]
            return (
            <div key={products.id} className='product_list'>
                <ProductCard product={products} index={index} />
                <button onClick={() => addItemToCart(products)} className='addtocartbtn'>Add to cart</button>
            </div>
            )
        })}
        </div>
    </div>
  );
};

export default ProductRecs;