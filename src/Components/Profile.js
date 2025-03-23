import React, { useTransition } from "react";
import FollowersModal from "./FollowersModal";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
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
import { deepOrange, deepPurple } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import followericon from "./followers.png";
import followingicon from "./following.png";
import FollowingModal from "./FolllowingModal";
import LogoutIcon from "@mui/icons-material/Logout";
import Buffer from "./Buffer";

import { useState } from "react";
const theme = createTheme();
const host = "https://redditbackend.onrender.com";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Profile() {
  const navigate = useNavigate();
  const [userdetails, setuserdetails] = useState(null);
  const fetchuser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setuserdetails(json);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      // lets fetch users data
      fetchuser();
    }
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(updatedetails)
    const data = new FormData(event.currentTarget);
    console.log(data.get("username"));
    const newuserdetails = {};
    if (data.get("username") != userdetails.username)
      newuserdetails.username = data.get("username");
    if (data.get("firstname") != userdetails.firstname)
      newuserdetails.firstname = data.get("firstname");
    if (data.get("lastname") != userdetails.lastname)
      newuserdetails.lastname = data.get("lastname");
    if (data.get("email") != userdetails.email)
      newuserdetails.email = data.get("email");
    if (data.get("age") != userdetails.age)
      newuserdetails.age = data.get("age");
    if (data.get("contactnumber") != userdetails.contactnumber)
      newuserdetails.contactnumber = data.get("contactnumber");
    if (data.get("password") != "******")
      newuserdetails.password = data.get("password");

    const response = await fetch(`${host}/api/auth/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newuserdetails),
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) {
      setuserdetails(json);
    }
    handleClose();
    window.location.reload();
  };

  return (
    <>
      {!userdetails && <Buffer />}
      {userdetails && (
        <div className="my-5 container">
          <div className="row">
            <div className="col col-md-6 col-sm-12">
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className="my-3"
              >
                <Avatar sx={{ width: 64, height: 64 }}>
                  {userdetails.firstname[0].toUpperCase()}
                </Avatar>
                <Typography align="center" variant="h5" gutterBottom>
                  {" "}
                  {userdetails.firstname} {userdetails.lastname}
                </Typography>
                <IconButton aria-label="delete" onClick={handleOpen}>
                  <EditIcon />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
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
                          defaultValue={userdetails.firstname}
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
                          defaultValue={userdetails.lastname}
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
                          defaultValue={userdetails.username}
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
                          defaultValue={userdetails.email}
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
                          defaultValue="******"
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
                          defaultValue={userdetails.age}
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
                          defaultValue={userdetails.contactnumber}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Save and continue
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleClose}
                      color="error"
                    >
                      cancel
                    </Button>
                  </Box>
                </Modal>
              </Stack>
              <Box noValidate sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="User Name"
                      defaultValue={userdetails.username}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      label="Email"
                      fullWidth
                      defaultValue={userdetails.email}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="Password"
                      defaultValue="******"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      fullWidth
                      label="Age"
                      defaultValue={userdetails.age}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-read-only-input"
                      label="Contactnumber"
                      defaultValue={userdetails.contactnumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                </Grid>
              </Box>
            </div>
            <div className="col col-md-6 col-sm-12">
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                className="my-5"
              >
                <FollowingModal following={userdetails.following} />
                <img
                  src={followericon}
                  style={{
                    width: "2rem",
                  }}
                  alt=""
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                className="my-5"
              >
                <Button size="medium">
                  <FollowersModal followers={userdetails.followers} />
                </Button>
                <img
                  src={followingicon}
                  style={{
                    width: "2rem",
                  }}
                  alt=""
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
