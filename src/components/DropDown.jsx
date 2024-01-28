import React from "react";
import { useState } from "react";
import '../App.css';
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
export default function DropDown() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    if(click){
        document.querySelector('.hideMenu').click()
    }
    return (
        <>
        <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
            {MenuItems.map((item, index) => {
            return (
                <li key={index}><Link className={item.cName} to={item.path} onClick={() => setClick(false)}>{item.title}</Link></li>
            )
            })}
        </ul>
        </>
    )
}