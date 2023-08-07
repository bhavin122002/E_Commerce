import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import discount from "../Images/discount_1.jpg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "../App.css";
import axios from "axios";

function ProductDetial() {
  const [datanew, setData] = useState({});
  let { id } = useParams();

  const fetchData = async () => {
    console.log("fetch data == ", id);
    await axios
      .get(`https://node-crud-only.onrender.com/api/products/productdata/${id}`)
      .then((data) => {
        setData(data?.data?.myData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const history = useNavigate();

  const backToHome = () => {
    history("/product/Rings");
  };
  const addtocart = (id) => {
    history(`/addtocart/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container key={datanew._id}>
        <Card style={{ margin: "40px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid style={{ width: "50%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#cef3d9",
                    maxHeight: "100%",
                    maxWidth: "53%",
                  }}
                  className="triangle_right"
                >
                  <p
                    style={{
                      color: "#1a6770",
                      fontWeight: 500,
                      fontSize: "17px",
                      letterSpacing: ".15px",
                      margin: "3px",
                      padding: "5px",
                    }}
                  >
                    <LocalShippingOutlinedIcon
                      style={{ height: "15px", marginTop: "3px" }}
                    />
                    SHIPS FAST
                  </p>
                </div>
                <div>
                  <p>
                    <a>
                      <FavoriteBorderOutlinedIcon
                        style={{
                          marginRight: "100px",
                          fontSize: "35px",
                          color: "#a6a9c1",
                        }}
                      />
                    </a>
                  </p>
                </div>
              </div>
              <img
                src={datanew.productImage}
                style={{ width: "50%", margin: "10px 20px 0 20px" }}
              />
            </Grid>
            <Grid style={{ width: "50%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="p" component="div">
                  <span className="font_style"> {datanew.productName}</span>
                </Typography>
              </div>
              <p className="price_style">
                {" "}
                ₹ {datanew.productPrice}{" "}
                <span className="dummy_price">₹ {datanew.dummyPrice}</span>{" "}
              </p>
              <div
                style={{
                  marginTop: "17px",
                  paddingRight: "10px",
                }}
              >
                <img src={discount} alt="" style={{ width: "100%" }} />
              </div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: "math",
                  marginTop: "19px",
                  paddingRight: "10px",
                }}
              >
                {datanew.productDescription}
              </p>
            </Grid>
          </Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Grid className="button_style">
              <Button onClick={backToHome}>
                <span className="button_text"> Continue Shopping </span>
              </Button>
            </Grid>
            <Grid className="button_style">
              <Button
                onClick={() => {
                  addtocart(datanew._id);
                }}
              >
                <LocalMallIcon
                  style={{ marginRight: "12px", color: "white" }}
                />
                <span className="button_text">Add to Cart</span>
              </Button>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default ProductDetial;
