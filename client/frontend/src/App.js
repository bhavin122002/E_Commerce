import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResetPass from "./components/resetPass";
import AutoImageSlider from "./components/autoImageSlider";
import ProductDetils from "./components/productDetial";
import CardData from "./components/cardsData";
import AddtoCart from "./components/AddtoCart";
import Earrings from "./components/Navbars/Earrings";
import Drops from "./components/Navbars/Drops";
import Barceletsbangles from "./components/Navbars/Barceletsbangles";
import Hoopearrings from "./components/Navbars/Hoopearrings";
import Rings from "./components/Navbars/Rings";
import Navbar from "./components/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={AutoImageSlider} />
        <Route path="/rings" Component={Rings} />
        <Route path="/drops" Component={Drops} />
        <Route path="/earrings" Component={Earrings} />
        <Route path="/hoopearrings" Component={Hoopearrings} />
        <Route path="/barceletsbangles" Component={Barceletsbangles} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/reset" Component={ResetPass} />
        <Route path="/product/:categoryId" Component={CardData} />
        <Route path="/productdata/:id" Component={ProductDetils} />
        <Route path="/addtocart/:id" Component={AddtoCart} />
      </Routes>
    </>
  );
};

export default App;
