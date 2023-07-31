import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

function SingleProduct() {
  const [data, setData] = useState("");
  const [users, setUser] = useState({
    productName: "",
    productImage: "",
    productPrice: "",
    productSize: "",
    productMetal: "",
    dummyPrice: "",
    category: "",
    productDescription: "",
  });
  const [image, setImage] = useState("");
  console.log("successfully created product", data);
  console.log("successfully created Image", image);
  console.log("successfully product", users);
  const location = useLocation();
  const propsData = location.state;

  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  const handleChangeVelue = (e) => {
    const { name, value } = e.target;
    setUser({
      ...users,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      productName: data?.get("productName"),
      productImage: data?.get("productImage"),
      productPrice: data?.get("productPrice"),
      productSize: data?.get("productSize"),
      productMetal: data?.get("productMetal"),
      dummyPrice: data?.get("dummyPrice"),
      category: data?.get("category"),
      productDescription: data?.get("productDescription"),
    });
  };

  const addData = async () => {
    const formData = new FormData();
    formData.append("productName", users?.productName);
    formData.append("productImage", image);
    formData.append("productPrice", users?.productPrice);
    formData.append("productSize", users?.productSize);
    formData.append("productMetal", users?.productMetal);
    formData.append("dummyPrice", users?.dummyPrice);
    formData.append("category", users?.category);
    formData.append("productDescription", users?.productDescription);
    axios
      .post(
        "https://node-crud-only.onrender.com/api/products/add-product",
        formData,
        {
          headers: { "Content-Type": "application" },
        }
      )
      .then((data) => {
        console.log("first...", data);
        setData(data);
        handleRefresh();
      })
      .catch((err) => {
        handleRefresh();
        console.log(err);
      });
  };

  useEffect(() => {
    setUser(propsData);
  }, [refresh]);

  return (
    <>
     
      <Box
        style={{
          width: "90%",
          height: "auto",
          margin: "30px 50px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ boxShadow: 4, borderRadius: "20px" }}
          square
          onSubmit={handleSubmit}
        >
          <Typography
            component="h3"
            style={{
              fontFamily: "ui-monospace",
              fontWeight: "800",
              fontSize: "30px",
              margin: "25px 15px 10px 15px",
            }}
          >
            Product
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", width: "100%" }}
          >
            <TextField
              id="outlined-basic"
              label="Product Name"
              name="productName"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              name="productMetal"
              label="Product Metal"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", width: "100%" }}
          >
            <TextField
              id="outlined-basic"
              label="Product Price"
              type="number"
              name="productPrice"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              label="Dummy Price"
              type="number"
              name="dummyPrice"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", width: "100%" }}
          >
            <FormControl style={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Size"
                name="productSize"
                onChange={handleChangeVelue}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"ExtraLarge"}>Extra Large</MenuItem>
                <MenuItem value={"ExtraSmall"}>Extra Small</MenuItem>
                <MenuItem value={"Large"}>Large</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Small"}>Small</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Category"
                name="category"
                onChange={handleChangeVelue}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Rings"}>Rings</MenuItem>
                <MenuItem value={"Drops"}>Drops</MenuItem>
                <MenuItem value={"Earrings"}>Earrings</MenuItem>
                <MenuItem value={"HoopEarrings"}>HoopEarrings</MenuItem>
                <MenuItem value={"Bracelets_Bangles"}>
                  Bracelets & Bangles
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", width: "100%" }}
          >
            <TextField
              id="outlined-basic"
              label="Product Description..."
              name="productDescription"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                console.log("Image", e.target.files[0]);
              }}
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Box>
        </Grid>
      </Box>
      <Box style={{ margin: "30px 0 20px 47px" }}>
        <Stack spacing={2} direction="row">
          <NavLink to={"/allproduct"}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                padding: "10px",
                width: "200px",
                borderRadius: "15px",
                fontWeight: "bold",
              }}
              onClick={addData}
            >
              <FileDownloadDoneIcon style={{ marginRight: "5px" }} />
              Save
            </Button>
          </NavLink>
        </Stack>
      </Box>
    </>
  );
}

export default SingleProduct;
