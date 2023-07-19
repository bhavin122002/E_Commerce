import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import Product from "./Components/Pages/Product";
import Category from "./Components/Pages/Category";
import HomePage from "./Components/Pages/HomePage";
import Coustemer from "./Components/Pages/Coustemer";
import AllProduct from "./Components/Pages/AllProduct";
import SingleProduct from "./Components/Pages/SingleProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/products/:id" Component={Product} />
        <Route path="/categroy" Component={Category} />
        <Route path="/coustemer" Component={Coustemer} />
        <Route path="/allproduct" Component={AllProduct} />
        <Route path="/singleproduct" Component={SingleProduct} />
      </Routes>
    </>
  );
}

export default App;
