import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResetPass from "./components/resetPass";
import AutoImageSlider from "./components/autoImageSlider";
import ProductDetils from "./components/productDetial";
import CardData from "./components/cardsData";
import AddtoCart from "./components/AddtoCart";
import AddtoCartPage from "./components/AddtoCartPage";
import Navbar from "./components/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useState } from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AutoImageSlider />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/cart" element={<AddtoCartPage />} />
        <Route path="/product/:category" element={<CardData />} />
        <Route path="/productdata/:id" element={<ProductDetils />} />
        <Route path="/addtocart/:id" element={<AddtoCart />} />
      </Routes>
    </>
  );
};

export default App;
