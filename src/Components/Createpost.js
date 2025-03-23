import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
// import { Button } from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/material";
import { useRef } from "react";
const host = "https://redditbackend.onrender.com";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const textref = useRef("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadpost = async () => {
    console.log("hello");
    console.log(textref.current.value);
    const response = await fetch(`${host}/api/subgreddit/uploadpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        gredditid: props.id,
        text: textref.current.value,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.alert) {
      alert("your post banned words ???");
    }
    // console.log("hey hello");
    // console.log(json);
    // navigate("/subgreddits")
    if (props.addpage) {
      props.setaddpage(false);
    } else {
      props.setaddpage(true);
    }
    handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add post
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Post
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <div className="container my-5">
              <TextField
                id="outlined-multiline-static"
                label="create post"
                multiline
                fullWidth
                rows={8}
                defaultValue=""
                inputRef={textref}
              />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className="my-4"
              >
                <Button
                  variant="contained"
                  endIcon={<UploadIcon />}
                  onClick={uploadpost}
                >
                  Post
                </Button>
              </Stack>
            </div>
          </ListItem>
          <ListItem>
            <div className="container"></div>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
