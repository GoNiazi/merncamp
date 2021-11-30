import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from "./../components/forms/AuthForm";
import { Modal } from "antd";

const register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [secret, setsecret] = useState("");

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
            <p>You have have successfully registered</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default register;
