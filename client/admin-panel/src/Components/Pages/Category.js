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
  Alert,
  Snackbar,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useTheme } from "@emotion/react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Category() {
  const [data, setData] = useState("");
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updataData, setUpdataData] = useState("");
  const [userid, setUserid] = useState("");
  const [deleteid, setDeleteId] = useState("");
  const [editcategory, setEditcategory] = useState({
    categoryName: "",
  });
  const [category, setCategory] = useState({
    categoryName: "",
  });

  // Edit Models
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete Models
  const [DeleteOpne, setDeleteOpne] = useState(false);
  const handleDeleteopne = () => setDeleteOpne(true);
  const handleDeleteCloses = () => setDeleteOpne(false);

  // Page auto refreshed
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(() => setRefresh(!refresh), [refresh]);

  // Toaster
  const [opentost, setOpenTost] = useState(false);

  const handleClick = () => {
    setOpenTost(true);
  };

  const handleCloseToaster = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenTost(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseToaster}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // All data loaded
  const coustemer = async () => {
    try {
      const response = await fetch(
        "https://node-crud-only.onrender.com/category/getall-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const handleDeleteCategorySubmit = (event) => {
    event.preventDefault();
    handleDeleteopne();
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
        setCategory({ categoryName: "" });
      })
      .catch((err) => {
        console.log(err);
        handleRefresh();
      });
  };

  //Single Category Update
  const updateCategory = async () => {
    axios
      .post(
        `https://node-crud-only.onrender.com/category/update-category/${userid}`,
        {
          categoryName: editcategory.categoryName,
        }
      )
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
  const DeleteButton = () => {
    axios
      .delete(
        `https://node-crud-only.onrender.com/category/delete-category/${deleteid}`
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
            onClick={() => {
              addCategory();
              handleClick();
            }}
          >
            <FileDownloadDoneIcon style={{ marginRight: "5px" }} />
            Save
          </Button>
          <Snackbar
            open={opentost}
            autoHideDuration={2000}
            onClose={handleCloseToaster}
            message="Category Successfully Added"
            action={action}
          />
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
              )?.map((user, index) => (
                <TableRow key={user.name}>
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
                      <CloseIcon
                        style={{
                          justifyContent: "end",
                          padding: "0px 97%",
                          margin: "0",
                        }}
                        onClick={() => {
                          handleClose();
                        }}
                      />
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
                        onClick={() => {
                          updateCategory();
                          handleClose();
                          handleClick();
                        }}
                      >
                        <FileDownloadDoneIcon style={{ marginRight: "5px" }} />
                        Save
                      </Button>
                      <Snackbar
                        open={opentost}
                        autoHideDuration={2000}
                        onClose={handleCloseToaster}
                        message="Category Successfully Edit"
                        action={action}
                      />
                    </Box>
                  </Modal>

                  <Stack spacing={2} direction="row">
                    <Button
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        console.log("Click", user);
                        handleOpen(user._id);
                        setEditcategory({ categoryName: user.categoryName });
                        setUserid(user._id);
                      }}
                    >
                      <EditCalendarIcon
                        style={{ marginRight: "5px", color: "black" }}
                      />
                    </Button>

                    <Modal
                      open={DeleteOpne}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      onSubmit={handleDeleteCategorySubmit}
                    >
                      <Box sx={style}>
                        <CloseIcon
                          style={{
                            justifyContent: "end",
                            padding: "0px 97%",
                            margin: "0",
                          }}
                          onClick={() => {
                            handleDeleteCloses();
                          }}
                        />
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
                          Are you sure you want to delete the category.
                        </Typography>
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
                          onClick={() => {
                            DeleteButton(user._id);
                            handleDeleteCloses();
                            handleClick();
                          }}
                        >
                          <FileDownloadDoneIcon
                            style={{ marginRight: "5px" }}
                          />
                          Confirm
                        </Button>
                        <Snackbar
                          open={opentost}
                          autoHideDuration={2000}
                          onClose={handleCloseToaster}
                          message="Category Successfully Deleted"
                          action={action}
                        />
                      </Box>
                    </Modal>
                    <Button
                      style={{
                        padding: "10px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        handleDeleteopne(user._id);
                        setDeleteId(user._id);
                      }}
                    >
                      <DeleteIcon
                        style={{ marginRight: "5px", color: "red" }}
                      />
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
