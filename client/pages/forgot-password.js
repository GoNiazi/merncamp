import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import ForgotPasswordForm from "./../components/forms/ForgotPasswordForm";
import { Modal } from "antd";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [secret, setsecret] = useState("");
  const [question, setquestion] = useState("");
  const [ok, setok] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const { data } = await axios.post("/forgot-password", {
        email,
        newpassword,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setloading(false);
      }
      if (data.success) {
        setemail("");
        setnewpassword("");
        setsecret("");
        setok(true);
        setloading(false);
      }

      //   setname("");
      //   setemail("");
      //   setpassword("");
      //   setsecret("");
      //   setok(data.ok);
      //   setloading(false);
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };
  if (state && state.token) router.push("/user/dashboard");

  return (
    <>
      <div className="register">
        <h1>Forgot Password</h1>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setemail={setemail}
            newpassword={newpassword}
            setnewpassword={setnewpassword}
            secret={secret}
            setsecret={setsecret}
            loading={loading}
            setloading={setloading}
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
            <p>You have have successfully changed your password</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
