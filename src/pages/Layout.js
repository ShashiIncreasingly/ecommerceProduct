
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Outlet, Link } from "react-router-dom";
import NavBar2 from '../components/NavBar';
import { useEffect, useState } from 'react';



const Layout = () => {
  const [showModal, setDropdown] = useState(false)
  const openModal = (event) => {
    document.body.classList.add('modal-open');
    document.querySelector('.nav-item .nav-links').click()
    // this.setState({ showModal: true });
  }
  
  return (
    <>
      <header className='px-10 py-2 border-b font-semibold flex w-full flex justify-between items-center header_wrap'>
          <div className='home_header'>
            <div onClick={openModal} className='menuBar'><div class="strip2"><div></div><div></div><div></div></div></div>
            <Link to="/"> <div className='triangle-left'><span>Shashi</span> </div></Link>
            <NavBar2/>
          </div>
          {/* <Link to="/" className='home_nav'><div>Home</div></Link>
            <Link to="/productListing" className='home_listing'><div className='best_seller_link'>Products</div></Link>
            <Link to="/blogs" className='blog_nav'><div>Download Resume</div></Link>
            <Link to="/contact" className='contact_nav'><div>Contact</div></Link> */}
          {/* <div className='dashboard'> <a href='https://keen-kitten-685cf0.netlify.app/' target='_blank' rel="noreferrer">Dashboard</a></div>  */}
          <ShoppingCart/>
      </header>
      <Outlet />
    </>
  )
};

export default Layout;