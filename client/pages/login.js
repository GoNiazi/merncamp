import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import LoopIcon from "@material-ui/icons/Loop";
import Link from "next/link";
import AuthForm from "./../components/forms/AuthForm";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "500px",
    },
  },
  rotateIcon: {
    animation: "spin 0.6s linear infinite",
  },
}));
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const login = () => {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setstate({
        user: data.user,
        token: data.token,
      });
      //Save user in local storage
      window.localStorage.setItem("auth", JSON.stringify(data));
      router.push("/user/dashboard");
      setloading(false);
    } catch (error) {
      toast.error(error.response.data);
      setloading(false);
    }
  };

  if (state && state.token) router.push("/user/dashboard");

  return (
    <>
      <div className="register">
        <h1>Login</h1>
      </div>

      <Box
        component="form"
        sx={{
          width: "100vw",
          height: "500px",
          display: "flex",
          flexDirection: { xs: "column" },
          alignItems: "center",
          justifyContent: "center",
        }}
        autoComplete="off"
      >
        <AuthForm
          handleSubmit={handleSubmit}
          email={email}
          setemail={setemail}
          password={password}
          setpassword={setpassword}
          loading={loading}
          setloading={setloading}
          classes={classes}
          page="login"
        />
        <p>
          Not yet registered?{" "}
          <Link href="/register">
            <Button color="primary" variant="contained">
              Register
            </Button>
          </Link>
        </p>
      </Box>
    </>
  );
};

export default login;
