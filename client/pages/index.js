import React, { useContext } from "react";
import { UserContext } from "../context";

const index = () => {
  const [state, setstate] = useContext(UserContext);
  console.log("home page");
  return (
    <div>
      <h1>Home page</h1>
      {JSON.stringify(state)}
    </div>
  );
};

export default index;
