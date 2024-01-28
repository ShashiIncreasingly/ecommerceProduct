import React from "react";
import Pdf from '../pdf/shashi_CV.pdf';
import res from '../images/res.png';
const Blogs = () => {
    return (
        <div className = "App blogPage">
            <div className="resume"><div className="resume_title">Please Find My Resume Below :</div> <div className="download_btn"><a href = {Pdf} target = "_blank">Download Shashi Resume in PDF format</a></div></div>
            <div className="resume_format"><img src={res} alt='resume format'></img></div>
        </div>
    );
};
  
export default Blogs;