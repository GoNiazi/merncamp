import React from "react";
import Link from "next/link";
import LoopIcon from "@material-ui/icons/Loop";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  name,
  email,
  setemail,
  setname,
  password,
  setpassword,
  secret,
  setsecret,
  loading,

  setloading,

  handleSubmit,

  page,
}) => {
  return (
    <>
      {/* <form className={classes.root}>
        {page !== "login" && (
          <TextField
            id="name"
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        )}
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        {page !== "login" && (
          <TextField
            id="outlined-select-question"
            select
            label="Pick a Question"
            value={question}
            onChange={(e) => setquestion(e.target.value)}
            helperText="You can use this to reset your password if forgotten"
          >
            {questions.map((option) => {
              return (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              );
            })}
          </TextField>
        )}

        {page !== "login" && (
          <TextField
            id="outlined-basic"
            label="Write your answer here"
            variant="outlined"
            value={secret}
            onChange={(e) => setsecret(e.target.value)}
          />
        )}

        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          endIcon={!loading && <SendIcon />}
          color="primary"
          sx={{ padding: "10px" }}
          disabled={
            page == "login"
              ? !email || !password
              : !name || !email || !password || !secret
          }
        >
          {loading ? (
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
            "submit"
          )}
        </Button>
      </form> */}
      <form>
        {page !== "login" && (
          <div className="form-group p-2">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
        )}

        <div className="form-group p-2">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter name"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        {page !== "login" && (
          <div className="form-group p-2">
            <label className="text-muted">Pick a question</label>
            <select className="form-control">
              <option>What is your favourite color?</option>
              <option>What is your Best friend name?</option>
              <option>What City you were born?</option>
            </select>
            <small className="form-text text-muted">
              You can use this to reset your password if forgetten.
            </small>
          </div>
        )}
        {page !== "login" && (
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your answer here"
              value={secret}
              onChange={(e) => setsecret(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block col-12"
          onClick={handleSubmit}
          disabled={
            page === "login"
              ? !email || !password
              : !name || !email || !password || !secret
          }
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
