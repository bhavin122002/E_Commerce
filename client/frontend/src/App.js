import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResetPass from "./components/resetPass";
import AutoImageSlider from "./components/autoImageSlider";
import ProductDetils from "./components/productDetial";
import CardData from "./components/cardsData";
import AddtoCart from "./components/AddtoCart";
import Navbar from "./components/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={AutoImageSlider} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/reset" Component={ResetPass} />
        <Route path="/product/:category" Component={CardData} />
        <Route path="/productdata/:id" Component={ProductDetils} />
        <Route path="/addtocart/:id" Component={AddtoCart} />
      </Routes>
    </>
  );
};

export default App;
