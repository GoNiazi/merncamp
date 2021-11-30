import React from "react";
import Link from "next/link";

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
  about,
  setabout,
  username,
  setusername,
  page,
  ProfileUpdate,
}) => {
  return (
    <>
      <form>
        {ProfileUpdate && (
          <div className="form-group p-2">
            <label className="text-muted">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
        )}
        {ProfileUpdate && (
          <div className="form-group p-2">
            <label className="text-muted">About</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter anything about you"
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />
          </div>
        )}

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
            disabled={ProfileUpdate}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
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
            ProfileUpdate
              ? loading
              : page === "login"
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
