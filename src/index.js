
import React from 'react';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import BestSeller from "./pages/BestSeller";
import { CartProvider } from './cartContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FBT from './components/FBT';
import CatRecs from './components/CatRecs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/productListing" element={<BestSeller />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fbt" element={<FBT />} />
          <Route path="/categoryProducts" element={<CatRecs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider><App/></CartProvider>
  </React.StrictMode>
);

reportWebVitals();