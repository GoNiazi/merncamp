import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
import UserRouter from "../../components/routes/UserRouter";

const dashboard = () => {
  const [state, setstate] = useContext(UserContext);
  console.log("im here");
  return (
    <UserRouter>
      <div className="container" style={{ border: "1px solid black" }}>
        <div className="row" style={{ border: "1px solid black" }}>
          <div className="col" style={{ border: "1px solid red" }}>
            <h1 className="display-1 text-center">Dashboard Page</h1>
          </div>
        </div>
      </div>
    </UserRouter>
  );
};

export default dashboard;
