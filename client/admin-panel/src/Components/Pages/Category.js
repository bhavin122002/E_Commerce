import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useTheme } from "@emotion/react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";

export default function Category() {
  const [data, setData] = useState("");
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updataData, setUpdataData] = useState("");
  const [userid, setUserid] = useState("");
  const [editcategory, setEditcategory] = useState({
    categoryName: "",
  });
  const [category, setCategory] = useState({
    categoryName: "",
  });
  console.log("Edit Category", updataData);
  console.log(" Category ID", userid);

  // Models
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  // All data loaded
  const coustemer = async () => {
    try {
      const response = await fetch("https://node-crud-only.onrender.com/category/getall-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("response:", data);
      setUser(data.result);
    } catch (error) {
      console.log("invalid input", error);
    }
  };
  useEffect(() => {
    coustemer();
  }, [refresh]);

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category, //spread operator
      [name]: value,
    });
  };

  const handleEditCategory = (e) => {
    const { name, value } = e.target;
    setEditcategory({
      ...editcategory, //spread operator
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      categoryName: data.get("categoryName"),
    });
  };

  const handleEditCategorySubmit = (event) => {
    event.preventDefault();
    const updataData = new FormData(event.currentTarget);
    console.log({
      categoryName: updataData.get("categoryName"),
    });
  };

  //Single Category Add
  const addCategory = async (res, req) => {
    axios
      .post(`https://node-crud-only.onrender.com/category/add-category`, {
        categoryName: category.categoryName,
      })
      .then((data) => {
        console.log("first...", data);
        setData(data);
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
        handleRefresh();
      });
  };

  //Single Category Update
  const updateCategory = async () => {
    axios
      .post(`https://node-crud-only.onrender.com/category/update-category/${userid}`, {
        categoryName: editcategory.categoryName,
      })
      .then((data) => {
        console.log("first...", data);
        setUpdataData(data);
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
        handleRefresh();
      });
  };

  //Single Category Delete
  const DeleteButton = (id) => {
    axios
      .delete(`https://node-crud-only.onrender.com/category/delete-category/${id}`)
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

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box
        style={{
          width: "95%",
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
          sx={{ boxShadow: 4, borderRadius: "15px" }}
          square
          onSubmit={handleSubmit}
        >
          <Typography
            component="h3"
            style={{
              fontFamily: "monospace",
              fontWeight: "800",
              fontSize: "30px",
              margin: "25px 15px 10px 15px",
            }}
          >
            Add Category
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Add Category"
              name="categoryName"
              value={category.categoryName}
              onChange={handleChangeCategory}
              variant="outlined"
              style={{ width: "97%" }}
            />
          </Box>
        </Grid>
      </Box>
      <Box style={{ margin: "30px 0 20px 47px" }}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="secondary"
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "15px",
              fontWeight: "bold",
            }}
            onClick={addCategory}
          >
            <FileDownloadDoneIcon style={{ marginRight: "5px" }} />
            Save
          </Button>
        </Stack>
        <TableContainer
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ boxShadow: 4, borderRadius: "15px", marginTop: "50px" }}
          square
        >
          <Typography
            component="h4"
            style={{
              fontFamily: "monospace",
              fontWeight: "800",
              fontSize: "30px",
              margin: "25px 15px 10px 15px",
            }}
          >
            Category List
          </Typography>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell size="medium" align="left">
                  Id
                </TableCell>
                <TableCell size="medium" align="left">
                  CategoryName
                </TableCell>
                <TableCell size="medium" align="left">
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? user?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : user
              )?.map((user) => (
                <TableRow key={user.name}>
                  <TableCell style={{ width: 160 }} align="left">
                    {user._id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {user.categoryName}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {user.createdAt}
                  </TableCell>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onSubmit={handleEditCategorySubmit}
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{
                          textAlign: "center",
                          fontSize: "30px",
                          fontWeight: "800",
                          fontFamily: "monospace",
                        }}
                      >
                        Edit Category
                      </Typography>
                      <TextField
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        label="Edit Category"
                        name="categoryName"
                        value={editcategory.categoryName}
                        onChange={handleEditCategory}
                        onClick={updateCategory}
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          padding: "10px",
                          width: "200px",
                          borderRadius: "15px",
                          fontWeight: "bold",
                        }}
                        sx={{ mt: 2 }}
                        onClick={updateCategory}
                        onClose={handleClose}
                      >
                        <FileDownloadDoneIcon style={{ marginRight: "5px" }} />
                        Save
                      </Button>
                    </Box>
                  </Modal>

                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      color="warning"
                      style={{
                        padding: "10px",
                        width: "200px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                      }}
                      onClick={(e) => {
                        handleOpen(user._id);
                        setUserid(user._id);
                      }}
                    >
                      <EditIcon style={{ marginRight: "5px" }} />
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{
                        padding: "10px",
                        width: "200px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        console.log("id ==========", user._id);
                        DeleteButton(user._id);
                      }}
                    >
                      <DeleteIcon style={{ marginRight: "5px" }} />
                      Remove
                    </Button>
                  </Stack>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={user?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={2} style={{ margin: "20px 0 0 3px" }}>
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
            Back to HomePage
          </Button>
        </Stack>
      </Box>
    </>
  );
}
