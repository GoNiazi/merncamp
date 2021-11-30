import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/index";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from "./../../../components/forms/AuthForm";
import { Modal, Avatar } from "antd";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

const UpdateProfile = () => {
  const [username, setusername] = useState("");
  const [about, setabout] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [secret, setsecret] = useState("");
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  // const [question, setquestion] = useState("");
  const [ok, setok] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) {
      setusername(state.user.username);
      setabout(state.user.about);
      setemail(state.user.email);
      setname(state.user.name);
      setsecret(state.user.secret);
      setimage(state.user.image);
    }
  }, [state && state.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const { data } = await axios.put("/profile-update", {
        name,
        email,
        username,
        about,
        password,
        secret,
        image,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setloading(false);
      } else {
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        setstate({ ...state, user: data });
        setok(true);
        setloading(false);
      }
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    setuploading(true);
    try {
      const { data } = await axios.post("/upload-image", formdata);
      setimage({
        url: data.url,
        public_id: data.public_id,
      });
      setuploading(false);
    } catch (error) {
      console.log(error);
      setuploading(false);
    }
  };
  return (
    <>
      <div className="row py-5 text-light bg-default-img  ">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          <label className="d-flex justify-content-center h6">
            {image && image.url ? (
              <Avatar size={40} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-3" style={{ fontSize: "20px" }} />
            ) : (
              <CameraOutlined
                className="mt-3 "
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            )}

            <input
              onChange={handleImage}
              type="file"
              accpet="images/*"
              hidden
            />
          </label>
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
            username={username}
            setusername={setusername}
            about={about}
            setabout={setabout}
            ProfileUpdate={true}
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
            <p>You have have successfully Upated User</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
