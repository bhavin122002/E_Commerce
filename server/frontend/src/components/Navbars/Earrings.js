import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import FilterFilde from "../../components/filterFilde";
import { useNavigate, Link } from "react-router-dom";
import Shipfast from "../../components/shipfast";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";

const Earrings = () => {
  const [data, setData] = useState("");
  const history = useNavigate();

  const cards = (id) => {
    console.log("first...", id);
    history("/product");
  };
  const fetchData = async () => {
    await axios
      .get("/api/products/productsget?category=earrings")
      .then((data) => {
        console.log("first...", data);
        setData(data?.data?.myData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data>>>", data);
  return (
    <>
      {/* <FilterFilde /> */}
      <div className="container mt-3 row">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "30px 0 20px 0",
            gap: "10px",
            justifyContent: "center",
          }}
          className="hoveredMenu"
        >
          {data ? (
            data?.map((element, id) => {
              return (
                <Grid
                  key={id}
                  style={{
                    width: "100%",
                    maxWidth: "20%",
                  }}
                >
                  <Card style={{ borderRadius: "8px" }}>
                    <Shipfast />
                    <Link to={`/productdata/${element.id}`}>
                      <CardMedia
                        sx={{ height: 250, width: 250 }}
                        image={element.img_url}
                        title="green iguana"
                        onClick={() => cards(element.id)}
                      />
                    </Link>
                    <div
                      style={{
                        borderTop: "1px solid #d9dbe9",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <CardContent style={{ color: "#4e4b66" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography gutterBottom variant="p" component="div">
                            <span className="font">
                              {" "}
                              {element.product_title}
                            </span>
                          </Typography>
                          <Typography>
                            <p>
                              <span
                                style={{
                                  padding: "2px 5px",
                                  borderRadius: "5px",
                                }}
                              >
                                {" "}
                                {element.rating}{" "}
                                <span
                                  style={{
                                    color: "#feb640",
                                    fontSize: "17px",
                                    fontWeight: 700,
                                  }}
                                >
                                  ★
                                </span>
                              </span>
                              <span>
                                <span> | </span> ({element.rating_count})
                              </span>
                            </p>
                          </Typography>
                        </div>
                        <Typography>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "16px",
                              letterSpacing: ".15px",
                              color: "#ff7215",
                              marginRight: "8px",
                            }}
                          >
                            ₹{element.product_price}
                          </span>
                          <span className="dummyprice">
                            {" "}
                            ₹ {element.dummy_price}
                          </span>
                        </Typography>
                      </CardContent>

                      <CardActions
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          backgroundColor: "#2fbccc",
                          borderRadius: "5px",
                        }}
                      >
                        <Link to={`/product/${element.id}`}>
                          <Button
                            size="small"
                            style={{
                              padding: "5px 20px",
                              fontSize: "18px",
                              fontWeight: 700,
                              letterSpacing: ".15px",
                              color: "white",
                            }}
                            onClick={() => cards(element.id)}
                          >
                            <LocalMallIcon
                              style={{ margin: "8px", color: "white" }}
                            />
                            <span style={{ marginTop: "8px" }}>
                              {" "}
                              Add to Cart
                            </span>
                          </Button>
                        </Link>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress
                style={{
                  color: "#2fbccc",
                  justifyContent: "center",
                  fontSize: "40px",
                }}
              />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default Earrings;
