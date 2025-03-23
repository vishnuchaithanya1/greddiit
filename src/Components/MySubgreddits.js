import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import SgModal from "./SgModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IconButton } from "@mui/material";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import { Chip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from "react";
import sgcontext from "../Context/subgreddits/sgcontext";
import DeleteIcon from "@mui/icons-material/Delete";
import Buffer from "./Buffer"
function MySubgreddits() {
  const navigate = useNavigate();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const getgreddits = useContext(sgcontext).getgreddits;
  const deletegreddit = useContext(sgcontext).deletegreddit;
  const greddits = useContext(sgcontext).state;
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    } else {
      getgreddits();
    }
  }, []);
  const handledelete=(id)=>{
    deletegreddit(id);
  }
  const handlenav=(id)=>{
    const url=`/mygredditpage/${id}`;
    console.log("hello")
    navigate(url);
  }
  return (
    <div className="container my-5">
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <SgModal />
      </Stack>
      {!greddits && <Buffer/>}
      <div className="row">
      
        { greddits && greddits.length != 0 &&
          greddits.map((greddit) => {
            return (
              <div key={greddit._id} className="col col-md-4 my-3">
                <Card sx={{ minWidth: 275 }}  >
                  {/* <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Stack> */}
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {greddit.name}
                    </Typography>
                    <Typography variant="body2" className="my-2">
                      {greddit.description}
                    </Typography>

                    <Typography variant="p" className="my-4" component="div">
                      Banned KeyWords
                    </Typography>
                    <div className="row">
                      {greddit.bannedkeywords.length != 0 &&
                        greddit.bannedkeywords.map((word) => {
                          return (
                            <div className="col col-md-4 my-1">
                              <Chip label={word} />
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Stack
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      spacing={1}
                    >
                      <>
                        <IconButton aria-label="delete">
                          <PeopleAltIcon />
                        </IconButton>
                        <Typography variant="body2">
                        {greddit.followers.filter((flwr)=>flwr.status==="accepted").length+1} followers
                        </Typography>
                      </>
                      <>
                        <IconButton aria-label="delete">
                          <MarkAsUnreadIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {greddit.posts.length} posts
                        </Typography>
                        <IconButton aria-label="delete" size="large"  className="mx-3 " onClick={()=>handledelete(greddit._id)}  >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete">
                        <ExpandMoreIcon  onClick={()=>handlenav(greddit._id)} />
                        </IconButton>
                         
                      </>
                    </Stack>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MySubgreddits;
