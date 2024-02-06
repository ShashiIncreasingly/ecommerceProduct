import React, { useEffect } from "react";
import { useState } from "react";
import '../../css/App.css';
import { MenuItems } from "../Nav/MenuItems";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export default function DropDown() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 960px)' });

    if(click){
        if(isMobile){
            // document.querySelector('.hideMenu').click()
        }
    }
    const handleOnclickMenu = (checkflag) => {
        setClick(checkflag);
        if (window.innerWidth > 962) {   
            document.querySelector('.dropdown-menu').classList.add('clicked')
        }
        if(isMobile){
            if(document.querySelector('body').classList.contains('modal-open')){
                document.querySelector('body').classList.remove('modal-open')
            }
        }
    }
    
    
    return (
        <>
        <ul className={isMobile ? 'dropdown-menu' : 'dropdown-menu clicked'}>
            {MenuItems.map((item, index) => {
            return (
                <li key={index} onClick={() => handleOnclickMenu(isTabletOrMobile ? false : true)}><Link className={item.cName} to={item.path} >{item.title}</Link></li>
            )
            })}
        </ul>
        </>
    )
}