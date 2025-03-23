import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useContext from "react";
import Linearprogress from "./Linearprogress";
import postcontext from "../Context/posts/postcontext";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function SignIn() {
  const [prog, setprog] = useState(false);
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  // const setuser=useContext(postcontext).setuser;
  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const host = "https://redditbackend.onrender.com";
  const handleSubmitsignup = async (event) => {
    setprog(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const newdata = {
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      age: data.get("age"),
      contactnumber: data.get("contactnumber"),
    };
    console.log(newdata);
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    });
    const json = await response.json();
    // console.log(json.token);
    setprog(false);
    if (!json.error) {
      localStorage.setItem("token", json.authtoken);
      console.log(json);
      navigate("/");
    } else {
      setopen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setprog(true);
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    const newdata = {
      username: data.get("username"),
      password: data.get("password"),
    };
    // api_call _marna
    const response = await fetch(`${host}/api/auth/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    });
    const json = await response.json();
    console.log(json);
    setprog(false);
    if (!json.error) {
      setopen1(true);
      localStorage.setItem("token", json.authtoken);
      // setuser(true);
      navigate("/");
    } else {
      // emailRef.current.value = "";
      // passwordRef.current.value = "";
      setopen(true);
      // alert(json.error);
      console.log(json);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setopen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={() => setopen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid Credentials
        </Alert>
      </Snackbar>
      {/* for logging successfully */}
      <Snackbar
        open={open1}
        autoHideDuration={6000}
        onClose={() => setopen1(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={() => setopen1(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          logged in Successfully
        </Alert>
      </Snackbar>
      {prog && <Linearprogress />}
      {flag ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#42a5f5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitsignup}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="new-age"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="contactnumber"
                    label="Contact Number"
                    name="contactnumber"
                    autoComplete="new-contact"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?{" "}
                  <Button onClick={() => setflag(false)}>Sign in</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#42a5f5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="off"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  {"Don't have an account?"}
                  <Button onClick={() => setflag(true)}>Signup now</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
