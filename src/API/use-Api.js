import { useEffect, useState} from "react";

export const useApi = () => {
    const [products, setProducts] = useState(null);
    const getProductdata = async () => {
        const apiD = await fetch ("https://www.increasingly.co/Clients/Interview/products.json")
        if(apiD.ok){
            const response = await apiD.json();
            setProducts(response)
        }
    };
    useEffect (() => {
        getProductdata()
    },[]);
    return {products};
};

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { CartProvider } from './cartContext';
// import Navbar from './components/Navbar';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <CartProvider>
//     <Navbar/><App/></CartProvider>
//   </React.StrictMode>
// );

// reportWebVitals();