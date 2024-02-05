import React, { useEffect } from "react";
import { useState } from "react";
import '../App.css';
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export default function DropDown() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    if(click){
        if(isMobile)document.querySelector('.hideMenu').click()
    }
    const handleOnclickMenu = (checkflag) => {
        setClick(checkflag);
        if(document.querySelector('body').classList.contains('modal-open')){
            document.querySelector('body').classList.remove('modal-open')
        }else{
            document.querySelector('body').classList.add('modal-open')
        }
    }
    
    
    return (
        <>
        <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
            {MenuItems.map((item, index) => {
            return (
                isTabletOrMobile ? 
                <li key={index} onClick={() => handleOnclickMenu(isTabletOrMobile ? false : true)}><Link className={item.cName} to={item.path} >{item.title}</Link></li> : <li key={index} onClick={() => setClick(false)}><Link className={item.cName} to={item.path} >{item.title}</Link></li>
            )
            })}
        </ul>
        </>
    )
}