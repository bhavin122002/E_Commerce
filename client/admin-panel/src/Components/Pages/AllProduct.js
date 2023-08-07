import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {
  Box,
  CardMedia,
  CardActionArea,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Shipfast from "./shipfast";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const AllProduct = () => {
  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState("");
  const [keyword, setkayword] = useState("");
  const [sortKey] = useState("");
  const [filter, setFilter] = useState("");
  const [sortorder, setSortField] = useState({
    sortorder: "",
    sortKey: "",
  });

  const handleChangePrice = (event) => {
    const value = event.target.value;
    const answer_array = value.split(",");
    setFilter(value);
    setSortField((sortorder) => ({
      ...sortorder,
      sortorder: answer_array[0],
      sortKey: answer_array[1],
    }));
  };

  // Searching Products
  const searchSubmitHendler = (e) => {
    let searchValue = e.target.value;
    setkayword(searchValue);
    console.log("searchValue", e.target.value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleChangepagePerRecords = () => {
    setpageSize(12);
  };

  const fetchData = async () => {
    let addQuery = "";
    if (keyword) {
      addQuery = addQuery + `&keyword=${keyword}`;
    }

    if (sortorder.sortorder && sortorder.sortKey) {
      addQuery =
        addQuery +
        `&sortkey=${sortorder.sortKey}&sortorder=${sortorder.sortorder}`;
    }

    await axios
      .get(
        `https://node-crud-only.onrender.com/api/products/getall-product?page=${page}&resultPerPage=${pageSize}${addQuery}`
      )
      .then((data) => {
        setData(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteButton = (id) => {
    axios
      .delete(
        `https://node-crud-only.onrender.com/api/products/delete-product/${id}`
      )
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
    handleChangepagePerRecords();
  }, [refresh, page, pageSize, sortorder, sortKey, keyword]);

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <div>
        <Typography
          component="h3"
          style={{
            fontFamily: "cursive",
            fontWeight: "800",
            fontSize: "30px",
            margin: "25px 15px 10px 15px",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          All Product
        </Typography>
        <Stack direction="row" spacing={2} style={{ margin: "20px 0 0 9%" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2fbccc",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              borderRadius: "15px",
            }}
            href="/"
          >
            <KeyboardArrowLeftIcon style={{ marginRight: "5px" }} />
            Back
          </Button>
        </Stack>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              marginLeft: "9%",
            }}
          >
            Filter By :
          </h2>
          <div>
            <FormControl sx={{ m: 1, minWidth: 300 }} size="medium">
              <InputLabel id="demo-select-small-label">Filter</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filter}
                label="Filter"
                onChange={handleChangePrice}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1,productPrice">PRICE - LOW TO HIGH</MenuItem>
                <MenuItem value="-1,productPrice">
                  PRICE - HIGH TO LOW{" "}
                </MenuItem>
                <MenuItem value="1,createdAt">DATE - NEW TO OLD </MenuItem>
                <MenuItem value="-1,createdAt">DATE - OLD TO NEW </MenuItem>
                <MenuItem value="1,productName">NAME - A TO Z</MenuItem>
                <MenuItem value="-1,productName">NAME - Z TO A </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ margin: "8px", width: 600 }}>
            <Stack spacing={2}>
              <Fragment>
                <form className="searchBox" onChange={searchSubmitHendler}>
                  <TextField
                    type="text"
                    label="🔍Search a Product"
                    style={{ marginLeft: "30%", width: 600 }}
                  />
                </form>
              </Fragment>
            </Stack>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Link to={"/singleproduct"}>
            <Button
              variant="contained"
              style={{
                marginLeft: "9%",
                backgroundColor: "#2fbccc",
                fontWeight: 700,
              }}
            >
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
              return (
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
                    <CardActionArea>
                      <CardMedia
                        sx={{ height: 250, width: 370, margin: "5px" }}
                        src={element.productImage}
                        title="Image Not Found"
                        component="img"
                      />
                    </CardActionArea>
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
                                marginBottom: "8px",
                              }}
                            >
                              <EditIcon
                                style={{ margin: "8px", color: "white" }}
                              />
                              <span style={{ marginTop: "8px" }}>Edit</span>
                            </Button>
                          </Link>
                          <Link to={`/allproduct`}>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              style={{
                                marginLeft: "133px",
                                borderRadius: "10px",
                                marginBottom: "8px",
                              }}
                              onClick={() => {
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
      <Box>
        <Stack
          spacing={2}
          style={{
            fontSize: "70px",
            alignItems: "center",
            color: "white",
          }}
        >
          <Pagination
            page={page}
            count={10}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </>
  );
};

export default AllProduct;
