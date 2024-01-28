import React from "react";
import '../App.css';
import { useEffect, useState } from 'react';
import Price from '../atoms/Price';
import { useCart } from '../cartContext';
import { fetchProducts } from '../utils';
import Filter from '../components/Filter';

function ProductRecs() {
    const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
  const [products, setProducts] = useState(null)
  const [activeProducts, setActiveProducts] = useState(null)

  const imgSrc = ['https://www.avon.ro/assets/ro-ro/images/product/prod_1192040_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1225240_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1222635_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1197963_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1224452_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1226012_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1226823_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1225161_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1231922_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1199492_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_5465370_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1228135d_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1226512_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1225974_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_1222678_1_310x310.jpg', 'https://www.avon.ro/assets/ro-ro/images/product/prod_2401240_1_310x310.jpg']

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
        </div>
        <div className='product_block'>
        {activeProducts.map((products, index) => {
            products.imageURLN = imgSrc[index]
            return (
            <div key={products.id} className='product_list'>
                <p>{products.category}</p>
                <div className='image_block'><img src={imgSrc[index]} alt={products.product_name} /></div>
                <h2 className='product_name'>{products.product_name}</h2>
                <span className='product_c'>{products.brand}</span>
                <Price price={products.price} discounted_price={products.discounted_price} />
                <button onClick={() => addItemToCart(products)} className='addtocartbtn'>Add to cart</button>
            </div>
            )
        })}
        </div>
    </div>
  );
};

export default ProductRecs;