import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import axios from "axios";

function AddtoCartPage() {
  const [res, setRes] = useState(false);
  const [count, setCount] = useState({ id: "", count: 0 });
  const [cartdata, setCartdata] = useState([]);
  const history = useNavigate();
  const backToHome = () => {
    history("/product/Rings");
  };

  // get single data loaded
  const Addtocart = async (id) => {
    try {
      let userIDget = localStorage.getItem("userID");
      console.log("userID", userIDget);
      await axios
        .get(
          `http://localhost:5400/addtocart/get-addtocart/${userIDget}/${id}`
        )
        .then((response) => {
          setCartdata(response?.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("invalid input", error);
    }
  };

  // Single Category Delete
  const Cartremove = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5400/addtocart/delete-addtocart/${id}`)
        .then(() => {
          setRes(true);
          console.log("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    } catch (error) {
      console.log("Remove Failed", error);
    }
  };

  const Increment = (id) => {
    const updatedData = cartdata.map((item) => {
      if (item._id === id) {
        const countd = item.count ? item.count + 1 : 1;
        console.log("count", "item.count", item.count, countd);
        return { ...item, count: countd };
      }
      return item;
    });
    console.log("Increment", updatedData);
    setCartdata(updatedData);
    console.log("data", cartdata[1]?.count);
  };

  const Decrement = (id) => {
    const updatedData = cartdata.map((item) => {
      if (item._id === id) {
        const countd = item.count ? item.count - 1 : 0;
        console.log("count", "item.count", item.count, countd);
        return { ...item, count: countd };
      }
      return item;
    });
    console.log("Decrement", updatedData);
    setCartdata(updatedData);
    console.log("data", cartdata[1]?.count);
    if (count === 1) {
      alert("Negative quantity not allowed");
    } else {
      setCount(count.count - 1);
    }
  };

  useEffect(() => {
    Addtocart();
  }, [res]);

  return (
    <div style={{ margin: "10px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid className="button_style">
          <Button onClick={backToHome}>
            <ChevronLeftIcon
              style={{ color: "white", fontSize: "30px", marginRight: "5px" }}
            />
            <span className="button_text"> Continue Shopping </span>
          </Button>
        </Grid>
      </Box>

      {cartdata?.length == 0 ? (
        <div
          style={{
            padding: 10,
            justifyContent: "center",
            textAlign: "center",
            marginTop: "8rem",
          }}
        >
          <img
            src="./cart.gif"
            alt="//"
            className="emptycart_img"
            style={{ width: "10rem", padding: 8, opacity: 0.5 }}
          />
          <p
            style={{
              fontSize: 18,
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "cursive",
              marginTop: "0.1rem",
            }}
          >
            Your Cart Is Empty
          </p>
        </div>
      ) : (
        cartdata?.map((element) => {
          return (
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
                    <img
                      className="image_class"
                      src={element.productImage}
                      alt="No image found"
                    />
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
                        {element.productName}
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
                          <b>{element.productMetal}</b>
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
                          {element.productSize}
                        </span>
                      </div>
                      <div style={{ margin: "15px 20px" }}>
                        <div class="quantity-toggle">
                          <Button
                            style={{
                              border: "2px solid #ddd",
                              padding: ".5rem",
                              background: "#f5f5f5",
                              color: "#888",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Decrement(element._id);
                            }}
                          >
                            &mdash;
                          </Button>
                          <input
                            style={{
                              border: 0,
                              borderTop: "2px solid #ddd",
                              borderBottom: "2px solid #ddd",
                              width: "2.5rem",
                              height: "43px",
                              textAlign: "center",
                              padding: "0 .5rem",
                            }}
                            type="text"
                            value={element.count ? element.count : 0}
                          />
                          <Button
                            style={{
                              border: "2px solid #ddd",
                              padding: ".5rem",
                              background: "#f5f5f5",
                              color: "#888",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Increment(element._id);
                            }}
                          >
                            &#xff0b;
                          </Button>
                        </div>
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
                    ₹ {element.productPrice}
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
                    {element.dummyPrice}
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
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#f9f9f9",
                  }}
                  onClick={() => {
                    Cartremove(element._id);
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
                </button>
              </Grid>
            </Grid>
          );
        })
      )}
    </div>
  );
}

export default AddtoCartPage;
