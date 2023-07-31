import React from "react";
// import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "../Images/key.png";
import Images from "../Images/user.png";
import { Link, useNavigate } from "react-router-dom";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
function ResetPass() {
  const history = useNavigate();

  const backToLogin = () => {
    history("/login");
  };

  return (
    <>
      <Box
        sx={{
          width: 500,
          height: 400,
          margin: "40px auto",
          backgroundColor: "whitesmoke",
          border: "solid",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <Grid container>
          <div>
            <div style={{ display: "flex", gap: "10px" }}>
              <img
                src={Image}
                alt="key logo"
                style={{ height: "30px", width: "30px" }}
              />
              <h2 style={{ margin: "0px" }}>Set Password</h2>
            </div>
            <div style={{ alignItems: "center", textAlign: "center" }}>
              <img
                src={Images}
                alt="key logo"
                style={{ height: "90px", width: "90px", margin: "20px" }}
              />
            </div>
          </div>
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            id="conform_password"
            label="Conform New Password"
            name="conform_password"
            autoComplete="conform_password"
            autoFocus
            style={{ color: "whitesmoke" }}
          />
          <Link to={"/login"} onClick={backToLogin}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <PasswordRoundedIcon style={{ marginRight: "5px" }} />
              Reset Password
            </Button>
          </Link>
        </Grid>
      </Box>
    </>
  );
}

export default ResetPass;
