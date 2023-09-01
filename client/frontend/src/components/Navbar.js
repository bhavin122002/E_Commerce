import React, { useCallback, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
// import logo from "../Images/logo1.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ResponsiveAppBar() {
  const [value, setValue] = useState();
  const [cartdata, setCartdata] = useState([]);
  const [res, setRes] = useState(false);
  console.log("first value set to cartdata", cartdata)

  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  const history = useNavigate();

  const getValueNavbar = (e) => {
    history("/product/" + e);
    setValue(e.target.getAttribute("href").split("/")[1]);
  };

  // get single data loaded
  const Addtocart = async () => {
    try {
      let userIDget = localStorage.getItem("userID");
      await axios
        .get(`http://localhost:5400/addtocart/get-addtocart/${userIDget}`)
        .then((response) => {
          setRes(true);
          setCartdata(response?.data?.result?.productAddToCart);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("invalid input", error);
    }
  };

  const handleOpenUserMenu = () => {
    history("/register");
  };

  useEffect(() => {
    handleRefresh();
    Addtocart();
  }, [res]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <div>
            <img src={logo} alt="" />
          </div> */}
          <NavLink to={"/"} style={{ color: "white" }}>
            <AdbIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              style={{ marginRight: "20px" }}
            />
          </NavLink>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box
            sx={{
              gap: "20px",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <NavLink
              to={"/product/Rings"}
              style={{
                display: "flex",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                href="/product/Rings"
                sx={{ my: 2, color: "white", display: "flex" }}
                onClick={(e) => {
                  getValueNavbar(e);
                  handleRefresh();
                }}
              >
                Rings
              </Typography>
            </NavLink>
            <NavLink
              to={"/product/Drops"}
              style={{
                display: "flex",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                href="/product/Drops"
                sx={{ my: 2, color: "white", display: "flex" }}
                onClick={(e) => {
                  getValueNavbar(e);
                  handleRefresh();
                }}
              >
                Drops
              </Typography>
            </NavLink>
            <NavLink
              to={"/product/HoopEarrings"}
              style={{
                display: "flex",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                href="/product/HoopEarrings"
                sx={{ my: 2, color: "white", display: "flex" }}
                onClick={(e) => {
                  getValueNavbar(e);
                  handleRefresh();
                }}
              >
                HoopEarrings
              </Typography>
            </NavLink>
            <NavLink
              to={"/product/Earrings"}
              style={{
                display: "flex",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                href="/product/Earrings"
                sx={{ my: 2, color: "white", display: "flex" }}
                onClick={(e) => {
                  getValueNavbar(e);
                  handleRefresh();
                }}
              >
                Earrings
              </Typography>
            </NavLink>
            <NavLink
              to={"/product/Bracelets_Bangles"}
              style={{
                display: "flex",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                href="/product/Bracelets_Bangles"
                sx={{ my: 2, color: "white", display: "flex" }}
                onClick={(e) => {
                  getValueNavbar(e);
                  handleRefresh();
                }}
              >
                Bracelets_Bangles
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon
                  style={{
                    color: "white",
                    height: "35px",
                    width: "35px",
                    margin: "15px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Link to={"/cart"}>
              <Tooltip title="Cart Items">
                <IconButton sx={{ p: 0 }}>
                  <Badge
                    badgeContent={cartdata?.length}
                    color="error"
                    style={{ margin: "15px" }}
                  >
                    <ShoppingCartIcon
                      style={{
                        color: "white",
                        height: "35px",
                        width: "35px",
                      }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
