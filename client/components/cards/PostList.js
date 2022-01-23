import React, { useContext } from "react";
import { Avatar } from "antd";
import moment from "moment";
import renderHtml from "react-render-html";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { imagesrc } from "../functions/index";
import Link from "next/link";
import Post from "./Post";

const PostList = ({
  posts,
  handleDelete,
  handleunlike,
  handlelike,
  handlecomment,
  removecomment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleunlike={handleunlike}
            handlelike={handlelike}
            handlecomment={handlecomment}
            removecomment={removecomment}
          />
        ))}
    </>
  );
};

export default PostList;
