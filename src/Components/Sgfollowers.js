import React from "react";
import { Avatar } from "@mui/material";
import { ListItem, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import PersonIcon from "@mui/icons-material/Person";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
function Sgfollowers(props) {
  const [user, setuser] = useState(null);
  const host = "https://redditbackend.onrender.com";
  // console.log(props.id)

  const acceptreq = async () => {
    const response = await fetch(`${host}/api/subgreddit/acceptrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gredditid: props.greddit._id,
        userid: props.id.id,
      }),
    });
    const json = await response.json();
    // console.log("hey hello");
    if (props.flag) props.setflag(false);
    else props.setflag(true);
    console.log(json);
    if (json.error) alert(json.error);
  };
  const rejectreq = async () => {
    const response = await fetch(`${host}/api/subgreddit/cancelrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gredditid: props.greddit._id,
        userid: props.id.id,
      }),
    });
    const json = await response.json();
    // console.log("hey hello");
    if (json.error) alert(json.error);
    if (props.flag) props.setflag(false);
    else props.setflag(true);
    console.log(json);
  };

  const getconnection = async () => {
    const response = await fetch(`${host}/api/auth/getconnection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: props.id.id }),
    });
    const json = await response.json();
    // console.log(json);
    setuser(json);
  };
  useEffect(() => {
    getconnection();
  }, []);

  return (
    <>
      {user && (
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.username}
              secondary={
                <>
                  {props.id.status === "requested" && (
                    <React.Fragment>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          onClick={acceptreq}
                        >
                          accept
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={rejectreq}
                        >
                          reject
                        </Button>
                      </Stack>
                    </React.Fragment>
                  )}
                </>
              }
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}

export default Sgfollowers;
