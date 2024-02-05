import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { useMediaQuery } from 'react-responsive';

export default function NavBar2() {
    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    // const closeMobileMenu = () => setClick(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

    const onMouseEnter = () => {
        if (window.innerWidth > 962) {   
          document.querySelector('.dropdown-menu').classList.remove('clicked')
        }
    }
    
    const onMouseLeave = () => {
      if (window.innerWidth > 962) {   
          document.querySelector('.dropdown-menu').classList.add('clicked')
      }
    }
    const hideModal = (event) => {
      if (window.innerWidth < 962) {   
        document.body.classList.toggle('modal-open');
      }
    }
    const getProductsDetails = () => {
      if (window.innerWidth > 962) {   
        if(document.querySelector('.dropdown-menu').classList.contains('clicked') == true){
          document.querySelector('.dropdown-menu').classList.remove('clicked')
        }else{
          document.querySelector('.dropdown-menu').classList.add('clicked')
        }
      }
    }
    return (
        <>
            <nav className='navbar'>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item home_nav_bar'><Link to="/" className='home_nav'>Home</Link></li>
            {/* <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onMouseEnter }><Link to='#' className='nav-links' onClick={closeMobileMenu } >Products <i className='fas fa-caret-down hide-on-mobile'/></Link>{isTabletOrMobile ? <DropDown /> : dropdown && <DropDown />}</li> */}
            <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ><Link to='#' className='nav-links' onClick={getProductsDetails } >Products </Link><DropDown /></li>
            <li className='nav-item'><Link to='/blogs' className='nav-links' onClick={hideModal }>Download Resume</Link></li>
            <li className='nav-item'><Link to='/contact' className='nav-links contact_nav' onClick={hideModal }>Contact</Link></li>
            </ul>
            <div onClick={hideModal}  className="hideMenu"></div>
            </nav>
        </>
    )

}