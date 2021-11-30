import React from "react";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  email,
  setemail,

  newpassword,
  setnewpassword,
  secret,
  setsecret,
  loading,

  setloading,

  handleSubmit,

  page,
}) => {
  return (
    <>
      <form>
        <div className="form-group p-2">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control "
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-muted">New Password</label>
          <input
            type="password"
            className="form-control "
            placeholder="Enter new password"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
          />
        </div>

        <div className="form-group p-2">
          <label className="text-muted">Pick a question</label>
          <select className="form-control ">
            <option>What is your favourite color?</option>
            <option>What is your Best friend name?</option>
            <option>What City you were born?</option>
          </select>
          <small className="form-text text-muted">
            You can use this to reset your password if forgetten.
          </small>
        </div>

        <div className="form-group p-2">
          <input
            type="text"
            className="form-control "
            placeholder="Enter your answer here"
            value={secret}
            onChange={(e) => setsecret(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block col-12 "
          onClick={handleSubmit}
          disabled={!email || !newpassword || !secret}
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
