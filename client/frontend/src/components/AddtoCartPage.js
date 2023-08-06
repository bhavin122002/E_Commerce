import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  CardActionArea,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate, Link, useParams } from "react-router-dom";
import Shipfast from "./shipfast";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AddtoCartPage({ addtocart }) {
  return (
    <div>
      {addtocart?.map((element, id) => {
        return (
          <>
            <Grid
              key={id}
              style={{
                width: "100%",
                maxWidth: "20%",
              }}
            >
              <Card
                component={Paper}
                sx={{ boxShadow: 4 }}
                style={{ borderRadius: "8px", marginBottom: "10px" }}
              >
                <Shipfast />
                <Link to={`/productdata/${element._id}`}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ height: 250, width: 370, padding: "5px" }}
                      src={element.productImage}
                      title="Img Not Found"
                      component="img"
                    />
                  </CardActionArea>
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
                        <span className="font"> {element.productName}</span>
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
                        ₹{element.productPrice}
                      </span>
                      <span className="dummyprice">
                        {" "}
                        ₹ {element.dummyPrice}
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
                    <Link to={`/productdata/${element._id}`}>
                      <Button
                        size="small"
                        style={{
                          padding: "5px 20px",
                          fontSize: "18px",
                          fontWeight: 700,
                          letterSpacing: ".15px",
                          color: "white",
                        }}
                        // onClick={() => {
                        //   AddtoCart(element);
                        // }}
                      >
                        <LocalMallIcon
                          style={{ margin: "8px", color: "white" }}
                        />
                        <span style={{ marginTop: "8px" }}> Add to Cart</span>
                      </Button>
                    </Link>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          </>
        );
      })}
    </div>
  );
}

export default AddtoCartPage;
