import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";
import { List } from "@mui/material";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Createpost from "./Createpost";
import Buffer from "./Buffer";
import PostDesign from "./PostDesign";

// import Sgfollowers from "./Sgfollowers";
const host = "https://redditbackend.onrender.com";
function Subgredditspage() {
  const navigate = useNavigate();
  const [greddit, setgreddit] = useState(null);
  const [user, setuser] = useState(null);
  const params = useParams();
  const leavegreddit = async (gredditid) => {
    const response = await fetch(`${host}/api/subgreddit/leavegreddit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ gredditid: greddit }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log(json);
    navigate("/subgreddits");
    //   if (!json.error) setgreddit(json);
  };
  const [addpage, setaddpage] = useState(false);

  const getuser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.error) alert(json.error);
    else {
      setuser(json);
    }
  };

  const fetchdata = async () => {
    const response = await fetch(`${host}/api/subgreddit/getgredditbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: params.id }),
    });
    const json = await response.json();
    // console.log("hey hello");
    console.log(json);
    if (!json.error) setgreddit(json);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchdata();
      getuser();
      console.log(greddit);
    }
  }, [addpage]);

  return (
    <>
      {(!greddit || !user) && <Buffer />}
      {greddit && user && (
        <div className="container my-5">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Createpost
              id={params.id}
              setaddpage={setaddpage}
              addpage={addpage}
            />
            <Button
              variant="contained"
              color="error"
              onClick={leavegreddit}
              disabled={greddit.user === user._id}
            >
              Exit
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <AssignmentIcon color="primary" />
            <h3>{greddit.name}</h3>
          </Stack>
          <p className="my-4">{greddit.description}</p>
          <h3>Tags</h3>
          <div className="row">
            {greddit.tags.map((tag) => {
              return (
                <div className="col col-md-1 my-1">
                  <Chip label={tag} variant="outlined" />
                </div>
              );
            })}
          </div>
          <h3 className="my-4">Banned Words</h3>
          <div className="row">
            {greddit.bannedkeywords.map((word) => {
              return (
                <div className="col col-md-1 my-1">
                  <Chip label={word} variant="outlined" />
                </div>
              );
            })}
          </div>
          <div className="row">
            {greddit.posts.length != 0 &&
              greddit.posts.map((post) => {
                return (
                  <div className="col col-md-12 my-4">
                    <PostDesign id={post} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default Subgredditspage;
