
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <div className='px-10 py-2 border-b font-semibold flex w-full flex justify-between items-center header_wrap'>
          <div className='home_header'>
            <Link to="/"> <div className='triangle-left'><span>Shashi</span> </div></Link>
            <Link to="/"><div>Home</div></Link>
            <Link to="/recommendations"><div className='best_seller_link'>Best Seller</div></Link>
            <Link to="/blogs"><div>Blogs</div></Link>
            <Link to="/contact"><div>Contact</div></Link>
          </div>
          <div className='dashboard'> <a href='https://keen-kitten-685cf0.netlify.app/' target='_blank' rel="noreferrer">Dashboard</a></div> 
          <ShoppingCart/>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;