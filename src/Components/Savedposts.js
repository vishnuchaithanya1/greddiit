import React from "react";
import PostDesign from "./PostDesign";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Buffer from "./Buffer";
const host = "https://redditbackend.onrender.com";

function Savedposts() {
  const [posts, setposts] = useState(null);
  const [savedpostflag, setsavedpostflag] = useState(false);
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
    setposts(json.savedposts);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchuser();
    }
  }, [savedpostflag]);

  return (
    <>
      {posts && posts.length === 0 && (
        <div className="container my-5">
          <h5>No Saved Posts</h5>
        </div>
      )}
      {!posts && <Buffer />}
      {posts && (
        <div className="container my-5">
          <div className="row">
            {posts.map((post) => {
              return (
                <div className="col col-md-12 my-4">
                  <PostDesign
                    id={post}
                    savedpostflag={savedpostflag}
                    setsavedpostflag={setsavedpostflag}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Savedposts;
