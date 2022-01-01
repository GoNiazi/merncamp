import React, { useContext, useState, useEffect } from "react";
import { Avatar, List, Skeleton } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";
const Following = () => {
  const [state, setstate] = useContext(UserContext);
  const router = useRouter();
  const [people, setpeople] = useState([]);
  useEffect(() => {
    if (state && state.token) {
      fetchfollowing();
    }
  }, [state && state.token]);

  const fetchfollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      console.log(data);
      setpeople(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollowing", { _id: user._id });
      //update local storage
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      //update context with latest user;
      setstate({ ...state, user: data });
      //filetering
      let filtered = people.filter((p) => p._id !== user._id);
      setpeople(filtered);
      toast.error(`Unfollowed ${user.name}`);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const imagesrc = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };
  return (
    <div className="row col-md-6 offset-md-3 ">
      <h3 className="d-flex justify-content-center text-primary ">
        Followings
      </h3>
      <List
        itemLayout="horizental"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imagesrc(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    className="text-primary pointer"
                    onClick={() => handleUnfollow(user)}
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center h-5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};

export default Following;
