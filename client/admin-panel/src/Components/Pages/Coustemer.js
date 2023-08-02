import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  CircularProgress,
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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useTheme } from "@emotion/react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

export default function Product() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const coustemer = async () => {
    try {
      const response = await fetch(
        "https://node-crud-only.onrender.com/coustemer/getalladmin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("response:", data);
      setUser(data.adminData);
    } catch (error) {
      console.log("invalid input", error);
    }
  };
  useEffect(() => {
    console.log("Name registered successfully");
    coustemer();
  }, []);

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

  return (
    <>
      <TableContainer
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        sx={{ boxShadow: 4, borderRadius: "15px" }}
        square
      >
        <Typography
          component="h4"
          style={{
            fontFamily: "ui-monospace",
            fontWeight: "800",
            fontSize: "30px",
            margin: "25px 15px 10px 15px",
          }}
        >
          Coustemer List
        </Typography>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell size="medium" align="left">
                FirstName
              </TableCell>
              <TableCell size="medium" align="left">
                LastName
              </TableCell>
              <TableCell size="medium" align="left">
                email
              </TableCell>
              <TableCell size="medium" align="left">
                Created Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : user
            )?.map((user, index) => (
              <TableRow key={user.name}>
                <TableCell style={{ width: 160 }} align="left">
                  {user.firstName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {user.lastName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {user.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {user.createdAt}
                </TableCell>
              </TableRow>
            ))}

            {/* <Box sx={{ display: "flex" }}>
              <CircularProgress
                style={{
                  color: "#2fbccc",
                  justifyContent: "center",
                  fontSize: "40px",
                }}
              />
            </Box> */}

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
                count={user.length}
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
      <Stack direction="row" spacing={2} style={{ margin: "20px 0 0 30px" }}>
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
    </>
  );
}
