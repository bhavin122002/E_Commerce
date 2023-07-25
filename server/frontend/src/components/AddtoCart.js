import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Moveon from "../Images/move_On.jpg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Checkbox from "@mui/material/Checkbox";
import footer from "../Images/footer.png";
import last_footer from "../Images/last_footer.png";
import "../App.css";
import axios from "axios";

function AddtoCart() {
  const [datanew, setData] = useState({});

  let { id } = useParams();

  const fetchData = async () => {
    console.log("fetch data == ", id);
    await axios
      .get(`https://node-crud-only.onrender.com/api/products/addtocart/${id}`)
      .then((data) => {
        console.log("idd ===== ", data?.data?.myData[0]);
        setData(data?.data?.myData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "1500px",
          margin: "10px auto 60px auto",
          display: "block",
        }}
      >
        <img src={Moveon} alt="" style={{ width: "100%" }} />
      </div>
      <Container
        key={datanew.id}
        style={{
          maxWidth: "1500px",
          width: "100%",
          boxSizing: "border-box",
          padding: "0",
        }}
      >
        <Box style={{ display: "flex" }}>
          <div className="checkout_border">
            <Grid
              style={{
                width: "100%",
                border: "1px solid #d9dbe9",
                borderRadius: "8px",
                background: "#fff",
                marginBottom: "24px",
                overflow: "hidden",
                marginRight: "50px",
              }}
            >
              <div style={{ padding: "20px 24px 20px 20px" }}>
                <div
                  style={{
                    backgroundColor: "#cef3d9",
                    width: "16%",
                    marginTop: "5px",
                  }}
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
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "20%",
                      marginRight: "40px",
                      marginTop: "15px",
                    }}
                  >
                    <img className="image_class" src={datanew.productImage} />
                  </div>
                  <div style={{ width: "80%" }}>
                    <div>
                      <span
                        style={{
                          fontFamily: "Lato",
                          color: "#404040",
                          fontSize: "20px",
                          letterSpacing: ".5px",
                          fontWeight: 600,
                          padding: "20px 0 0 20px",
                          display: "flex",
                        }}
                      >
                        {" "}
                        {datanew.productName}
                      </span>
                    </div>

                    <div style={{ marginTop: "35px" }}>
                      <div
                        style={{
                          margin: "25px 0 0 20px",
                          paddingRight: "20px",
                          position: "relative",
                          fontSize: "18px",
                          lineHeight: "20px",
                          letterSpacing: ".04em",
                          color: "#464646",
                          display: "flex",
                        }}
                      >
                        <span>
                          Metal <span style={{ paddingLeft: "40px" }}> : </span>
                        </span>
                        <span style={{ paddingLeft: "25px" }}>
                          <b>{datanew.productMetal}</b>
                        </span>
                      </div>
                      <div
                        style={{
                          margin: "25px 0 0 20px",
                          paddingRight: "20px",
                          position: "relative",
                          fontSize: "18px",
                          lineHeight: "20px",
                          letterSpacing: ".04em",
                          color: "#464646",
                          display: "flex",
                        }}
                      >
                        <span>
                          Size <span style={{ paddingLeft: "55px" }}> : </span>
                        </span>
                        <span style={{ paddingLeft: "23px" }}>
                          {datanew.productSize}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "30px",
                      color: "#ff7215",
                      textDecoration: "none",
                      marginRight: "8px",
                      paddingRight: "10px",
                    }}
                  >
                    ₹ {datanew.productPrice}
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "30px",
                      color: "#6e7191",
                      textDecoration: "line-through",
                      paddingRight: "20px",
                    }}
                  >
                    {datanew.dummyPrice}
                  </span>
                </div>
              </div>

              <Grid
                style={{
                  display: "flex",
                  width: "100%",
                  background: "#f9f9f9",
                  height: "48px",
                  padding: "0 8px 0 24px",
                  boxSizing: "border-box",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    textTransform: "uppercase",
                    color: "#6e7191",
                    cursor: "pointer",
                    padding: "3px 16px",
                    fontWeight: "700",
                    fontSize: "12px",
                    letterSpacing: "2.25px",
                  }}
                >
                  <DeleteOutlinedIcon style={{ marginRight: "12px" }} />
                  Remove
                </span>
              </Grid>
            </Grid>
            <Grid style={{ textAlign: "left", justifyContent: "left" }}>
              <NavLink to={"/product/Rings"}>
                <Button
                  variant="outlined"
                  style={{
                    fontWeight: "700",
                    padding: "10px",
                    fontSize: "12px",
                    color: "#2fbccc",
                    letterSpacing: "1.25px",
                    textTransform: "uppercase",
                    transition: ".3s ease-in-out !important",
                    position: "relative",
                    borderColor: "#2fbccc",
                  }}
                >
                  <KeyboardArrowLeftIcon />
                  Continue Shopping
                </Button>
              </NavLink>
            </Grid>
          </div>
          <div style={{ marginLeft: "50px", width: "30%" }}>
            <Box
              style={{
                justifyContent: "right",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Button className="checkout_btn">Checkout securely</Button>
              <Box>
                <div
                  className="main"
                  style={{
                    border: "1px solid #d9dbe9",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  <div style={{ padding: "16px 24px" }}>
                    <div
                      className="sub"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: "#4e4b66",
                            letterSpacing: ".15px",
                          }}
                        >
                          Apply Offer / Voucher
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "12px",
                            color: "#2fbccc",
                            letterSpacing: "1.25px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                          }}
                        >
                          check offers
                        </span>
                      </div>
                    </div>
                    <div
                      className="sub"
                      style={{
                        textAlign: "left",
                        marginTop: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "16px",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              color: "#00ba88",
                              fontSize: "14px",
                              justifyContent: "space-between",
                            }}
                          >
                            <CheckOutlinedIcon fontSize=".7rem" /> Coupon
                            <b style={{ color: "#00ba88" }}> LOWEST</b> Applied
                            Successfully
                          </p>
                        </div>
                        <div style={{ marginTop: "16px", cursor: "pointer" }}>
                          <a style={{ color: "#7d7d7d", fontSize: ".856rem" }}>
                            <DeleteOutlinedIcon fontSize="small" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="second_box"
                    style={{
                      width: "100%",
                      borderTop: "1px solid #d9dbe9",
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 0",
                        justifyContent: "flex-start",
                        width: "100%",
                        padding: "10px 24px",
                      }}
                    >
                      <span
                        className="info_popup"
                        style={{
                          color: "#7d7d7d",
                          fontSize: ".856rem",
                          display: "flex",
                          justifyContent: "flex-start",
                          width: "100%",
                        }}
                      >
                        <InfoOutlinedIcon fontSize="small" />
                        <span
                          style={{
                            marginLeft: "8px",
                            color: "#4e4b66",
                            fontFamily: "lato,sans-serif",
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "1.71",
                            letterSpacing: ".1px",
                          }}
                        >
                          Include Insurance for your Jewellery
                        </span>
                        <div style={{ paddingLeft: "22%" }}>
                          <Checkbox
                            {...label}
                            defaultChecked
                            style={{
                              height: "18px",
                              width: "18px",
                              borderRadius: "2px",
                              color: "#2fbccc",
                            }}
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 24px",
                      height: "48px",
                      boxSizing: "border-box",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#4e4b66",
                      margin: "0",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>Order Summary</span>
                  </div>
                  <div
                    style={{
                      padding: " 16px 0",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        margin: "0px",
                        fontWeight: "400",
                        fontSize: "14px",
                        letterSpacing: ".1px",
                        fontFamily: "Lato ,sans-serif",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          padding: "0 24px 16px",
                          color: "#4e4b66",
                          width: "49%",
                        }}
                      >
                        Subtotal
                      </span>
                      <span
                        style={{
                          display: "flex",
                          padding: "0 24px 16px",
                          color: "#00ba88",
                          width: "49%",
                        }}
                      >
                        Discount (LOWEST)
                      </span>
                      <span
                        style={{
                          display: "flex",
                          padding: "0 24px 16px",
                          width: "49%",
                          color: "#4e4b66",
                        }}
                      >
                        Insurance
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#ebf8fb",
                        height: "48px",
                        color: "#4e4b66",
                        display: "flex",
                      }}
                    >
                      <span
                        style={{
                          margin: "0",
                          width: "50%",
                          padding: "10px 0 0 24px",
                          fontSize: "17px",
                          color: "#242330",
                          letterSpacing: ".25px",
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        Order Total
                      </span>
                      <span
                        style={{
                          width: "50%",
                          padding: "10px 24px 0 0",
                          fontSize: "19px",
                          color: "#242330",
                          letterSpacing: ".25px",
                          fontWeight: "400",
                          textAlign: "right",
                        }}
                      >
                        ₹ {datanew.productPrice}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <span
                      style={{
                        width: "50%",
                        color: "#4e4b66",
                        textAlign: "left",
                        fontFamily: "lato",
                        fontWeight: "400",
                        fontSize: "14px",
                        letterSpacing: ".1px",
                        padding: "0 24px 16px",
                      }}
                    >
                      Your total savings
                    </span>
                    <span
                      style={{
                        width: "50%",
                        color: "#00ba88",
                        textAlign: "right",
                        fontFamily: "lato",
                        fontWeight: "500",
                        fontSize: "17px",
                        letterSpacing: ".1px",
                        padding: "0 24px 16px",
                      }}
                    >
                      ₹ {datanew.productPrice}
                    </span>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </Box>
      </Container>
      <div style={{ margin: "67px 0 0" }}>
        <img src={footer} alt="" style={{ width: "100%" }} />
      </div>

      <div
        style={{
          margin: "20px 0 0",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img src={last_footer} alt="" style={{ width: "60%" }} />
      </div>
    </>
  );
}

export default AddtoCart;
