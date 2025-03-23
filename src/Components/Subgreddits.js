import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IconButton } from "@mui/material";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import { Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import { MenuItem } from "@mui/material";
import Buffer from "./Buffer";
import { useRef } from "react";
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

const host = "https://redditbackend.onrender.com";
function Subgreddits() {
  const [greddits, setgreddits] = useState(null);
  const sorttype = ["Name Asc", "Name Desc", "FollowerCount", "CreationDate"];
  const [tags, settags] = useState([]);
  const [st, setst] = useState("Name Asc");
  const tagref = useRef(null);
  const sortref = useRef(null);
  const [searchedword, setsearchedword] = useState("");
  const [request, setrequest] = useState(false);
  const [id, setid] = useState(null);
  const [blockflag, setblockflag] = useState(false);
  const [leftflag, setleftflag] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [cancelflag, setcancelflag] = useState(false);
  const sortchange = (e) => {
    // console.log("hai");
    console.log(e.target.value);
    setst(e.target.value);
  };
  const addtag = () => {
    // console.log("hai")
    console.log(tagref.current.value);
    let newwords = [].concat(tags, tagref.current.value.toLowerCase());
    settags(newwords);
    // console.log(tags);
    tagref.current.value = "";
  };
  const onchange = (e) => {
    setsearchedword(e.target.value);
  };
  //lets fectch all greddits
  const handleDelete = (tag) => {
    settags(tags.filter((tagi) => tagi != tag));
  };
  const fetchallgreddits = async () => {
    const response = await fetch(`${host}/api/subgreddit/fetchallgreddits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) setgreddits(json);
    else {
      alert(json.error);
    }
  };

  const joinrequest = async (gredditid) => {
    setrequest(true);
    const newdata = {
      gredditid: gredditid,
    };
    const response = await fetch(`${host}/api/subgreddit/joinrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newdata),
    });
    // setrequest(false);
    if (!click) setclick(true);
    else setclick(false);
  };

  const getmyid = async () => {
    const response = await fetch(`${host}/api/auth/getmyid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (!json.error) setid(json.id);
    else {
      alert(json.error);
    }
  };

  const navigate = useNavigate();
  const [click, setclick] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchallgreddits();
      getmyid();
    }
  }, [click]);
  const joinuser = (gredditid) => {
    // console.log(e.target.value);

    joinrequest(gredditid);
  };
  const opengreddit = async (id) => {
    const response = await fetch(`${host}/api/subgreddit/countvisitors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gredditid: id }),
    });
    navigate(`/subgreddits/${id}`);
  };

  const joinrejecteduser = async (gredditid) => {
    const newdata = {
      gredditid: gredditid,
    };
    const response = await fetch(
      `${host}/api/subgreddit/jointemprejecteduser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newdata),
      }
    );
    const json = await response.json();
    if (json.error) setalertmsg(json.error);
    else {
      setalertmsg("sentrequest to Moderator");
    }
    setcancelflag(true);
  };

  return (
    <div className="container my-5">
      <Snackbar
        open={request}
        autoHideDuration={6000}
        onClose={() => setrequest(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setrequest(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Request sent to Moderator
        </Alert>
      </Snackbar>
      <Snackbar
        open={blockflag}
        autoHideDuration={6000}
        onClose={() => setblockflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setblockflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Cannot join !! You have been blocked by moderator
        </Alert>
      </Snackbar>
      <Snackbar
        open={leftflag}
        autoHideDuration={6000}
        onClose={() => setleftflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setleftflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          cannot join !! You left the subgreddit
        </Alert>
      </Snackbar>
      <Snackbar
        open={cancelflag}
        autoHideDuration={6000}
        onClose={() => setcancelflag(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setcancelflag(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertmsg}
        </Alert>
      </Snackbar>
      <div className="row my-5">
        {tags.length != 0 &&
          tags.map((tag) => {
            return (
              <div className="col col-md-1">
                <Chip label={tag} onDelete={() => handleDelete(tag)} />
              </div>
            );
          })}
      </div>
      <div className="row">
        <div
          className="col col-md-4 col-sm-12 my-3"
          style={{ textAlign: "center" }}
        >
          <Paper
            component="form"
            sx={{
              p: "4px 6px",
              display: "flex",
              alignItems: "center",
              minWidth: 300,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search SubGreddits"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={onchange}
            />

            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>

        <div
          className="col col-md-4 col-sm-12 my-3 "
          style={{ textAlign: "center" }}
        >
          <TextField
            id="input-with-icon-textfield"
            label="select tag"
            inputRef={tagref}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={addtag}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>

        <div
          className="col col-md-4 col-sm-12 my-3"
          style={{ textAlign: "center" }}
        >
          <TextField
            id="outlined-select-sort"
            select
            label="Sort"
            inputRef={sortref}
            onChange={sortchange}
            defaultValue={"Name Asc"}
          >
            {sorttype.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      ></Stack>
      <div className="row">
        {!greddits && <Buffer />}
        {greddits &&
          greddits.length != 0 &&
          greddits
            .filter((greddit) => {
              {
                /* console.log(greddit); */
              }

              if (searchedword == "") {
                if (tags.length == 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.tags.includes(tags[i])) return greddit;
                  }
                }
              } else if (
                greddit.name.toLowerCase().includes(searchedword.toLowerCase())
              ) {
                if (tags.length == 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.tags.includes(tags[i])) return greddit;
                  }
                }
              }
            })
            .filter((greddit) => {
              if (
                greddit.followers.find((user1) => {
                  return user1.id === id && user1.status === "accepted";
                }) ||
                greddit.user === id
              )
                return greddit;
            })
            .sort(function (a, b) {
              if (st == "Name Asc") {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              } else if (st == "Name Desc") {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
              } else if (st == "FollowerCount") {
                if (a.followers.length < b.followers.length) return 1;
                return -1;
              } else {
                if (Number(a.date) > Number(b.date)) return 1;
                return -1;
              }
            })
            .map((greddit) => {
              return (
                <div key={greddit._id} className="col col-md-12 my-3">
                  <Card sx={{ minWidth: 175 }}>
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
                              <div className="col col-md-1 my-1">
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
                            {greddit.followers.filter(
                              (flwr) => flwr.status === "accepted"
                            ).length + 1}{" "}
                            followers
                          </Typography>
                        </>
                        <>
                          <IconButton aria-label="delete">
                            <MarkAsUnreadIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.posts.length} posts
                          </Typography>
                        </>
                        {!greddit.followers.find((user1) => {
                          return (
                            user1.id === id &&
                            (user1.status === "accepted" ||
                              user1.status === "temprejected" ||
                              user1.status === "blocked" ||
                              user1.status === "requested" ||
                              user1.status === "rejected")
                          );
                        }) &&
                          !(greddit.user === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              onClick={() => joinuser(greddit._id)}
                              value="sai"
                              color="success"
                            >
                              Join
                            </Button>
                          )}

                        {(greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "accepted";
                        }) ||
                          greddit.user === id) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => opengreddit(greddit._id)}
                          >
                            open
                          </Button>
                        )}

                        {greddit.followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "requested"
                          );
                        }) &&
                          !(greddit.user === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              disabled
                            >
                              requested
                            </Button>
                          )}

                        {greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "rejected";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setleftflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "blocked";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setblockflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "temprejected"
                          );
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => joinrejecteduser(greddit._id)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
        {greddits &&
          greddits.length != 0 &&
          greddits
            .filter((greddit) => {
              {
                /* console.log(greddit); */
              }

              if (searchedword == "") {
                if (tags.length == 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.tags.includes(tags[i])) return greddit;
                  }
                }
              } else if (
                greddit.name.toLowerCase().includes(searchedword.toLowerCase())
              ) {
                if (tags.length == 0) return greddit;
                else {
                  for (let i = 0; i < tags.length; i++) {
                    if (greddit.tags.includes(tags[i])) return greddit;
                  }
                }
              }
            })
            .filter((greddit) => {
              if (
                !greddit.followers.find((user1) => {
                  return user1.id === id && user1.status === "accepted";
                }) &&
                greddit.user !== id
              )
                return greddit;
            })
            .sort(function (a, b) {
              if (st == "Name Asc") {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              } else if (st == "Name Desc") {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
              } else if (st == "FollowerCount") {
                if (a.followers.length < b.followers.length) return 1;
                return -1;
              } else {
                if (Number(a.date) > Number(b.date)) return 1;
                return -1;
              }
            })
            .map((greddit) => {
              return (
                <div key={greddit._id} className="col col-md-12 my-3">
                  <Card sx={{ minWidth: 175 }}>
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
                              <div className="col col-md-1 my-1">
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
                            {greddit.followers.filter(
                              (flwr) => flwr.status === "accepted"
                            ).length + 1}{" "}
                            followers
                          </Typography>
                        </>
                        <>
                          <IconButton aria-label="delete">
                            <MarkAsUnreadIcon />
                          </IconButton>
                          <Typography variant="body2">
                            {greddit.posts.length} posts
                          </Typography>
                        </>
                        {!greddit.followers.find((user1) => {
                          return (
                            user1.id === id &&
                            (user1.status === "accepted" ||
                              user1.status === "temprejected" ||
                              user1.status === "blocked" ||
                              user1.status === "requested" ||
                              user1.status === "rejected")
                          );
                        }) &&
                          !(greddit.user === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              onClick={() => joinuser(greddit._id)}
                              value="sai"
                              color="success"
                            >
                              Join
                            </Button>
                          )}

                        {(greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "accepted";
                        }) ||
                          greddit.user === id) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => opengreddit(greddit._id)}
                          >
                            open
                          </Button>
                        )}

                        {greddit.followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "requested"
                          );
                        }) &&
                          !(greddit.user === id) && (
                            <Button
                              variant="contained"
                              className="mx-5"
                              disabled
                            >
                              requested
                            </Button>
                          )}

                        {greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "rejected";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setleftflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.followers.find((user1) => {
                          return user1.id === id && user1.status === "blocked";
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => setblockflag(true)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
                        {greddit.followers.find((user1) => {
                          return (
                            user1.id === id && user1.status === "temprejected"
                          );
                        }) && (
                          <Button
                            variant="contained"
                            className="mx-5"
                            onClick={() => joinrejecteduser(greddit._id)}
                            color="success"
                          >
                            Join
                          </Button>
                        )}
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

export default Subgreddits;
