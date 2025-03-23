import { useState } from "react";
import sgcontext from "./sgcontext";
const host = "https://redditbackend.onrender.com";
const Sgstate = (props) => {
  const initalstate = null;
  const [state, setstate] = useState(initalstate);
  const [username, setusername] = useState(null);
  // const token = localStorage.getItem('token');
  const getgreddits = async () => {
    const response = await fetch(`${host}/api/subgreddit/getmygreddits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log("hey hello");
    console.log(json);
    if (!json.error) setstate(json);
  };

  const addgreddits = async (name, description, tags, bannedkeywords) => {
    const newdata = {
      name: name,
      description: description,
      tags: tags,
      bannedkeywords: bannedkeywords,
    };
    // api call
    const response = await fetch(`${host}/api/subgreddit/createsubgreddit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newdata),
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) setstate(state.concat(json));
    else alert(json.error);
  };

  const getusername = async (id) => {
    const newdata = {
      userid: id,
    };
    const response = await fetch(`${host}/api/auth/getusername`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
  };

  const deletegreddit = async (id) => {
    // api call
    console.log(id);
    const response = await fetch(`${host}/api/subgreddit/deletegreddit/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) setstate(state.filter((x) => x._id !== id));
  };

  return (
    <sgcontext.Provider
      value={{
        state,
        addgreddits,
        getgreddits,
        deletegreddit,
        username,
        getusername,
      }}
    >
      {props.children}
    </sgcontext.Provider>
  );
};
export default Sgstate;
