import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";
import { Avatar, Card } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const UserProfile = () => {
  const [user, setuser] = useState("");
  const [post, setpost] = useState({});
  const router = useRouter();
  const { Meta } = Card;

  useEffect(() => {
    if (router.query.username) {
      fetchUser();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setuser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const imagesrc = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
      // return {name[0]};
    }
  };
  return (
    <div className="row col-md-6 offset-md-3">
      {/* <Image alt="cover" src={"/images/cover.jpg"} /> */}
      <div className="pt-5 pb-5">
        <Card hoverable cover={<img src={imagesrc(user)} alt="cover" />}>
          <Meta title={user.name} description={user.about} />
          <p className="pt-2 text-muted">
            Joined {moment(user.createdAt).fromNow()}
          </p>
          <div className="d-flex justify-content-between">
            <p className="btn btn-sm text-success">
              {user.followers && user.followers.length} Followers
            </p>
            <p className="btn btn-sm text-success">
              {user.following && user.following.length} Following
            </p>
          </div>
        </Card>
        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center pt-4">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
