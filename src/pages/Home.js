import React from "react";
import bestSeller from '../images/bestSeller.png';
import fbt from '../images/fbt.png';
import reccomendations from '../images/reccomendations.png';
import crossSell from '../images/crossSell.png';
import shashi from '../images/shashi.png';
import '../css/App.css';
import { Outlet, Link } from "react-router-dom";
import FBT from '../components/FBT/FBT';
import CatRecs from '../components/Cart/CatRecs';
import { SocialIcon } from 'react-social-icons';

function Home() {
    
    return (
        <div className="home_root"><main><div className="my-profile"><div className="profile-overlay"></div><div className="my-profile-wrapper"><div class="profile-thumb" bis_skin_checked="1"></div><h1><span>Shashi Bhushan Kumar</span></h1><h3><span className="prof-skil"> Senior FrontEnd Developer / Web Developer </span></h3><ul class="fh5co-social-icons">
        <li className="giticon"><SocialIcon network="github" url="https://github.com/Shashi1525" /></li><li className="linkedicon"><SocialIcon network="linkedin" url="https://www.linkedin.com/in/shashbhushan/" /></li><li className="browsericon"><SocialIcon network="dribbble" url="https://shashireactweb.netlify.app/" /></li> </ul></div></div><div className="header_1"><h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">
        Products which I have developed using React | JavaScript | HTML | CSS. </h1></div><div className="header_2"><Link to="/productListing"><p>Best Seller</p><img src={bestSeller} alt='Best seller'></img></Link></div><div className="header_3"><Link to="/fbt"><p>Frequently Bought Together</p><img src={fbt} alt='Frequently Bought Together'></img></Link></div><div className="header_4"><Link to="/categoryProducts"><p>Recommendation</p><img src={reccomendations} alt='Recommendation'></img></Link></div><div className="header_5"><p>Cross Selling Products</p><img src={crossSell} alt='Recommendation'></img></div><div className="header_6"></div></main></div>
    ) 
}

export default Home;