import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRouter from "./../../components/routes/UserRouter";
import Post from "./../../components/cards/Post";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const PostComments = () => {
  const [post, setpost] = useState("");
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) {
      fetchpost();
    }
  }, [_id]);

  const fetchpost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setpost(data);
    } catch (error) {
      console.log(error);
    }
  };
  const removecomment = async (postid, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", { postid, comment });
      fetchpost();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-img ">
        <div className="col text-center ">
          <h1>Kelium</h1>
        </div>
      </div>
      <div className="container col-md-8 offse-md-2 pt-5">
        <Post post={post} commentscount={100} removecomment={removecomment} />
        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostComments;
