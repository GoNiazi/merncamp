import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from "./../components/forms/AuthForm";
import { Modal } from "antd";
// import { makeStyles } from "@material-ui/core";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
// import Backdrop from "@mui/material/Backdrop";
// import Fade from "@mui/material/Fade";
// import Typography from "@mui/material/Typography";
// import LoopIcon from "@material-ui/icons/Loop";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",

//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "500px",
//     },
//   },
//   rotateIcon: {
//     animation: "spin 0.6s linear infinite",
//   },
// }));
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

const questions = [
  {
    id: 1,
    label: "What is your Pet name?",
  },

  {
    id: 2,
    label: "What is your bestfriend name?",
  },
  {
    id: 3,
    label: "Which City you were Born?",
  },
];

const register = () => {
  // const classes = useStyles();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [secret, setsecret] = useState("");
  const [question, setquestion] = useState("");
  const [ok, setok] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, secret);

    try {
      setloading(true);
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setloading(false);
      } else {
        setname("");
        setemail("");
        setpassword("");
        setsecret("");
        setok(data.ok);
        setloading(false);
      }
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };
  if (state && state.token) router.push("/user/dashboard");

  return (
    <>
      <div className="row py-5 text-light bg-default-img  ">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            email={email}
            setname={setname}
            setemail={setemail}
            password={password}
            setpassword={setpassword}
            secret={secret}
            setsecret={setsecret}
            loading={loading}
            question={question}
            setquestion={setquestion}
            setloading={setloading}
            questions={questions}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title={"Congratulations!"}
            visible={ok}
            onCancel={() => setok(false)}
            footer={null}
          >
            <p>You have have successfully registered</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
      {/* <AuthForm
          handleSubmit={handleSubmit}
          name={name}
          email={email}
          setname={setname}
          setemail={setemail}
          password={password}
          setpassword={setpassword}
          secret={secret}
          setsecret={setsecret}
          loading={loading}
          question={question}
          setquestion={setquestion}
          setloading={setloading}
          classes={classes}
          questions={questions}
        />
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ok}
        onClose={() => setok(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ok}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Congratulations!
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              You have successfully registered.
            </Typography>
            <Link href="/login">
              <Button sx={{ marginTop: "10px" }} variant="contained">
                Login
              </Button>
            </Link>
          
        </Fade>
      </Modal> */}
    </>
  );
};

export default register;
