import React from "react";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useState } from "react";
const host = "https://redditbackend.onrender.com";

function Anotheruser(props) {
  const [user, setuser] = useState(null);
  
  const getconnection = async () => {
    const response = await fetch(`${host}/api/auth/getconnection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: props.id }),
    });
    const json = await response.json();
    console.log(json);
    setuser(json);
  };
  const removefollower=async()=>{
    const newnote = {
     id:user._id
    };
    // api call
    const response = await fetch(`${host}/api/auth/removefollower`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
       
      },
      body: JSON.stringify(newnote),
    });
    const json = await response.json();
    console.log(json)
    if(!json.error){
      window.location.reload();
    }
  }
  const removefollowing=async()=>{
    const newnote = {
      id:user._id
     };
     // api call
     const response = await fetch(`${host}/api/auth/removefollowing`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "auth-token":
           localStorage.getItem('token'),
        
       },
       body: JSON.stringify(newnote),
     });
     const json = await response.json();
     console.log(json)
     if(!json.error){
       window.location.reload();
     }

  }
  useEffect(() => {
    getconnection();
  }, []);

  return (
    <>
      {user && (
        <ListItem disableGutters>
          <ListItemButton key={user._id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText  className="mx-3" primary={user.username} />
            {
              (props.connectiontype=="follower")?(
                <Button variant="contained" className="mx-3" onClick={removefollower}   >Remove</Button>

              ):(
                <Button variant="contained" className="mx-3" onClick={removefollowing} >Unfollow</Button>
              )
            }
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}

export default Anotheruser;
