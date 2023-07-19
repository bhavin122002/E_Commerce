import React, { useEffect, useState } from "react";
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
import { NavLink, useLocation, useParams } from "react-router-dom";
import axios from "axios";

function Product(props) {
  const [data, setData] = useState("");
  const [user, setUser] = useState({
    productName: "",
    productImage: "",
    productPrice: "",
    productSize: "",
    productMetal: "",
    dummyPrice: "",
    category: "",
    productDescription: "",
  });
  console.log("successfully created product", data);
  const location = useLocation();
  let { id } = useParams();
  console.log("first id", id);
  const propsData = location.state;

  const handleChangeVelue = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      productName: data.get("productName"),
      productImage: data.get("productImage"),
      productPrice: data.get("productPrice"),
      productSize: data.get("productSize"),
      productMetal: data.get("productMetal"),
      dummyPrice: data.get("dummyPrice"),
      category: data.get("category"),
      productDescription: data.get("productDescription"),
    });
  };

  const updateData = async () => {
    axios
      .post(`/api/products/update-product/${id}`, {
        productName: user.productName,
        productImage: user.productImage,
        productPrice: user.productPrice,
        productSize: user.productSize,
        productMetal: user.productMetal,
        dummyPrice: user.dummyPrice,
        category: user.category,
        productDescription: user.productDescription,
      })
      .then((data) => {
        console.log("first...", data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setUser(propsData);
  }, []);

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
              value={user.productName}
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              name="productMetal"
              label="Product Metal"
              value={user.productMetal}
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
              value={user.productPrice}
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              label="Dummy Price"
              type="number"
              name="dummyPrice"
              value={user.dummyPrice}
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
                value={user.productSize}
                onChange={handleChangeVelue}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"extraLarge"}>Extra Large</MenuItem>
                <MenuItem value={"extraSmall"}>Extra Small</MenuItem>
                <MenuItem value={"large"}>Large</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"small"}>Small</MenuItem>
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
                value={user.category}
                onChange={handleChangeVelue}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"rings"}>rings</MenuItem>
                <MenuItem value={"drops"}>drops</MenuItem>
                <MenuItem value={"earrings"}>earrings</MenuItem>
                <MenuItem value={"hoopearrings"}>hoopearrings</MenuItem>
                <MenuItem value={"braceletsbangles"}>braceletsbangles</MenuItem>
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
              value={user.productDescription}
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />

            <TextField
              id="outlined-basic"
              type="file"
              onChange={handleChangeVelue}
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Box>
        </Grid>
      </Box>
      <Box style={{ margin: "30px 0 20px 47px" }}>
        <Stack spacing={2} direction="row">
          <NavLink to={"/"}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                padding: "10px",
                width: "200px",
                borderRadius: "15px",
                fontWeight: "bold",
              }}
              onClick={updateData}
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

export default Product;
