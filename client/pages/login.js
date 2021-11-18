import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";

import axios from "axios";
import { toast } from "react-toastify";

import Link from "next/link";
import AuthForm from "./../components/forms/AuthForm";
import { useRouter } from "next/router";

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

      if (data.error) {
        toast.error(data.error);
        setloading(false);
      } else {
        setstate({
          user: data.user,
          token: data.token,
        });

        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/user/dashboard");
        setloading(false);
      }
      // Save user in local storage
    } catch (err) {
      // console.log("hello im back in catch");
      toast.error(error);

      setloading(false);
    }
  };

  if (state && state.token) router.push("/user/dashboard");

  return (
    <>
      <div className="row py-5 text-light bg-default-img  ">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setemail={setemail}
            password={password}
            setpassword={setpassword}
            loading={loading}
            setloading={setloading}
            page="login"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center h6">
            You are not registered?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center h6 ">
            <Link href="/forgot-password">
              <a className="text-danger">Forgot Password</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default login;
