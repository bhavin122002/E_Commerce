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
import { useNavigate, Link, useParams } from "react-router-dom";
import Shipfast from "./shipfast";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

const CardData = () => {
  const [data, setData] = useState("");
  const history = useNavigate();
  let { categoryId } = useParams();
  const [page, setPage] = useState(1);
  const [keyword, setkayword] = useState("");
  const [pagePerRecords, setpagePerRecords] = useState("");
  const [sortKey] = useState("");
  const [filter, setFilter] = useState("");
  const [sortFieldKey, setSortField] = useState({
    sortFieldKey: "",
    sortKey: "",
  });

  console.log("first", data);

  const handleChangePrice = (event) => {
    const value = event.target.value;
    console.log("firstValue", value);
    const answer_array = value.split(",");
    setFilter(value);
    setSortField((sortFieldKey) => ({
      ...sortFieldKey,
      sortFieldKey: answer_array[0],
      sortKey: answer_array[1],
    }));
  };

  console.log("first filter", sortFieldKey);
  const cards = () => {
    history("/product");
  };
  console.log("page", page);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleChangepagePerRecords = () => {
    setpagePerRecords(12);
  };

  // Searching Products
  const searchSubmitHendler = (e) => {
    let searchValue = e.target.value;
    let value = searchValue.split(" ").join("");
    setkayword(value);
    console.log("searchValue", e.target.value);
  };

  const fetchData = async () => {
    await axios
      .get(
        `https://node-crud-only.onrender.com/api/products/getall-product?category=${categoryId}&page=${page}&pagePerRecords=${pagePerRecords}&sortFieldKey=${sortFieldKey.sortFieldKey}&sortKey=${sortFieldKey.sortKey}&search=${keyword}`
      )
      .then((data) => {
        console.log("first...", data);
        setData(data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    handleChangepagePerRecords();
  }, [page, pagePerRecords, sortFieldKey, sortKey, keyword]);

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
              <MenuItem value="productPrice,1">PRICE - LOW TO HIGH</MenuItem>
              <MenuItem value="productPrice,-1">PRICE - HIGH TO LOW </MenuItem>
              <MenuItem value="createdAt,1">DATE - NEW TO OLD </MenuItem>
              <MenuItem value="createdAt,-1">DATE - OLD TO NEW </MenuItem>
              <MenuItem value="productName,1">NAME - A TO Z</MenuItem>
              <MenuItem value="productName,-1">NAME - Z TO A </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: "8px", width: 600 }}>
          <Stack spacing={2}>
            <Fragment>
              <form className="searchBox" onChange={searchSubmitHendler}>
                <TextField
                  type="text"
                  // value="productName"
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
                          onClick={() => cards(element.id)}
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
