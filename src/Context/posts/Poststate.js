import { useState } from "react";
import postcontext from "./postcontext";
const host = "";

const Poststate = (props) => {
  const [mode, setmode] = useState(true);
  return (
    <postcontext.Provider value={{ mode, setmode }}>
      {props.children}
    </postcontext.Provider>
  );
};
export default Poststate;
