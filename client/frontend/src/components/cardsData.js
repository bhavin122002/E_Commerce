import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  CardActionArea,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useParams } from "react-router-dom";
import Shipfast from "./shipfast";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

const CardData = ({ addtocart, setAddtocart }) => {
  const [data, setData] = useState("");
  let { category } = useParams();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [keyword, setkayword] = useState("");
  const [pageSize, setpageSize] = useState("");
  const [sortKey] = useState("");
  const [filter, setFilter] = useState("");
  const [sortorder, setSortField] = useState({
    sortorder: "",
    sortKey: "",
  });

  const handleChangePrice = (event) => {
    const value = event.target.value;
    console.log("firstValue", value);
    const answer_array = value.split(",");
    setFilter(value);
    setSortField((sortorder) => ({
      ...sortorder,
      sortorder: answer_array[0],
      sortKey: answer_array[1],
    }));
  };

  const Increment = () => {
    console.log("Increment", count + 1);
    setCount(count + 1);
  };

  const Decrement = () => {
    console.log("Decrement", count - 1);
    if (count === 0) {
      alert("Negative quantity not allowed");
    } else {
      setCount(count - 1);
    }
  };

  const AddtoCart = (data) => {
    setAddtocart([...addtocart, data]);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleChangepageSize = () => {
    setpageSize(12);
  };

  // Searching Products
  const searchSubmitHendler = (e) => {
    let searchValue = e.target.value;
    setkayword(searchValue);
    console.log("searchValue", e.target.value);
  };

  const fetchData = async () => {
    let addQuery = "";
    if (keyword) {
      addQuery = addQuery + `&keyword=${keyword}`;
    }
    if (category) {
      addQuery = addQuery + `&category=${category}`;
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
        // console.log("first...", data);
        setData(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddtoCartPage = async (id) => {
    console.log("id==========......", id);
    await axios
      .post(`http://localhost:5400/addtocart/add-addtocart/${id}`)
      .then((data) => {
        console.log("first...", data);
        // setData(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleChangepageSize();
  }, [page, pageSize, sortorder, sortKey, keyword]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            marginLeft: "15px",
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
              <MenuItem value="-1,productPrice">PRICE - HIGH TO LOW </MenuItem>
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
                              Decrement();
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
                            value={count}
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
                              Increment();
                            }}
                          >
                            &#xff0b;
                          </Button>
                        </div>
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
                        <Button
                          size="small"
                          style={{
                            padding: "5px 20px",
                            fontSize: "18px",
                            fontWeight: 700,
                            letterSpacing: ".15px",
                            color: "white",
                          }}
                          onClick={() => {
                            AddtoCart(element);
                            AddtoCartPage(element._id);
                          }}
                        >
                          <LocalMallIcon
                            style={{ margin: "8px", color: "white" }}
                          />
                          <span style={{ marginTop: "8px" }}> Add to Cart</span>
                        </Button>
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
      </div>
    </>
  );
};

export default CardData;
