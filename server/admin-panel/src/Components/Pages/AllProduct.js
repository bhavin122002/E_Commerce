import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Shipfast from "./shipfast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const AllProduct = () => {
  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  const [data, setData] = useState("");

  const fetchData = async () => {
    await axios
      .get(`/api/products/getall-product`)
      .then((data) => {
        console.log("first...", data);
        setData(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteButton = (id) => {
    axios
      .delete(`/api/products/delete-product/${id}`)
      .then((response) => {
        handleRefresh();
        // Handle success
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        handleRefresh();
        // Handle error
        console.error("Error deleting item:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <>
      <div>
        <Typography
          component="h3"
          style={{
            fontFamily: "ui-monospace",
            fontWeight: "800",
            fontSize: "30px",
            margin: "25px 15px 10px 15px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          All Product
        </Typography>
        <div>
          <Link to={"/singleproduct"}>
            <Button variant="contained" style={{ marginLeft: "9%" }}>
              <AddIcon style={{ marginRight: "5px" }} />
              New Add
            </Button>
          </Link>
        </div>
      </div>

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
              {
                console.log("element.productImage", element.productImage);
              }
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
                    <CardMedia
                      sx={{ height: 250, width: 330, margin: "5px" }}
                      image={element.productImage}
                      title="Image Not Found"
                      component="img"
                      // onClick={() => cards(element.id)}
                    />
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
                      <Box>
                        <Stack spacing={2} direction="row">
                          <Link to={`/products/${element._id}`} state={element}>
                            <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              style={{
                                marginLeft: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <EditIcon
                                style={{ margin: "8px", color: "white" }}
                              />
                              <span style={{ marginTop: "8px" }}> Edit</span>
                            </Button>
                          </Link>
                          <Link to={`/allproduct`}>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              style={{
                                marginLeft: "77%",
                                borderRadius: "10px",
                              }}
                              onClick={() => {
                                console.log("id========", element._id);
                                DeleteButton(element._id);
                              }}
                            >
                              <DeleteIcon
                                style={{ margin: "8px", color: "white" }}
                              />
                              <span style={{ marginTop: "8px" }}>Remove</span>
                            </Button>
                          </Link>
                        </Stack>
                      </Box>
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

export default AllProduct;
