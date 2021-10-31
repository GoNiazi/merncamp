import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";

const useStyles = makeStyles((theme) => ({
  rotateIcon: {
    animation: "spin 0.6s linear infinite",
    fontSize: "100px",
    color: "blue",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "48%",
  },
}));

const UserRouter = ({ children }) => {
  const [ok, setok] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");
      if (data.ok) setok(true);
    } catch (error) {
      console.log("im in error");
      router.push("/login");
    }
  };
  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);
  return !ok ? (
    <>
      <LoopIcon className={classes.rotateIcon} />
      <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
        `}</style>
    </>
  ) : (
    <>{children}</>
  );
};

export default UserRouter;
